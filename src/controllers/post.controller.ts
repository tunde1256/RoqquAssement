import { Request, Response } from "express";
import * as postModel from "../models/post.model";
import { successResponse, errorResponse, paginationResponse, deletionSuccessResponse } from "../utils/response";

export const getPostsByUserId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_id, page = 1, pageSize = 10 } = req.query; 

    if (!user_id) {
      return errorResponse(res, "User ID is required", 400);
    }

    const pageNum = Number(page);
    const pageSizeNum = Number(pageSize);

    const posts = await postModel.getPostsByUserIdWithPagination(Number(user_id), pageNum, pageSizeNum);
    
    const totalCount = await postModel.countPostsByUserId(Number(user_id));

    return paginationResponse(res, posts, pageNum, pageSizeNum, totalCount, "Posts retrieved successfully");
  } catch (error) {
    return errorResponse(res, "Internal Server Error", 500);
  }
};

export const getAllPostsByUserId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return errorResponse(res, "User ID is required", 400);
    }

    const posts = await postModel.getPostsByUserId(Number(user_id));

    if (!posts || posts.length === 0) {
      return errorResponse(res, "No posts found for this user", 404);
    }

    return successResponse(res, posts, "Posts retrieved successfully");
  } catch (error) {
    return errorResponse(res, "Internal Server Error", 500);
  }
};

export const createPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, body, user_id } = req.body;

    if (!title || !body || !user_id) {
      return errorResponse(res, "Title, body, and user_id are required", 400);
    }

    const post = { title, body, user_id };  
    const createdPost = await postModel.createPost(post);

    return successResponse(res, createdPost, "Post created successfully", 201);
  } catch (error) {
    return errorResponse(res, "Internal Server Error", 500);
  }
};

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params; 

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        status: "error",
        message: "Post ID must be a valid number"
      });
    }

    const deletedPost = await postModel.deletePost(Number(id)); 

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
    
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error"
    });
  }
};
