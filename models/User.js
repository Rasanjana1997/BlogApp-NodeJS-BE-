import mogoose from 'mongoose'

const Schema = mogoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        rerequired: true,
        minlength: 6,
    },
    blogs: [{
        type: mogoose.Types.ObjectId,
        ref: "blogs",
        required: true,
    }]
})

export default mogoose.model("users", userSchema)