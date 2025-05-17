const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SpaceOwner = require('../models/SpaceOwner');

// Signup For Space Owner and Approval Request to admin
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
    
        // Check for existing space owner
        const existingSpaceOwner = await SpaceOwner.findOne({ email });
        if (existingSpaceOwner) {
            return res.status(400).json({ message: 'Space owner already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new space owner (fix: use password field)
        const spaceOwner = new SpaceOwner({ name, email, password: hashedPassword, phone, role: 'spaceowner' });
        await spaceOwner.save();
        res.status(201).json({ message: 'Space owner registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login for Space Owner with Admin Approval

// ...existing code...
// Login for Space Owner with Admin Approval

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find space owner by email
        const spaceOwner = await SpaceOwner.findOne({ email });
        if (!spaceOwner) {
            return res.status(404).json({ message: 'Space owner not found' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, spaceOwner.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: spaceOwner._id, role: spaceOwner.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Remove password before sending owner object
        const { password: pw, ...ownerWithoutPassword } = spaceOwner.toObject();

        res.status(200).json({ token, owner: ownerWithoutPassword, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;