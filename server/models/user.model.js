import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true 
        // Ensure email is unique
    },
    credits: {
        type: Number,
        default: 100
    }
    
    //for createdAt and updatedAt fields
}, { timestamps: true }
);
const User = mongoose.model("User", userSchema);

export default User;