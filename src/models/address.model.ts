import db from "../config/db";

interface Address {
  user_id: number;
  street: string;
  city: string;
  state: string;
  zip_Code: string;
}

export const getAddressByUserId = async (user_id: number) => {
  return db("addresses").where({ user_id }).first();
};

export const createAddress = async (address: Address) => {
  const [id] = await db("addresses").insert(address);
  return { id, ...address };
};

export const updateAddress = async (user_id: number, address: Address) => {
  return db("addresses")
    .where({ user_id: user_id })
    .update(address); 
};


