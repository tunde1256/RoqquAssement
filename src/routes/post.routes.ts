import { Router } from "express";
import * as postController from "../controllers/post.controller";
import {validatePost}  from "../middlewares/validatePost";
import { validatePostId } from "../middlewares/validatePostId.middleware";

const router = Router();

router.get("/", postController.getAllPostsByUserId);

router.get("/posts/paginated", postController.getPostsByUserId);

router.post("/posts",postController.createPost);

router.delete("/:id",validatePostId, postController.deletePost);

export default router;
