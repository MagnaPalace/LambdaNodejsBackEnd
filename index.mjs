console.log("Starting the server...");

import express from 'express';
import serverless from 'serverless-http';
import router from './function/routes/router.js'; // ルーターをインポート

const app = express();

// JSONパースミドルウェア
app.use(express.json());
const port = 3000;

// ルーティング
app.use('/', router);

// Lambdaハンドラとしてエクスポート
// export const handler = serverless(app);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});