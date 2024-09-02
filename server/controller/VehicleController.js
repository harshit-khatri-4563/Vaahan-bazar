import Vehicle from '../models/Vehicle.js';
import uploadToCloud from '../utils/cloudUploadService.js';
import { errorHandler, successHandler } from '../utils/responseHandler.js';

class VehicleController {
  // Create a new vehicle
  static createVehicle = async (req, res) => {
    try {
     
      const imageUrls = [];
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const imageUrl = await uploadToCloud(file.path);
       
        imageUrls.push(imageUrl);
      }
   

      // Add the image URLs to the vehicle data
      req.body.photos = imageUrls;
    
      // const imageUrl = await uploadToCloud(req.file.path);
      // // Add the image URL to the vehicle data
      // req.body.photos = [imageUrl];

      const vehicle = new Vehicle(req.body);
      const savedVehicle = await vehicle.save();
      successHandler(res, savedVehicle, 'Vehicle created successfully');
    
    } catch (error) {
      errorHandler(res, error.message);
    }
  }

  // Get all vehicles
  static getAllVehicles = async (req, res) => {
    try {
      const vehicles = await Vehicle.find();
      successHandler(res, vehicles, 'Vehicles retrieved successfully');
    } catch (error) {
      errorHandler(res, error.message);
    }
  }

  // Get a vehicle by ID
  static getVehicleById = async (req, res) => {
    try {
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) {
        errorHandler(res, 'Vehicle not found');
      } else {
        successHandler(res, vehicle, 'Vehicle retrieved successfully');
      }
    } catch (error) {
      errorHandler(res, error.message);
    }
  }

  // Update a vehicle by ID
  static updateVehicle = async (req, res) => {
    try {
      // Check if a new file is provided for update
      if (req.file) {
        // Upload the new file to the cloud and get the URL
        const imageUrl = await uploadToCloud(req.file.path);
        // Add the new image URL to the vehicle data
        req.body.photos = [imageUrl];
      }

      const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedVehicle) {
        errorHandler(res, 'Vehicle not found');
      } else {
        successHandler(res, updatedVehicle, 'Vehicle updated successfully');
      }
    } catch (error) {
      errorHandler(res, error.message);
    }
  }

  // Delete a vehicle by ID
  static deleteVehicle = async (req, res) => {
    try {
      const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);
      if (!deletedVehicle) {
        errorHandler(res, 'Vehicle not found');
      } else {
        successHandler(res, { message: 'Vehicle deleted successfully' });
      }
    } catch (error) {
      errorHandler(res, error.message);
    }
  }
}

export default VehicleController;
