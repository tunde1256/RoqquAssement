import { Request, Response } from "express";
import * as addressModel from "../models/address.model";
import * as addressController from "../controllers/address.controller";
import { successResponse, errorResponse } from "../utils/response";

// Mocking dependencies
jest.mock("../models/address.model");
jest.mock("../utils/response");

describe("Address Controller", () => {
  
  let req: Partial<Request>;
  let res: Partial<Response>;
  
  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  describe("getAddressByUserId", () => {
    it("should return 404 if no address is found", async () => {
      jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue(null);

      req.params = { user_id: "1" };

      await addressController.getAddressByUserId(req as Request, res as Response);

      expect(addressModel.getAddressByUserId).toHaveBeenCalledWith(1);
      expect(errorResponse).toHaveBeenCalledWith(res, "Address not found", 404);
    });

    it("should return the address if found", async () => {
      const mockAddress = { user_id: 1, street: "Street 1", city: "City", state: "State", zip_Code: "12345" };
      
      jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue(mockAddress);

      req.params = { user_id: "1" };

      await addressController.getAddressByUserId(req as Request, res as Response);

      expect(addressModel.getAddressByUserId).toHaveBeenCalledWith(1);
      expect(successResponse).toHaveBeenCalledWith(res, mockAddress, "Address retrieved successfully");
    });

    it("should return 500 on error", async () => {
      jest.spyOn(addressModel, 'getAddressByUserId').mockRejectedValue(new Error("Database error"));

      req.params = { user_id: "1" };

      await addressController.getAddressByUserId(req as Request, res as Response);

      expect(errorResponse).toHaveBeenCalledWith(res, "Internal Server Error", 500);
    });
  });

  describe("Address Controller", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
  
    beforeEach(() => {
      req = {
        body: {
          user_id: 1,
          street: "Street",
          city: "City",
          state: "State",
          zip_Code: "12345"
        }
      };
  
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis()
      };
    });
  
    it("should create an address successfully", async () => {
      const mockAddress = {
        user_id: 1,
        street: "Street",
        city: "City",
        state: "State",
        zip_Code: "12345",
        id: 1  
      };
  
      (addressModel.createAddress as jest.Mock).mockResolvedValue(mockAddress);
  
      await addressController.createAddress(req as Request, res as Response);
  
      expect(addressModel.createAddress).toHaveBeenCalledWith({
        user_id: 1,
        street: "Street",
        city: "City",
        state: "State",
        zip_Code: "12345"
      });
  
      expect(successResponse).toHaveBeenCalledWith(res, mockAddress, "Address created successfully", 201);
    });
  });
  describe("updateAddress", () => {
    it("should return 404 if address not found", async () => {
      jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue(null);

      req.params = { user_id: "1" };
      req.body = { street: "New Street", city: "New City", state: "New State", zip_Code: "54321" };

      await addressController.updateAddress(req as Request, res as Response);

      expect(addressModel.getAddressByUserId).toHaveBeenCalledWith(1);
      expect(errorResponse).toHaveBeenCalledWith(res, "Address not found for the given user_id", 404);
    });

    it("should update the address successfully", async () => {
      const existingAddress = { user_id: 1, street: "Old Street", city: "Old City", state: "Old State", zip_Code: "54321" };
      const updatedAddress = { user_id: 1, street: "New Street", city: "New City", state: "New State", zip_Code: "54321" };

      jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue(existingAddress);
      jest.spyOn(addressModel, 'updateAddress').mockResolvedValue(1); // Mocking successful update
      jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue(updatedAddress);

      req.params = { user_id: "1" };
      req.body = updatedAddress;

      await addressController.updateAddress(req as Request, res as Response);

      expect(addressModel.updateAddress).toHaveBeenCalledWith(1, updatedAddress);
      expect(successResponse).toHaveBeenCalledWith(res, updatedAddress, "Address updated successfully");
    });

    it("should return 404 if no rows were updated", async () => {
      jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue({}); // Address exists but update fails
      jest.spyOn(addressModel, 'updateAddress').mockResolvedValue(0); // No rows updated

      req.params = { user_id: "1" };
      req.body = { street: "New Street", city: "New City", state: "New State", zip_Code: "54321" };

      await addressController.updateAddress(req as Request, res as Response);

      expect(addressModel.updateAddress).toHaveBeenCalledWith(1, expect.any(Object));
      expect(errorResponse).toHaveBeenCalledWith(res, "No address found to update for the given user_id", 404);
    });

    it("should return 500 on error", async () => {
      jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue({});
      jest.spyOn(addressModel, 'updateAddress').mockRejectedValue(new Error("Database error"));

      req.params = { user_id: "1" };
      req.body = { street: "New Street", city: "New City", state: "New State", zip_Code: "54321" };

      await addressController.updateAddress(req as Request, res as Response);

      expect(errorResponse).toHaveBeenCalledWith(res, "Internal Server Error", 500);
    });
  });
});
