const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    address: { type: String, required: true },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  pricePerHour: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  photos: { type: [String] }, // URLs of parking spot images
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ParkingSpot', parkingSpotSchema);