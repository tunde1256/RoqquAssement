import { Request, Response, NextFunction } from "express";
import { validationErrorResponse } from "../utils/response"; // Assuming you have this utility

export const validateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const { full_name, email } = req.body;

  if (!full_name || typeof full_name !== "string" || full_name.trim() === "") {
    return validationErrorResponse(res, "Full name is required and should be a non-empty string", [{ field: "full_name", message: "Full name is required" }], 400);
  }

  if (!email || typeof email !== "string" || !/^[\w-]+(\.[\w-]+)*@[\w-]+\.[a-z]{2,6}$/.test(email)) {
    return validationErrorResponse(res, "Valid email ending with .com is required", [{ field: "email", message: "Invalid email format" }], 400);
  }

  if (!email.endsWith(".com")) {
    return validationErrorResponse(res, "Email must end with .com", [{ field: "email", message: "Email must end with .com" }], 400);
  }

  return next();
}
