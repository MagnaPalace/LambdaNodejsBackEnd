import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const client = new DynamoDBClient({ region: "ap_northeast-1", endpoint: "http://localhost:8000" });

const TABLE_NAME = 'project_user'; // DynamoDBのテーブル名

const SECRET_KEY = 'secret_key';

    // ユーザー登録メソッド
export const register = async ({ uuid, email, password }) => {
    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // DynamoDBに保存するユーザーデータ
    const params = {
        TableName: TABLE_NAME,
        Item: {
            uuid: uuid,
            email: email,
            password: hashedPassword,
            createdAt: new Date().toISOString()
        }
    };

    // データベースに保存
    // await dynamoDB.put(params).promise();
    try {
        const data = await client.send(new PutItemCommand(params));
        console.log(data);
      } catch (err) {
        console.error(err);
      }

    // JWTトークンを生成
    const token = jwt.sign({ uuid, email }, SECRET_KEY, { expiresIn: '1h' });

    return token;
};