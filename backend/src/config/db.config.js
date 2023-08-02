import mongoose from "mongoose";
import "dotenv/config";
const dbConnection = async() => {
    const mongoUrl = process.env.MONGO_URI || '';
    const connect = await mongoose.connect( mongoUrl);    
    console.log('Mongodb connected', connect.connection.host);
}
export default dbConnection;