const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
    productId: String,
    productName: String,
    productPrice: Number,
    productStoreQty: Number,
    isActive: {type: Boolean, default: true}
}, {
    timestamps: true,
    collectionName: 'storeStock'
});

module.exports = mongoose.model('StoreStock', StoreSchema);
