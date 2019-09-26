const Store = require('../models/storeStock.model');
const Rack = require('../models/rack.model');

exports.addItem = async (req, res) => {
    if(!req.body) {
        throw new Error('Product data is not provided');
    }
    const product = new Store({
        productId: req.body.productId,
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productStoreQty: req.body.productQty
    });
    const data = await product.save();
    if (!data) {
        throw new Error('Some error occurred while creating the Note.');
    }
    return res.send(data);
};

exports.fillRack = async (req, res) => {
  if (!req.body.productId) {
      throw new Error('please provide productId');
  }
  if (!req.body.rackId) {
      throw new Error('please provide rackId');
  }

};
