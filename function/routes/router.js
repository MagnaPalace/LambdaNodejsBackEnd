import express from 'express';
import { register } from '../controllers/userController.js';
import jwt from 'jsonwebtoken';
import authenticateJWT from '../authMiddleware.js';

const router = express.Router();

const SECRET_KEY = 'secret_key';

// 登録
router.post('/register', async (req, res) => {
    console.log('called register.');
    const { uuid, email, password } = req.body;

    if (!uuid || !email || !password) {
        return res.status(400).json({ code: res.status, message: 'UUID, email, and password are required' });
    }

    try {
        // ユーザーを登録し、トークンを生成
        const token = await register({ uuid, email, password });
        res.status(201).json({ code: res.status, message: 'User registered successfully', token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ code: res.status, message: 'Internal Server Error' });
    }
});

// ログイン
router.post('/login', (req, res) => {
    const payload = {
        uuid: req.body.uuid
    };
    console.log(req.body.uuid);
    const option = {
        expiresIn: '5m'
    }
    const token = jwt.sign(payload, SECRET_KEY, option);
    res.json({
        code: 200,
        message: "create token",
        token: token
    });
});

router.post('/test', (req, res) => {
    console.log(req.body);
    res.json({ req : req.body, message : 'Hello World!'});
});

router.get('/', (req, res) => {
    res.json({ message : 'Hello World!'});
});

// ユーザー取得
router.get('/user', authenticateJWT, (req, res) => {
    console.log(req.uuid);
    res.json([{uuid: req.uuid}]);
});

export default router;