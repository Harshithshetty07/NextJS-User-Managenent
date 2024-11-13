import mongoose from "mongoose";

if(!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URL to .env.local')
}

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'usermanagement'
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);   
    } catch (error){
        console.error(error);
        process.exit(1)
    }
}