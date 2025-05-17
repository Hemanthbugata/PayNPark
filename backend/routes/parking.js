const express = require('express');
const router = express.Router();
const ParkingSpot = require('../models/parkingSpot');

router.use(express.json());

// Create a new parking spot

router.post('/add', async (req, res) => {
  try {
    const { owner, location, pricePerHour, isAvailable, photos, description } = req.body;

    // Create a new parking spot
    const parkingSpot = new ParkingSpot({ owner, location, pricePerHour, isAvailable, photos, description });
    await parkingSpot.save();

    res.status(201).json({ message: 'Parking spot created successfully', parkingSpot });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all parking spots
router.get('/all', async (req, res) => {
  try {
    const parkingSpots = await ParkingSpot.find().populate('owner', 'name email');
    res.status(200).json(parkingSpots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get parking spots by location
router.get('/by-location', async (req, res) => {
  try {
    const { location } = req.query;
    if (!location) {
      return res.status(400).json({ message: 'Location is required' });
    }
    // Find spots where location matches (case-insensitive)
    const parkingSpots = await ParkingSpot.find({
      'location.address': { $regex: new RegExp(location, 'i') }
    }).populate('owner', 'name email');
    res.status(200).json(parkingSpots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a parking spot
router.put('/update', async (req, res) => {
  try {
    const { id } = req.params;
    const { location, pricePerHour, isAvailable, photos, description } = req.body;

    const updatedParkingSpot = await ParkingSpot.findByIdAndUpdate(id, { location, pricePerHour, isAvailable, photos, description }, { new: true });
    if (!updatedParkingSpot) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }

    res.status(200).json({ message: 'Parking spot updated successfully', updatedParkingSpot });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a parking spot

router.delete('/delete', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedParkingSpot = await ParkingSpot.findByIdAndDelete(id);
    if (!deletedParkingSpot) {
      return res.status(404).json({ message: 'Parking spot not found' });
    }

    res.status(200).json({ message: 'Parking spot deleted successfully', deletedParkingSpot });
    } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;