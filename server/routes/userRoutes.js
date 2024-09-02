import express from 'express';
import UserController from '../controller/UserController.js';

const router = express.Router();

router.post("/createUser", UserController.createUser);
router.get("/getAllUsers", UserController.getAllUsers);
router.get("/getUser/:clerkId", UserController.getUserById);
router.post("/updateUser", UserController.updateUser);
router.post("/deleteUser", UserController.deleteUser);

// Additional routes for updating metadata
router.post("/updateWishlist", UserController.updateWishlist);
router.post("/addToWishlist", UserController.addToWishlist);
router.post("/removeFromWishlist", UserController.removeFromWishlist);
router.post("/updateSoldCars", UserController.updateSoldCars);
router.post("/updateCarsForSale", UserController.updateCarsForSale);
router.post("/addCarForSale", UserController.addCarForSale);
router.post("/removeCarForSale", UserController.removeCarForSale);

export default router;
