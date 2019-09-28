const Product = require('../models/product.model');

exports.addProduct = async (req, res) => {
    if(!req.body) {
        throw new Error('Product data is not provided');
    }
    const product = new Product({
        productCode: req.body.productCode,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productId: req.body.productId
    });
    const data = await product.save();
    if (!data) {
        throw new Error('Some error occurred while creating the Note.');
    }
    return res.send(data);
};
