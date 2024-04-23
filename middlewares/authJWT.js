import jwt from "jsonwebtoken";
import roleAccess from "./roleAccess.js";

const authJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        throw new Error('Missing_Token');
    }

    jwt.verify(
        token.replace("Bearer ", ""),
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid Token" });
            }
            req.userId = decoded.userId;
            req.userRole = decoded.role;

            if (!roleAccess(req.userRole, req.baseUrl)) {
                return res.status(403).json({ message: 'Unauthorized Access' });
            }

            next();
        },
    );
};

export default authJWT;
