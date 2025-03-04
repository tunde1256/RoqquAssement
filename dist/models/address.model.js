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
exports.updateAddress = exports.createAddress = exports.getAddressByUserId = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAddressByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, db_1.default)("addresses").where({ user_id }).first();
});
exports.getAddressByUserId = getAddressByUserId;
const createAddress = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const [id] = yield (0, db_1.default)("addresses").insert(address);
    return Object.assign({ id }, address);
});
exports.createAddress = createAddress;
const updateAddress = (user_id, address) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, db_1.default)("addresses")
        .where({ user_id: user_id })
        .update(address);
});
exports.updateAddress = updateAddress;
