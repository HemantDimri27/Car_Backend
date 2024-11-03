import mongoose, { Schema } from "mongoose";

const carSchema = new mongoose.Schema({
    // brand, model, model_year, base_price, max_price, owner, registration_No. , RTO
    company: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    model_year: {
        type: Number,
        required: true
    },
    base_price: {
        type: Number,
        required: true
    },
    max_price: {
        type: Number,
        // required: true,
    },
    registration_no: {
        type: String,
        // required: true,
    },
    RTO : {
        type: String,
        // required: true,
    },
    owner: {
        type: String,
    },
    winner: {
        type: String,
    }
})




export const Car = mongoose.model("Car", carSchema)