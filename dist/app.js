"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const address_routes_1 = __importDefault(require("./routes/address.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(errorHandler_1.errorHandler);
// API Routes
app.use("/users", user_routes_1.default);
app.use("/posts", post_routes_1.default);
app.use("/addresses", address_routes_1.default);
exports.default = app;
