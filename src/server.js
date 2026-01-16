import express, { urlencoded } from 'express';
import { config } from 'dotenv';
import cors from "cors"
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import indexRouter from './routes/index.js';
config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = express();
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use(urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());
server.set('port', process.env.PORT || 9200);
server.use("/", indexRouter);
export default server;
