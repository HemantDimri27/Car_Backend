import mongoose, { Schema } from "mongoose";

const carSchema = new mongoose.Schema({
    // brand, model, model_year, base_price, max_price, owner
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
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

})




export const Car = mongoose.model("Car", carSchema)