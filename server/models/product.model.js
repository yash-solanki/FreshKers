const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productCode: String,
    productName: String,
    productPrice: Number,
    productId: String,
    isActive: {type: Boolean, default: true}
}, {
    timestamps: true,
    collectionName: 'product'
});

module.exports = mongoose.model('Product', ProductSchema);
