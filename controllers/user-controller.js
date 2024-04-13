import User from "../models/User";
import bcrypt from "bcryptjs"

export const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (error) {
        console.log("user getting error : ", error)
    }

    if (!users) {
        return res.status(404).json({ message: "No user found" })
    }

    return res.status(200).json({ users })
}

export const userCreate = async (req, res, next) => {
    const {name, email, password} = req.body;

    console.log(email)

    try{
        let existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message:"duplicate email address"})
        }

        const hashedPassword = bcrypt.hashSync(password)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            blogs: [],
        })
        try{
            newUser.save()
            return res.status(200).json({newUser})
        } catch(err){
            return console("error in saving new user : ", err);
        }
    } catch(err){
        console.log("error in find exixting user : ", err);
    }
}

export const userLogin = async (req, res, next) => {
    const {email, password} = req.body

    try{
        let existingUser = await User.findOne({ email })
        if(existingUser){
            let isPasswordMatch = bcrypt.compareSync(password, existingUser.password)
            if(isPasswordMatch){
                return res.status(200).json({message:"user login successfull"})
            }else{
                return res.status(404).json({message:"incorect password"}) 
            }
        }else{
            return res.status(404).json({message:"incorect email"})
        }
    } catch(error){
        console.log("Login Error : ", error)
        return res.status(200).json({message:error})
    }
}