import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const googleAuth = async (req, res) => {
    try {
        const { email, name } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email, name });

        }
        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token,
            {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        return res.status(200).json({ message: "login successful", user });


    } catch (err) {
        console.log(`google login error ${err}`);
       
        return res.status(500).json({ message: "google login error" });
    }
}
export const logout = async (req, res) => {
    try {
        await res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.log(`logout error ${err}`);
        return res.status(500).json({ message: "logout error" });
    }
}
