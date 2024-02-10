import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";


const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.route.js'
import companyRouter from './routes/company.route.js'
import categoryRouter from './routes/category.route.js'
import employeeRouter from './routes/employee.route.js'


//routes 

app.use("/api/v1/users", userRouter)
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/employee", employeeRouter)



export {app}