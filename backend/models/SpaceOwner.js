const mongoose = require('mongoose');

const spaceOwnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Encrypted
    phone: { type: String },
    role: { type: String, enum: ['user', 'spaceowner', 'admin'], required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },

    });

const SpaceOwner = mongoose.model('SpaceOwner', spaceOwnerSchema);
module.exports = SpaceOwner;