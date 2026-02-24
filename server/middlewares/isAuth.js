import jwt from 'jsonwebtoken';
const isAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
    
    next();
};

export default isAuth;