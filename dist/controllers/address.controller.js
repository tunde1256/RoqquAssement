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
exports.updateAddress = exports.createAddress = exports.getAddressByUserId = void 0;
const addressModel = __importStar(require("../models/address.model"));
const response_1 = require("../utils/response");
const getAddressByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const address = yield addressModel.getAddressByUserId(Number(user_id));
        if (!address) {
            return (0, response_1.errorResponse)(res, "Address not found", 404);
        }
        return (0, response_1.successResponse)(res, address, "Address retrieved successfully");
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, "Internal Server Error", 500);
    }
});
exports.getAddressByUserId = getAddressByUserId;
const createAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, street, city, state, zip_Code } = req.body;
        if (!user_id || !street || !city || !state || !zip_Code) {
            return (0, response_1.errorResponse)(res, "Missing required fields", 400);
        }
        const address = { user_id, street, city, state, zip_Code };
        const createdAddress = yield addressModel.createAddress(address);
        return (0, response_1.successResponse)(res, createdAddress, "Address created successfully", 201);
    }
    catch (error) {
        console.error("Error creating address:", error);
        return (0, response_1.errorResponse)(res, "Internal Server Error", 500);
    }
});
exports.createAddress = createAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const { street, city, state, zip_Code } = req.body;
        const existingAddress = yield addressModel.getAddressByUserId(Number(user_id));
        if (!existingAddress) {
            return (0, response_1.errorResponse)(res, "Address not found for the given user_id", 404);
        }
        const address = { user_id: Number(user_id), street, city, state, zip_Code };
        const rowsUpdated = yield addressModel.updateAddress(Number(user_id), address);
        if (rowsUpdated === 0) {
            return (0, response_1.errorResponse)(res, "No address found to update for the given user_id", 404);
        }
        const updatedAddress = yield addressModel.getAddressByUserId(Number(user_id));
        return (0, response_1.successResponse)(res, updatedAddress, "Address updated successfully");
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, "Internal Server Error", 500);
    }
});
exports.updateAddress = updateAddress;
