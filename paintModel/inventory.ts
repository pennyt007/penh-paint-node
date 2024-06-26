import { executeDatabaseQuery } from "../paintServices/databaseService";

// add and update
  
// get
export async function getInventory() {
  const queryName = "getInventory";
  const queryDetails = `SELECT
  i.inventory_id,
  i.quantity,
  p.name,
  p.stock_max,
  p.low_trigger,
  p.order_trigger,
  CASE
    WHEN i.quantity > p.low_trigger THEN p.name
    ELSE NULL
  END AS availablestock,
  CASE
    WHEN i.quantity <= p.low_trigger THEN p.name
    ELSE NULL
  END AS lowstock,
  CASE
   WHEN i.quantity = 0 THEN p.name
    ELSE NULL
  END AS outstock,
  CASE
   WHEN io.order_id is not null THEN p.name
    ELSE NULL
  END AS ordered
  FROM inventory i
  JOIN product p USING(product_id)
  LEFT OUTER JOIN inventory_order io USING(product_id)`;
  return await executeDatabaseQuery(queryName, queryDetails);
}

export async function getJob() {
  const queryName = "getJob";
  const queryDetails = `SELECT
  j.job_id,
  j.job_number,
  j.address,
  j.total_area,
  j.quantity,
  p.name,
  js.description,
  s.name as painter
  FROM job j
  JOIN product p USING(product_id)
  JOIN job_status js USING(job_status_id)
  JOIN staff s USING(staff_id)`;
  return await executeDatabaseQuery(queryName, queryDetails);
}

export async function getOrder() {
  const queryName = "getOrder";
  const queryDetails = `SELECT
  o.order_id,
  o.order_number,
  o.quantity,
  p.name,
  os.description
  FROM inventory_order o
  JOIN product p USING(product_id)
  JOIN order_status os USING(order_status_id)`;
  return await executeDatabaseQuery(queryName, queryDetails);
}

export async function getAudit() {
  const queryName = "getAudit";
  const queryDetails = `SELECT
  ia.inventory_audit_id,
  ia.system_quantity,
  ia.manual_quantity,
  ia.notes,
  DATE_FORMAT(ia.created,'%Y-%m-%d') as created,
  DATE_FORMAT(ia.completed,'%Y-%m-%d') as completed,
  p.name
  FROM inventory_audit ia
  JOIN inventory i USING(inventory_id)
  JOIN product p USING(product_id)`;
  return await executeDatabaseQuery(queryName, queryDetails);
}

export async function getTransactions() {
  const queryName = "getAudit";
  const queryDetails = `SELECT
  it.inventory_transaction_id,
  it.quantity,
  DATE_FORMAT(it.created,'%Y-%m-%d') as created,
  DATE_FORMAT(it.completed,'%Y-%m-%d') as completed,
  p.name,
  j.job_number,
  io.order_number
  FROM inventory_transaction it
  JOIN inventory i USING(inventory_id)
  JOIN product p USING(product_id)
  LEFT OUTER JOIN job j USING(job_id)
  LEFT OUTER JOIN inventory_order io USING(order_id)`;
  return await executeDatabaseQuery(queryName, queryDetails);
}

// delete

// build
// build
export async function buildInventory() {
  
  interface inventorySection<T> {
    id?: number;
    grid?: string;
    data?: T[];
    filtered?: T[];
  }

  let promiseResults = [];
  let inventoryHistory = [];
  let inventorySection: inventorySection<any> = {};
  //let processedPopCounter: number = 0;
  const inventorySections = ["inventory", "job", "order", "audit", "transact"];

  for (let a = 1; a < 2; a++){

    // fetch each point of progress section
    const allPromise = Promise.all([getInventory(), getJob(), getOrder(), getAudit(), getTransactions()]);
    try {
      promiseResults = await allPromise;
    } catch {
      return [];
    }

    // loop through each point of progress section
    for (let b = 0; b < inventorySections.length; b++) {
      inventorySection.id = a;
      inventorySection.grid = inventorySections[b];
      inventorySection.data = promiseResults[b][0];
      inventorySection.filtered = promiseResults[b][0];
   
      inventoryHistory.push(inventorySection);
      inventorySection = {};
    }
  }
  return inventoryHistory;
}