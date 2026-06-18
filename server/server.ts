import express  from 'express';
import dotenv from 'dotenv';
import { DataSource , type DataSourceOptions} from 'typeorm';
import Register from './models/registerModel.js';
import {registerRouter } from './Router/registerRouter.js'
import cors from 'cors'
import cookieParser from "cookie-parser";


dotenv.config()

// create express application
const app = express()

// Converts JSON request body into JavaScript object÷
app.use(express.json())

// Allow request from other origins 
app.use(cors({origin:"http://localhost:5173",credentials: true}))

app.use(cookieParser());

app.use('/register' , registerRouter)

// Database configuration
const data : DataSourceOptions = {
    type : process.env.DB_TYPE as 'postgres',
    host : process.env.DB_HOST as string ,
    password : process.env.DB_PASSWORD as string ,
    database : process.env.DB_NAME as string ,
    username : process.env.DB_USER as string ,
    port : Number(process.env.DB_PORT),
    synchronize : true ,                                //TypeORM automatically creates/updates tables.
    entities : [Register]
}
export const database = new DataSource(data)
const port = process.env.PORT

// database connection 
const connection = async () => {
    try{
    await database.initialize()
    console.log("Database connected")
    app.listen(port , ()=>{
    console.log("server started")
})
    }
    catch(error){
        console.log(error)
        console.log("Unable to connect database ")
    }
}

connection()

