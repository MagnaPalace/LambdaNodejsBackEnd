import jwt from 'jsonwebtoken';

const SECRET_KEY = 'secret_key';

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        return res.status(401).json({ code: 401, message: 'Token is missing' });
    }

    jwt.verify(token, SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(403).json({ code: 403, message: 'Invalid token' });
        }

        // トークンが有効であれば、ユーザー情報をリクエストに追加
        req.uuid = payload.uuid;
        next();
    });
};

export default authenticateJWT;