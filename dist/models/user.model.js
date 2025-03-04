"use strict";
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
exports.getUserCount = exports.createUser = exports.getUserByEmail = exports.getUserById = exports.getUsers = void 0;
const db_1 = __importDefault(require("../config/db"));
const getUsers = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (pageNumber = 0, pageSize = 10) {
    return (0, db_1.default)("users")
        .limit(pageSize)
        .offset(pageNumber * pageSize);
});
exports.getUsers = getUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, db_1.default)("users").where({ id }).first();
});
exports.getUserById = getUserById;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, db_1.default)("users").where({ email }).first();
});
exports.getUserByEmail = getUserByEmail;
const createUser = (users) => __awaiter(void 0, void 0, void 0, function* () {
    const [id] = yield (0, db_1.default)("users").insert(users);
    return Object.assign({ id }, users);
});
exports.createUser = createUser;
const getUserCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const [count] = yield (0, db_1.default)("users").count();
    return count["count(*)"];
});
exports.getUserCount = getUserCount;
