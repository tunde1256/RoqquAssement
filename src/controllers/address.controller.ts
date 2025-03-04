import { Request, Response } from "express";
import * as addressModel from "../models/address.model";
import { successResponse, errorResponse } from "../utils/response";

export const getAddressByUserId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_id } = req.params;
    const address = await addressModel.getAddressByUserId(Number(user_id));
    if (!address) {
      return errorResponse(res, "Address not found", 404);
    }
    return successResponse(res, address, "Address retrieved successfully");
  } catch (error) {
    return errorResponse(res, "Internal Server Error", 500);
  }
};

export const createAddress = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_id, street, city, state, zip_Code } = req.body;

    if (!user_id || !street || !city || !state || !zip_Code) {
      return errorResponse(res, "Missing required fields", 400);
    }

    const address = { user_id, street, city, state, zip_Code };

    const createdAddress = await addressModel.createAddress(address);
    return successResponse(res, createdAddress, "Address created successfully", 201);
  } catch (error) {
    console.error("Error creating address:", error); 
    return errorResponse(res, "Internal Server Error", 500);
  }
};


export const updateAddress = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_id } = req.params;  
    const { street, city, state, zip_Code } = req.body;  

    const existingAddress = await addressModel.getAddressByUserId(Number(user_id));
    if (!existingAddress) {
      return errorResponse(res, "Address not found for the given user_id", 404);
    }

  

    const address = { user_id: Number(user_id), street, city, state, zip_Code };

    const rowsUpdated = await addressModel.updateAddress(Number(user_id), address);


    if (rowsUpdated === 0) {
      return errorResponse(res, "No address found to update for the given user_id", 404);
    }

    const updatedAddress = await addressModel.getAddressByUserId(Number(user_id));
    return successResponse(res, updatedAddress, "Address updated successfully");

  } catch (error) {
    return errorResponse(res, "Internal Server Error", 500);
  }
};
