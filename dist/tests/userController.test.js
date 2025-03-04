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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const userModel = __importStar(require("../models/user.model"));
jest.mock('../models/user.model');
describe('User Controller Tests', () => {
    it('should create a user successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = { full_name: 'John Doe', email: 'john.doe@example.com' };
        jest.spyOn(userModel, 'createUser').mockResolvedValue(Object.assign({ id: 1 }, newUser));
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/users')
            .send(newUser);
        expect(response.status).toBe(201);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data.email).toBe(newUser.email);
    }));
    it('should return an error if email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const existingUser = { full_name: 'Jane Doe', email: 'jane.doe@example.com' };
        jest.spyOn(userModel, 'getUserByEmail').mockResolvedValue(existingUser);
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/users')
            .send({ full_name: 'John Doe', email: existingUser.email });
        expect(response.status).toBe(400);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('User with this email already exists');
    }));
    it('should return users with pagination', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = [
            { id: 1, full_name: 'John Doe', email: 'john.doe@example.com' },
            { id: 2, full_name: 'Jane Doe', email: 'jane.doe@example.com' },
        ];
        const totalCount = 2;
        jest.spyOn(userModel, 'getUsers').mockResolvedValue(users);
        jest.spyOn(userModel, 'getUserCount').mockResolvedValue(totalCount);
        const response = yield (0, supertest_1.default)(app_1.default).get('/users?pageNumber=1&pageSize=2');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.length).toBe(2);
        expect(response.body.pagination.totalCount).toBe(totalCount);
        expect(response.body.pagination.totalPages).toBe(1);
    }));
    it('should return a user by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = { id: 1, full_name: 'John Doe', email: 'john.doe@example.com' };
        jest.spyOn(userModel, 'getUserById').mockResolvedValue(user);
        const response = yield (0, supertest_1.default)(app_1.default).get('/users/1');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data).toHaveProperty('id', 1);
        expect(response.body.data.email).toBe(user.email);
    }));
    it('should return an error if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(userModel, 'getUserById').mockResolvedValue(null);
        const response = yield (0, supertest_1.default)(app_1.default).get('/users/999');
        expect(response.status).toBe(404);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('User not found');
    }));
});
