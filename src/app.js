import express from "express";
import dbConnection from "./db/dbConnection.js";
import { User } from "./models/user.model.js";


const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))



// router
import router from "./routers/user.router.js";
app.use('/', router)




// put data in db
app.post("/add", (req, res)=>{
    try {
        const data = req.body
        const resData = User.create(data)
        res.send(`Data is save`);
        console.log("Data is save.");
    } catch (error) {
        res.send(`Data is not save ${error}`);
        console.log("Data not save.");
    }
})




// dotenv config
import dotenv from "dotenv"
dotenv.config()




// DB connection
dbConnection();


// welcome page
app.get("/", (req, res)=>{
    res.send("Serverver srart successfully!")
});

const port = process.env.PORT || 8000;
app.listen(port, ()=>{console.log(`Server listen at ${port}`);})