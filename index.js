import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js"
import router from "./routes/index.js";
dotenv.config();
const app = express();

try{
    await db.authenticate();
    console.log('Database terhubung...');
} catch (error){
    console.log('Database tidak di temukan');
}

app.use(cors({credentials:true, origin:true}))
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, ()=> console.log('server berjalan port 5000'));