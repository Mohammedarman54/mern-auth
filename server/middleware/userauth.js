// middleware/userauth.js
import jwt from "jsonwebtoken";

const userauth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: "Not Authorized. Login again" });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            req.user = tokenDecode.id;   // ✅ store ID here
            next();
        } else {
            return res.json({ success: false, message: "Not Authorized. Login again" });
        }

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export default userauth;
