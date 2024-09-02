import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  
  make: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    min: 1886
  },
  mileage: {
    type: Number,
    required: true,
    min: 0
  },
  transmissionType: {
    type: String,
    enum: ['automatic', 'manual', 'semi-automatic'],
    required: true
  },
  fuelType: {
    type: String,
    enum: ['petrol', 'diesel', 'electric', 'hybrid'],
    required: true
  },
  mileage: {
    type: Number
  },
  category: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  color: {
    type: String,
    trim: true
  },
  photos: [
    {
      type: String, 
      required: true 
    }
  ],
  seller: {
    type: String,
    required: true
  },
  description:{
    type:String
  },
  condition: {
    type: String,
    enum: ['new', 'used'],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

vehicleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
