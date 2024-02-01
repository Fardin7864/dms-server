import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Connection options with write concern 'majority'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: 'majority'
    }
  };


const connectDB = async () => {
    try {
        // console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, options)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        console.log(`${process.env.MONGODB_URI}/${DB_NAME}`)
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB