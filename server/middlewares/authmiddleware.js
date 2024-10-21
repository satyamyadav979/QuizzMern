const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Authorization header is missing" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Authorization token is missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.userId;

        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

