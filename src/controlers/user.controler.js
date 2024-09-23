import { User } from "../models/user.model.js";
import { Car } from "../models/car.model.js";


const registration = async(req, res) => {
    // steps for registration
    // 1. details from user
    // 2. check availabilty
    // 3. save in db
    // 4. response without password
    // 5. back to home


    try {
        // 1.
        const {name, email, password, address, bid} = req.body;
    
    
        // 2. 
        const existingData = await User.findOne(
            {$or: [{name}, {email}]}
        )
    
        if(existingData){
            return res.send("User already exist!!")
        }
    
    
        // 3.
        const userdata = await User.create({
            name,
            email,
            password,
            address,
            bid
        })
    
    
        // 4.
        const createdUser = await User.findById(userdata._id).select("-pasword")
        
        if(!createdUser){
            res.send("User can't created!");
        }
    
        res.send(`User created successfully! \n ${createdUser}`);
    } catch (error) {
        console.log("Error in registerUser!")
        res.send(`Error in registerUser! \n ${error}`)
    }

}





const loginUser = async(req, res) => {

    // steps for login user
    // 1. take details from user
    // 2. match the details
    // 3. response confirm
    // 4. redirect to Car_manupulation



    try {
        // 1.
        const {email, password} = req.body
    
    
    
    
    
        // 2. 
        const userData = await User.findOne(
            {email}
        )

        if(!userData){
            return res.send("invalid userName/email or password")
        }
    
        if(!(userData.email == email && userData.password == password)){
            return res.send("invalid userName/email or password")
        }
        
    
    
        // 3.
        res.send("User login successfully!")
    
    
    
    
        // 4. redirection can be done in frontend
    } catch (error) {
        console.log(`Error in loginUser! \n ${error}`)
        res.send(`Error in loginUser! \n ${error}`)
    }


}




//steps for add Car
// 1. multer for local storage
// 2. cloudinary url
// 3. save Car in db
// 4. delete from local storage


// 1.
import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage: storage})


// 2.
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dimrihemant27', 
    api_key: '754366376743151', 
    api_secret: 'OSudUKDcmX43TWSyNo5066ZqOYM'
});


// 3.

const addCar = async(req, res) => {
    // steps in func
    // 3.1 multer
    // 3.2 cloudinaty
    // 3.3 save in db
    // 3.4 delete local file
    // 3.5 response


    try {
        // 1.
        const imageLocalStoragePath = req.file.path;                                     
        console.log("imageLocalStoragePath: ",imageLocalStoragePath);

    
    
        // 2.
        let uploadResult;
        try {
            uploadResult = await cloudinary.uploader
            .upload(
                imageLocalStoragePath, {
                    resource_type: "auto",
                }
            )

            console.log("uploadResult succesfully! : \n", uploadResult);
        } catch (error) {
            console.log("uploadResult error: \n", error);
            return res.send(error)
        }
        console.log("uploadResult: ", uploadResult);
    
    
        const imageCloudinaryUrl = uploadResult.secure_url;
        console.log("imageCloudinaryUrl:", imageCloudinaryUrl);
    
        // 3.
        const {company, model, model_year, base_price, max_price} = req.body;
    
        const data = await Car.create({
            company,
            model,
            image: imageCloudinaryUrl,
            model_year,
            base_price,
            max_price
        })
    
    
        // 4.
        if(data){
            // fs.unlinkSync(localFilePath)
        }
    
    
        // 5. 
        res.send(`Car created sucessfully!  \n ${data.title}`)
    } catch (error) {
        console.log("Error in create Car!");
        res.send(`Error in creating Car! \n ${error}`)
    }
    
}



const allCars = async(req, res)=>{
    try {
        const Cars = await Car.find({})
        res.send(Cars)
    } catch (error) {
        res.send(`Error in showing Cars! \n ${error}`)
    }
}




const allUsers = async(req, res)=>{
    try {
        const Users = await User.find({})
        res.send(Users)
    } catch (error) {
        res.send(`Error in showing Users! \n ${error}`)
    }
}


export {registration, loginUser, addCar, upload, allCars, allUsers};