import { executeDatabaseQuery } from "../paintServices/databaseService";

// add and update
  
// get
export async function getInventory() {
  const queryName = "getInventory";
  const queryDetails = `SELECT *
  FROM inventory`;
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
  const inventorySections = ["inventory", "inventory1"];

  for (let a = 1; a < 2; a++){

    // fetch each point of progress section
    const allPromise = Promise.all([getInventory(), getInventory()]);
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