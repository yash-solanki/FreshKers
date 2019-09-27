const mongoose = require('mongoose');

const trolleyContainSchema = mongoose.Schema({
    // trolly detail
    trollyId: String,
    trollyBucket: Array
});

const CustomerSchema = mongoose.Schema({
    customerId: String,
    customerName: String,
    customerContactNo: Number,
    customerPurchaseDetail: [trolleyContainSchema],
    customerBillAmount: Number,
    BillIssuerName: String,
    isActive: {type: Boolean, default: true}
}, {
    timestamps: true,
    collectionName: 'customer'
});

module.exports = mongoose.model('Customer', CustomerSchema);
