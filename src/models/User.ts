import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true
        },
        started: {
            type: Boolean,
            default: false
        },
        finished: {
            type: Boolean,
            default: false,
        },
        startedTime: {
            type: Number,
            default: 0,
        }
    }
)

export default mongoose.model("User", UserSchema)