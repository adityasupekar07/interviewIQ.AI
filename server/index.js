import express from 'express'
import dotenv from "dotenv"
import { connectDb } from "./config/connectDb.js"
import cookieParser from 'cookie-parser';
dotenv.config();
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors";
const app = express();
// Middleware to get request  on only frontend with url http://localhost:5173 and allow credentials like cookies
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());



const PORT = process.env.PORT || 6000

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.get("/", (req, res) => {
    return res.json({ message: "server started" });
})
app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
    connectDb();
})
