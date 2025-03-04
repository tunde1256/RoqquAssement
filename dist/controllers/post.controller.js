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
exports.deletePost = exports.createPost = exports.getAllPostsByUserId = exports.getPostsByUserId = void 0;
const postModel = __importStar(require("../models/post.model"));
const response_1 = require("../utils/response");
const getPostsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, page = 1, pageSize = 10 } = req.query;
        if (!user_id) {
            return (0, response_1.errorResponse)(res, "User ID is required", 400);
        }
        const pageNum = Number(page);
        const pageSizeNum = Number(pageSize);
        const posts = yield postModel.getPostsByUserIdWithPagination(Number(user_id), pageNum, pageSizeNum);
        const totalCount = yield postModel.countPostsByUserId(Number(user_id));
        return (0, response_1.paginationResponse)(res, posts, pageNum, pageSizeNum, totalCount, "Posts retrieved successfully");
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, "Internal Server Error", 500);
    }
});
exports.getPostsByUserId = getPostsByUserId;
const getAllPostsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return (0, response_1.errorResponse)(res, "User ID is required", 400);
        }
        const posts = yield postModel.getPostsByUserId(Number(user_id));
        if (!posts || posts.length === 0) {
            return (0, response_1.errorResponse)(res, "No posts found for this user", 404);
        }
        return (0, response_1.successResponse)(res, posts, "Posts retrieved successfully");
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, "Internal Server Error", 500);
    }
});
exports.getAllPostsByUserId = getAllPostsByUserId;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, user_id } = req.body;
        if (!title || !body || !user_id) {
            return (0, response_1.errorResponse)(res, "Title, body, and user_id are required", 400);
        }
        const post = { title, body, user_id };
        const createdPost = yield postModel.createPost(post);
        return (0, response_1.successResponse)(res, createdPost, "Post created successfully", 201);
    }
    catch (error) {
        return (0, response_1.errorResponse)(res, "Internal Server Error", 500);
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({
                status: "error",
                message: "Post ID must be a valid number"
            });
        }
        const deletedPost = yield postModel.deletePost(Number(id));
        if (deletedPost === 0) {
            return res.status(404).json({
                status: "error",
                message: "Post not found"
            });
        }
        return res.status(200).json({
            status: "success",
            message: "Post deleted successfully"
        });
    }
    catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({
            status: "error",
            message: "Internal Server Error"
        });
    }
});
exports.deletePost = deletePost;
