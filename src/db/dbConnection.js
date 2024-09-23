import mongoose from "mongoose";


const dbConnection = async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log("DB connect successfully !");
    } catch (error) {
        console.log("DB not connect! ", error);
    }
}


export default dbConnection;