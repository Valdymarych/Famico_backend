import mongoose from "mongoose";
import { OneResultSchema } from "./OneResult";

const ResultSchema = new mongoose.Schema(
    {
        data: [
            OneResultSchema
        ],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            unique: true,
            required: true
        },
    }
)

export default mongoose.model("Result", ResultSchema)