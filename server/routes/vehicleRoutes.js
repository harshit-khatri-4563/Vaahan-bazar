import express from 'express';
import VehicleController from '../controller/VehicleController.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.post('/createVehicle',upload.array('photos', 10), VehicleController.createVehicle);
router.get('/getAllVehicles', VehicleController.getAllVehicles);
router.get('/getVehicle/:id', VehicleController.getVehicleById);
router.put('/updateVehicle/:id', upload.single('photos'), VehicleController.updateVehicle);
router.delete('/deleteVehicle/:id', VehicleController.deleteVehicle);

export default router;
