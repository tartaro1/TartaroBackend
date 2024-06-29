import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json({ message: "Access denied" });
    }
    try {
        const decoded = await jwt.verify(token, process.env.TOKEN_PRIVATEKEY);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.Rol === 2) {
        next();
    } else {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
};