 import { Router } from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  createBlog,
  getAllBlog,
  getblogbySlug,
  updateBlog,
  deleteBlog,
} from "../controller/blog.controller.js";

const router = Router();

router.post("/createBlog", verifyAccessToken, createBlog);
router.get("/", getAllBlog);
router.get("/:slug", getblogbySlug);
router.put("/:id", verifyAccessToken, updateBlog);
router.delete("/:id", verifyAccessToken, deleteBlog);

export default router;
