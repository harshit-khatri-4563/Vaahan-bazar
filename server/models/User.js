import mongoose from "mongoose"
const Schema = mongoose.Schema;

const userSchema = new Schema({
  photo:{
    type:String
  },
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phoneNo: {
    type: String,
    trim: true
  },
  address: {
    street: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    zip: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    }
  },
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  soldCars: [{
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  carsForSale: [{
    type: Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
