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
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const response_1 = require("../utils/response"); // Assuming you have this utility
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { full_name, email } = req.body;
    if (!full_name || typeof full_name !== "string" || full_name.trim() === "") {
        return (0, response_1.validationErrorResponse)(res, "Full name is required and should be a non-empty string", [{ field: "full_name", message: "Full name is required" }], 400);
    }
    if (!email || typeof email !== "string" || !/^[\w-]+(\.[\w-]+)*@[\w-]+\.[a-z]{2,6}$/.test(email)) {
        return (0, response_1.validationErrorResponse)(res, "Valid email ending with .com is required", [{ field: "email", message: "Invalid email format" }], 400);
    }
    if (!email.endsWith(".com")) {
        return (0, response_1.validationErrorResponse)(res, "Email must end with .com", [{ field: "email", message: "Email must end with .com" }], 400);
    }
    return next();
});
exports.validateUser = validateUser;
