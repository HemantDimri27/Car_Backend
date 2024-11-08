import { Router } from "express";
import { addCar, allCars, allUsers, loginUser, registration, upload, updateMax } from "../controlers/user.controler.js";



const router = Router();

router.route('/').get(allCars)
router.route('/users').get(allUsers)
router.route('/register').post(registration)
router.route('/login').post(loginUser)
router.route('/updateMax').put(updateMax)
router.route('/addCar').post(upload.single("image"), addCar)


export default router;