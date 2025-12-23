const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // ✅ Check header exists
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    // ✅ Extract token
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;   // attach user info to request
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

const generateToken = (userData) => {
    return jwt.sign(
        userData,
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports = { jwtAuthMiddleware, generateToken };
