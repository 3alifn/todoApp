import fs from "fs";
import path from "path";
import express from "express";
import ejs from "ejs";
import cors from "cors";
import mysql from "mysql";
import expressSession from "express-session";
import MySQLStore from "express-mysql-session";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import multer from "multer";
import nodeMailer from "nodemailer";
const app= express();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// cross origin resource share config...
app.use(cors({
    origin: true,
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
  optionsSuccessStatus: 200
}))

// request data or from fata parse...
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// express app config...
app.set('trust proxy', 1);
app.enable("trust proxy", true);
// set ejs view engine...
app.set("view engine", "ejs");
// set views pages dir...
app.set("views", path.join(__dirname, "./views"));
// set express static files path....
app.use(express.static(path.join(__dirname, './public')));
// browser cookies use app...
app.use(cookieParser('pipilikiapipra'));

// mysql database config...
const sqlmap= mysql.createPool({
    host: process.env.host_name,
    user: process.env.user_name,
    password: process.env.user_password,
    database: process.env.database_name,
    // queueLimit: 0,
    connectionLimit: 50
})

// express session config...
const mysqlStore= MySQLStore(expressSession)
// session time one week...
const sessionStore= new mysqlStore({expiration: 86400000*7}, sqlmap)
app.use(expressSession({
  key: 'mysqlSession',
  secret: 'pipra',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  name: 'TodoApp',
  cookie: {
   path: '/', secure: false, httpOnly: true, maxAge:  86400000*7, 
  }
})
)
const PORT= process.env.listen_port || 3000;
app.listen(PORT, ()=>{
  console.log(`Todo App Started... _> code by alifn => server is runnig on port ${PORT}`);
})


export {
  sqlmap, express, app, mysql, multer, nodeMailer, __filename, __dirname
}