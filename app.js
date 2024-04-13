import express from 'express';
import mongoose from "mongoose";
import routerUser from './routes/user-routes';
import routerBlog from './routes/blog-routes';

const app = express()

app.use(express.json());

app.use("/api/user", routerUser);
app.use("/api/blog", routerBlog);

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.04giice.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => app.listen(5000))
    .then(() => {
        console.log("MongoDB connection successefull")
    })
    .catch((error) => {
        console.log("DB connection error : ", error);
    });