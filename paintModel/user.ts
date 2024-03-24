import { executeDatabaseQuery } from "../paintServices/databaseService";

// add and update

// get
export async function getUser(user_id: number) {
  const queryName = "getUser";
  const queryDetails = `SELECT user_id
  FROM user
  WHERE user_id = "${user_id}"`;
  return await executeDatabaseQuery(queryName, queryDetails);
}

export async function getUserByEmail(email: string) {
  const queryName = "getUserByEmail";
  const queryDetails = `SELECT user_id,
  email 
  FROM user
  WHERE email = "${email}"`;
  return await executeDatabaseQuery(queryName, queryDetails);
}

export async function getUserByEmailToAuthenticate(email: string) {
  const queryName = "getUserByEmailToAuthenticate";
  const queryDetails = `SELECT u.user_id,
  u.email,
  u.password,
  urt.code AS user_role,
  su.staff_id
  FROM user u
  JOIN user_role_type urt USING (user_role_type_id)
  LEFT OUTER JOIN staff_user su ON (su.user_id = u.user_id)
  WHERE u.email = "${email}"`;
  return await executeDatabaseQuery(queryName, queryDetails);
}

// delete
