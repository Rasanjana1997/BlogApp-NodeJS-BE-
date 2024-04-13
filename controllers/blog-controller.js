import Blog from "../models/Blog";
import User from "../models/User";
import mongoose from "mongoose";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
        if (blogs) {
            return res.status(200).json({ data: blogs })
        } else {
            return res.status(200).json({ message: `no blog found` })
        }
    } catch (error) {
        console.log("error in all blogs get : ", error)
    }
}

export const createBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    let existingUser 

    try{
        existingUser = await User.findById(user);
    } catch(err){
        console.log("error user fetch : ", err)
    }

    if(!existingUser){
        return res.status(404).json({message: "unable to find a user for given id"})
    }

    let blog = new Blog({
        title,
        description,
        image,
        user,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
        return res.status(200).json({ data: blog })
    } catch (error) {
        console.log("error in create blog : ", error)
        return res.status(500).json({message:error});
    }
}

export const updateBlog = async (req, res, next) => {
    const blogId = req.params.id;
    const { title, description } = req.body;

    try {
        let blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
        if (blog) {
            return res.status(200).json({ message: `blog updated successfully`, data: blog });
        }
        else {
            return res.status(400).json({ message: `blog updated unsuccessfully` });
        }
    } catch (error) {
        console.log("error in update blog : ", error)
    }

}

export const getSingleBlog = async (req, res, next) => {
    const id = req.params.id;
    let singleBlog;
    try {
        singleBlog = await Blog.findById(id);
        if (singleBlog) {
            return res.status(200).json({ data: singleBlog });
        } else {
            return res.status(404).json({ message: `blog not found` });
        }
    } catch (error) {
        console.log("error in get a blog : ", error)
    }
}

export const deleteSingleBlog = async (req, res, next) => {
    const blogId = req.params.id;
    let blog
    try{
        blog = await Blog.findByIdAndDelete(blogId).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        console.log("error in delete a blog : ", error)
    }

    if (!blog) {
        return res.status(404).json({ message: `blog not found` });
    }

    return res.status(200).json({ message: `blog deleted successfully` });
}

export const getBlogsOfUser = async (req, res, next) => {
    const userId = req.params.id;
    let user;
    try{ 
        user = await User.findById(userId).populate('blogs')
    } catch (error) {
        console.log("error in get user blogs : ", error)
    }

    if(!user){
        return res.status(404).json({ message: `user for given id is not found` });
    }
    return res.status(200).json({ data: user });
}

