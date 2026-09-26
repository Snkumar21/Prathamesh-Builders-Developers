import jwt from "jsonwebtoken";

// ADMIN AUTH MIDDLEWARE
export default function auth(req, res, next) {
    try {
        // Get Authorization header
        const authorizationHeader =
            req.headers.authorization;

        // Check Bearer token format
        if (
            !authorizationHeader ||
            !authorizationHeader.startsWith("Bearer ")
        ) {
            return res.status(401).json({
                message: "Not authorized.",
            });
        }

        // Extract token
        const token =
            authorizationHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Not authorized.",
            });
        }

        // Check JWT secret
        if (!process.env.JWT_SECRET) {
            console.error(
                "JWT_SECRET is not configured."
            );
            return res.status(500).json({
                message: "Server configuration error.",
            });
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach admin data to request
        req.admin = decoded;

        // Continue to protected route
        next();
    } catch (error) {
        // Expired JWT
        if (
            error.name === "TokenExpiredError"
        ) {
            return res.status(401).json({
                message:
                    "Session expired. Please sign in again.",
            });
        }

        // Invalid / malformed JWT
        return res.status(401).json({
            message: "Invalid token.",
        });
    }
}