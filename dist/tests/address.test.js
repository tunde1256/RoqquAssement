"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const addressModel = __importStar(require("../models/address.model"));
const addressController = __importStar(require("../controllers/address.controller"));
const response_1 = require("../utils/response");
// Mocking dependencies
jest.mock("../models/address.model");
jest.mock("../utils/response");
describe("Address Controller", () => {
    let req;
    let res;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
    });
    describe("getAddressByUserId", () => {
        it("should return 404 if no address is found", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue(null);
            req.params = { user_id: "1" };
            yield addressController.getAddressByUserId(req, res);
            expect(addressModel.getAddressByUserId).toHaveBeenCalledWith(1);
            expect(response_1.errorResponse).toHaveBeenCalledWith(res, "Address not found", 404);
        }));
        it("should return the address if found", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAddress = { user_id: 1, street: "Street 1", city: "City", state: "State", zip_Code: "12345" };
            jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue(mockAddress);
            req.params = { user_id: "1" };
            yield addressController.getAddressByUserId(req, res);
            expect(addressModel.getAddressByUserId).toHaveBeenCalledWith(1);
            expect(response_1.successResponse).toHaveBeenCalledWith(res, mockAddress, "Address retrieved successfully");
        }));
        it("should return 500 on error", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(addressModel, 'getAddressByUserId').mockRejectedValue(new Error("Database error"));
            req.params = { user_id: "1" };
            yield addressController.getAddressByUserId(req, res);
            expect(response_1.errorResponse).toHaveBeenCalledWith(res, "Internal Server Error", 500);
        }));
    });
    describe("Address Controller", () => {
        let req;
        let res;
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
        it("should create an address successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAddress = {
                user_id: 1,
                street: "Street",
                city: "City",
                state: "State",
                zip_Code: "12345",
                id: 1
            };
            addressModel.createAddress.mockResolvedValue(mockAddress);
            yield addressController.createAddress(req, res);
            expect(addressModel.createAddress).toHaveBeenCalledWith({
                user_id: 1,
                street: "Street",
                city: "City",
                state: "State",
                zip_Code: "12345"
            });
            expect(response_1.successResponse).toHaveBeenCalledWith(res, mockAddress, "Address created successfully", 201);
        }));
    });
    describe("updateAddress", () => {
        it("should return 404 if address not found", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue(null);
            req.params = { user_id: "1" };
            req.body = { street: "New Street", city: "New City", state: "New State", zip_Code: "54321" };
            yield addressController.updateAddress(req, res);
            expect(addressModel.getAddressByUserId).toHaveBeenCalledWith(1);
            expect(response_1.errorResponse).toHaveBeenCalledWith(res, "Address not found for the given user_id", 404);
        }));
        it("should update the address successfully", () => __awaiter(void 0, void 0, void 0, function* () {
            const existingAddress = { user_id: 1, street: "Old Street", city: "Old City", state: "Old State", zip_Code: "54321" };
            const updatedAddress = { user_id: 1, street: "New Street", city: "New City", state: "New State", zip_Code: "54321" };
            jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue(existingAddress);
            jest.spyOn(addressModel, 'updateAddress').mockResolvedValue(1); // Mocking successful update
            jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue(updatedAddress);
            req.params = { user_id: "1" };
            req.body = updatedAddress;
            yield addressController.updateAddress(req, res);
            expect(addressModel.updateAddress).toHaveBeenCalledWith(1, updatedAddress);
            expect(response_1.successResponse).toHaveBeenCalledWith(res, updatedAddress, "Address updated successfully");
        }));
        it("should return 404 if no rows were updated", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue({}); // Address exists but update fails
            jest.spyOn(addressModel, 'updateAddress').mockResolvedValue(0); // No rows updated
            req.params = { user_id: "1" };
            req.body = { street: "New Street", city: "New City", state: "New State", zip_Code: "54321" };
            yield addressController.updateAddress(req, res);
            expect(addressModel.updateAddress).toHaveBeenCalledWith(1, expect.any(Object));
            expect(response_1.errorResponse).toHaveBeenCalledWith(res, "No address found to update for the given user_id", 404);
        }));
        it("should return 500 on error", () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(addressModel, 'getAddressByUserId').mockResolvedValue({});
            jest.spyOn(addressModel, 'updateAddress').mockRejectedValue(new Error("Database error"));
            req.params = { user_id: "1" };
            req.body = { street: "New Street", city: "New City", state: "New State", zip_Code: "54321" };
            yield addressController.updateAddress(req, res);
            expect(response_1.errorResponse).toHaveBeenCalledWith(res, "Internal Server Error", 500);
        }));
    });
});
