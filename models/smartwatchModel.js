const mongoose = require('mongoose');

const smartwatchSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    data: { type: Object, required: true }, // Puede contener información estructurada de sueño, actividad, etc.
    lastSync: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Smartwatch', smartwatchSchema);