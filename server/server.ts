import express  from 'express';
import dotenv from 'dotenv';
import { DataSource , type DataSourceOptions} from 'typeorm';

dotenv.config()

const app = express()

app.use(express.json())

const data : DataSourceOptions = {
    type : process.env.DB_TYPE as 'postgres',
    host : process.env.DB_HOST as string ,
    password : process.env.DB_PASSWORD as string ,
    database : process.env.DB_NAME as string ,
    username : process.env.DB_USER as string ,
    port : Number(process.env.DB_PORT),
}
export const database = new DataSource(data)
const port = process.env.PORT

const connection = async () => {
    try{
    await database.initialize()
    console.log("Database connected")
    }
    catch(error){
        console.log("Unable to connect database ")
    }
}

connection()

app.listen(port , ()=>{
    console.log("server started")
})