import User from "../models/User.js";
import { errorHandler, successHandler } from "../utils/responseHandler.js";

class UserController {
  static createUser = async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      successHandler(res, newUser, "User info has been stored to our database.", 201);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      successHandler(res, users, "All users retrieved.", 200);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static getUserById = async (req, res) => {
    try {
      const user = await User.findOne({ clerkId: req.params.clerkId });
      if (!user) {
        successHandler(res, null, "User not found!");
      } else {
        successHandler(res, user, "User retrieved successfully!", 200);
      }
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static updateUser = async (req, res) => {
    try {
      const { clerkId } = req.body;
      const user = await User.findOne({ clerkId });
      if (!user) {
        return errorHandler(res, "User not found");
      }
      const updatedUser = await User.findByIdAndUpdate(user._id, req.body, { new: true });
      if (!updatedUser) {
        return errorHandler(res, "User not found");
      }
      successHandler(res, updatedUser, "User updated successfully!");
    } catch (err) {
      errorHandler(res, err.message);
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const { clerkId } = req.body;
      const user = await User.findOne({ clerkId });
      if (!user) {
        return errorHandler(res, "User not found");
      }
      const deletedUser = await User.findByIdAndDelete(user._id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Update Wishlist
  static updateWishlist = async (req, res) => {
    try {
      const { clerkId, wishlist } = req.body;
      const user = await User.findOne({ clerkId });
      if (!user) {
        return errorHandler(res, "User not found");
      }
      user.wishlist = wishlist;
      await user.save();
      successHandler(res, user, "Wishlist updated successfully!");
    } catch (err) {
      errorHandler(res, err.message);
    }
  };

  // Add to Wishlist
  static addToWishlist = async (req, res) => {
    try {
      const { clerkId, vehicleId } = req.body;
      const user = await User.findOne({ clerkId });
      if (!user) {
        return errorHandler(res, "User not found");
      }
      user.wishlist.push(vehicleId);
      await user.save();
      successHandler(res, user, "Vehicle added to wishlist successfully!");
    } catch (err) {
      errorHandler(res, err.message);
    }
  };

  // Remove from Wishlist
  static removeFromWishlist = async (req, res) => {
    try {
      const { clerkId, vehicleId } = req.body;
      const user = await User.findOne({ clerkId });
      if (!user) {
        return errorHandler(res, "User not found");
      }
      user.wishlist = user.wishlist.filter(id => id.toString() !== vehicleId);
      await user.save();
      successHandler(res, user, "Vehicle removed from wishlist successfully!");
    } catch (err) {
      errorHandler(res, err.message);
    }
  };

  // Update Sold Cars
  static updateSoldCars = async (req, res) => {
    try {
      const { clerkId, soldCars } = req.body;
      const user = await User.findOne({ clerkId });
      if (!user) {
        return errorHandler(res, "User not found");
      }
      user.soldCars = soldCars;
      await user.save();
      successHandler(res, user, "Sold cars updated successfully!");
    } catch (err) {
      errorHandler(res, err.message);
    }
  };

  // Update Cars for Sale
  static updateCarsForSale = async (req, res) => {
    try {
      const { clerkId, carsForSale } = req.body;
      const user = await User.findOne({ clerkId });
      if (!user) {
        return errorHandler(res, "User not found");
      }
      user.carsForSale = carsForSale;
      await user.save();
      successHandler(res, user, "Cars for sale updated successfully!");
    } catch (err) {
      errorHandler(res, err.message);
    }
  };

  // Add a car to Cars for Sale
  static addCarForSale = async (req, res) => {
    try {
      const { clerkId, carId } = req.body;
      const user = await User.findOne({ clerkId });
      if (!user) {
        return errorHandler(res, "User not found");
      }
      user.carsForSale.push(carId);
      await user.save();
      successHandler(res, user, "Car added for sale successfully!");
    } catch (err) {
      errorHandler(res, err.message);
    }
  };

  // Remove a car from Cars for Sale
  static removeCarForSale = async (req, res) => {
    try {
      const { clerkId, carId } = req.body;
      const user = await User.findOne({ clerkId });
      if (!user) {
        return errorHandler(res, "User not found");
      }
      user.carsForSale = user.carsForSale.filter(id => id.toString() !== carId);
      await user.save();
      successHandler(res, user, "Car removed from sale successfully!");
    } catch (err) {
      errorHandler(res, err.message);
    }
  };
}

export default UserController;
