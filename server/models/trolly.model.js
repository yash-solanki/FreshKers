const mongoose = require('mongoose');

const TrollySchema = mongoose.Schema({
    trollyId: String,
    trollyContainer: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Trolly', TrollySchema);