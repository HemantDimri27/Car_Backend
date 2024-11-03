import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    // name, email, pass, add, bid, car
    name: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bid: {
        type: Number
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: "Car"
    },
    winning: {
        type: String,   // str += registration_no
    }
})



export const User = mongoose.model("User", userSchema)