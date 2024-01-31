import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
    try {
        // console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
        // const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        const connectionInstance = await mongoose.connect(`mongodb+srv://veloci:hamba78@cluster0.7k1zdza.mongodb.net/?retryWrites=true/veloci-server`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB