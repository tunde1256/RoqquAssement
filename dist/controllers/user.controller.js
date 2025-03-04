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
exports.getUserCount = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const userModel = __importStar(require("../models/user.model"));
const response_1 = require("../utils/response");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageNumber = Number(req.query.pageNumber) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        if (isNaN(pageNumber) || pageNumber < 1) {
            return (0, response_1.validationErrorResponse)(res, "Page number must be a positive integer", [{ field: "pageNumber", message: "Invalid page number" }], 400);
        }
        if (isNaN(pageSize) || pageSize < 1) {
            return (0, response_1.validationErrorResponse)(res, "Page size must be a positive integer", [{ field: "pageSize", message: "Invalid page size" }], 400);
        }
        const totalCountRaw = yield userModel.getUserCount();
        const totalCount = totalCountRaw != null ? parseInt(String(totalCountRaw), 10) : 0;
        const users = yield userModel.getUsers(pageNumber - 1, pageSize);
        if (!Array.isArray(users)) {
            return (0, response_1.errorResponse)(res, "Failed to retrieve users", 500);
        }
        const totalPages = Math.ceil(totalCount / pageSize);
        if (pageNumber > totalPages) {
            return (0, response_1.paginationResponse)(res, [], pageNumber, pageSize, totalCount);
        }
        return (0, response_1.paginationResponse)(res, users, pageNumber, pageSize, totalCount);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        return (0, response_1.errorResponse)(res, "Internal Server Error", 500);
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userModel.getUserById(Number(id));
        if (!user) {
            return (0, response_1.errorResponse)(res, "User not found", 404);
        }
        return (0, response_1.successResponse)(res, user, "User details retrieved successfully");
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, "Internal Server Error", 500);
    }
});
exports.getUserById = getUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { full_name, email } = req.body;
        // Check for missing fields
        if (!full_name || !email) {
            return (0, response_1.validationErrorResponse)(res, "Full name and email are required", [
                { field: "full_name", message: "Full name is required" },
                { field: "email", message: "Email is required" },
            ]);
        }
        // Check if email already exists
        const existingUser = yield userModel.getUserByEmail(email);
        if (existingUser) {
            return (0, response_1.validationErrorResponse)(res, "User with this email already exists", [
                { field: "email", message: "Email already in use" },
            ]);
        }
        // Create new user
        const newUser = { full_name, email };
        const createdUser = yield userModel.createUser(newUser);
        // Return success response
        return (0, response_1.successResponse)(res, createdUser, "User created successfully", 201);
    }
    catch (error) {
        console.error("Error creating user:", error);
        return (0, response_1.errorResponse)(res, "Internal Server Error", 500);
    }
});
exports.createUser = createUser;
const getUserCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield userModel.getUserCount();
        return (0, response_1.successResponse)(res, { count }, "User count retrieved successfully");
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, "Internal Server Error", 500);
    }
});
exports.getUserCount = getUserCount;
