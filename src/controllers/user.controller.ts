import { Request, Response } from "express";
import * as userModel from "../models/user.model";
import { successResponse, errorResponse, validationErrorResponse, paginationResponse } from "../utils/response"; 



export const getUsers = async (req: Request, res: Response): Promise<any> => {
  try {
    const pageNumber = Number(req.query.pageNumber as string) || 1;
    const pageSize = Number(req.query.pageSize as string) || 10;

    if (isNaN(pageNumber) || pageNumber < 1) {
      return validationErrorResponse(res, "Page number must be a positive integer", [{ field: "pageNumber", message: "Invalid page number" }], 400);
    }

    if (isNaN(pageSize) || pageSize < 1) {
      return validationErrorResponse(res, "Page size must be a positive integer", [{ field: "pageSize", message: "Invalid page size" }], 400);
    }

    const totalCountRaw = await userModel.getUserCount();
    const totalCount = totalCountRaw != null ? parseInt(String(totalCountRaw), 10) : 0;

    const users = await userModel.getUsers(pageNumber - 1, pageSize); 
    if (!Array.isArray(users)) {
      return errorResponse(res, "Failed to retrieve users", 500);
    }

    const totalPages = Math.ceil(totalCount / pageSize);  
    if (pageNumber > totalPages) {
      return paginationResponse(res, [], pageNumber, pageSize, totalCount);
    }

    return paginationResponse(res, users, pageNumber, pageSize, totalCount);
  } catch (error) {
    console.error("Error fetching users:", error);
    return errorResponse(res, "Internal Server Error", 500);
  }
};





export const getUserById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const user = await userModel.getUserById(Number(id));
    if (!user) {
      return errorResponse(res, "User not found", 404); 
    }
    return successResponse(res, user, "User details retrieved successfully");
  } catch (error) {
    return errorResponse(res, "Internal Server Error", 500);
  }
};


export const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { full_name, email } = req.body;

    // Check for missing fields
    if (!full_name || !email) {
      return validationErrorResponse(res, "Full name and email are required", [
        { field: "full_name", message: "Full name is required" },
        { field: "email", message: "Email is required" },
      ]);
    }

    // Check if email already exists
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return validationErrorResponse(res, "User with this email already exists", [
        { field: "email", message: "Email already in use" },
      ]);
    }

    // Create new user
    const newUser = { full_name, email };
    const createdUser = await userModel.createUser(newUser);

    // Return success response
    return successResponse(res, createdUser, "User created successfully", 201);
  } catch (error) {
    console.error("Error creating user:", error);
    return errorResponse(res, "Internal Server Error", 500);
  }
};



export const getUserCount = async (req: Request, res: Response):Promise<any> => {
  try {
    const count = await userModel.getUserCount();
    return successResponse(res, { count }, "User count retrieved successfully");
  } catch (error) {
    return errorResponse(res, "Internal Server Error", 500);
  }
};
