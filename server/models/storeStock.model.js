const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
    productId: String,
    productName: String,
    productPrice: Number,
    productStoreQty: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('StoreStock', StoreSchema);
