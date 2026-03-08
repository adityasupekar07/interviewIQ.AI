import e from "express";
import mongoodse from "mongoose";

const questionSchema = new mongoodse.Schema({
    question: { type: String },
    answer: { type: String },
    difficulty: { type: String },
    timeLimit: { type: Number }, // in seconds
    feedback: String,
    score: { type: Number, default: 0 },
    confidence: { type: Number, default: 0 },
    communication: { type: Number, default: 0 },
    correctness: { type: Number, default: 0 },


});




const interviewSchema = new mongoodse.Schema({
    userId:
    {
        type: mongoodse.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true,
        enum: ["Technical", "HR"]
    },
    resumeText: String,
    questions: [questionSchema],
    status: {
        type: String,
        enum: ["completed", "incompleted"],
        default: "incompleted"
    },
    finalScore: { type: Number, default: 0 },
}, { timestamps: true });


const Interview = mongoodse.model("Interview", interviewSchema);
export default Interview;