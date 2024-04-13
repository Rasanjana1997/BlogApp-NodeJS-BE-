import express from "express";
import { getAllBlogs, createBlog, updateBlog, getSingleBlog, deleteSingleBlog, getBlogsOfUser } from "../controllers/blog-controller";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/create", createBlog);
router.put("/update/:id", updateBlog);
router.get("/:id", getSingleBlog);
router.delete("/:id", deleteSingleBlog)
router.get("/user/:id", getBlogsOfUser)

export default router;