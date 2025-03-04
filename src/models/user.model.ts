import db from "../config/db";

interface User {
  id?: number;
  full_name: string;
  email: string;
}

export const getUsers = async (pageNumber: number = 0, pageSize: number = 10) => {
  return db("users")
    .limit(pageSize)
    .offset(pageNumber * pageSize);
};

export const getUserById = async (id: number) => {
  return db("users").where({ id }).first();
};
export const getUserByEmail = async (email: string) => {
  return db("users").where({ email }).first();
};

export const createUser = async (users: User) => {
  const [id] = await db("users").insert(users);
  return { id, ...users };
};

export const getUserCount = async () => {
  const [count] = await db("users").count();
  return count["count(*)"];
};
