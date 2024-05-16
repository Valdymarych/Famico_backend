import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        condition : {
            type: String,
            required: true
        },
        answer : {
            type: String,
            required: true
        },
        mark: {
            type: Number,
            required: true
        },
        group: {
            type: String,
            required: true
        }
    }
)

export default mongoose.model("Task", TaskSchema)