import { Response } from "express";

// Success Response
export const successResponse = (res: Response, data: any, message: string = "Request was successful", statusCode: number = 200) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

// Error Response
export const errorResponse = (res: Response, message: string = "An error occurred", statusCode: number = 500) => {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
};

// Validation Error Response
export const validationErrorResponse = (res: Response, message: string = "Validation failed", errors: any[] = [], statusCode: number = 400) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};

// Pagination Response
export const paginationResponse = (res: Response, data: any[], page: number, pageSize: number, totalCount: number, message: string = "Data retrieved successfully") => {
  return res.status(200).json({
    status: "success",
    message,
    data,
    pagination: {
      page,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  });
};


export const deletionSuccessResponse = (res: Response, message: string = "Deleted successfully") => {
  return res.status(200).json({
    status: "success",
    message,
  });
};

  
