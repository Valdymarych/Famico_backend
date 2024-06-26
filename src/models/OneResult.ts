import mongoose from "mongoose";

export const OneResultSchema = new mongoose.Schema(
    {
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }
)

export default mongoose.model("OneResult", OneResultSchema)