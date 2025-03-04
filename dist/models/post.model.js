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
exports.countPostsByUserId = exports.getPostsByUserIdWithPagination = exports.deletePost = exports.createPost = exports.getPostsByUserId = void 0;
const db_1 = __importDefault(require("../config/db"));
const getPostsByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, db_1.default)("posts").where({ user_id });
});
exports.getPostsByUserId = getPostsByUserId;
const createPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [id] = yield (0, db_1.default)("posts").insert(post);
        return Object.assign({ id }, post);
    }
    catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
});
exports.createPost = createPost;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, db_1.default)("posts").where({ id }).del();
});
exports.deletePost = deletePost;
const getPostsByUserIdWithPagination = (user_id, page, pageSize) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, db_1.default)("posts")
        .where({ user_id })
        .offset((page - 1) * pageSize)
        .limit(pageSize);
});
exports.getPostsByUserIdWithPagination = getPostsByUserIdWithPagination;
const countPostsByUserId = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield (0, db_1.default)("posts").where({ user_id }).count();
    return count[0]["count(*)"];
});
exports.countPostsByUserId = countPostsByUserId;
