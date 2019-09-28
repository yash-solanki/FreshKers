const Rack = require('../models/rack.model');
const StoreStock = require('../models/storeStock.model');
const uuidv4 = require('uuid/v4')

exports.getAvailQtyOfRack = async (req, res) => {
    if (!req.params.rackId) {
        throw new Error('please provide rackId');
    }
    if (!req.params.rackContainer) {
        throw new Error('please provide productId');
    }
    // const Racks = new Rack({
    //     rackId: 'racsfasdf2',
    //     rackContainer: 'prods002',
    //     rackCapacity: 10,
    //     rackCurrentQty: 9
    // });
    // // const data = await Rack.find().lean();
    // const data = await Racks.save();
    // if (!data) {
    //     throw new Error('something went wrong while finding avilable Qty');
    // }
    // return res.send(data);
    const availableProduct = await Rack.find({rackId: req.params.rackId, rackContainer: req.params.rackContainer}).lean();
    if (!availableProduct) {
        throw new Error('something went wrong while finding avilable Qty');
    }
    return res.send(availableProduct);
};

exports.getAvailQtyOfAllRacks = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    const availableProduct = await Rack.find({isActive: true}).lean();
    if (!availableProduct) {
        throw new Error('something went wrong while finding avilable Qty');
    }
    return res.send(availableProduct);
};

exports.addDataRack = async (req,res) => {
  const rack = new Rack({
      rackId: req.body.rackId,
      rackContainer: req.body.rackContainer,
      rackProductIds: req.body.pId,
      rackCapacity: 7,
      rackCurrentQty: 7
  });
  const data = await rack.save();
  return res.send(data);
};

exports.fillTheRack = async (req, res) => {
    if (!req.params.rackId) {
        throw new Error('rackId is missing');
    }
    if (!req.params.rackContainer) {
        throw new Error('rackContainer is missing');
    }
    const rackDetail = await Rack.find({rackId: req.params.rackId, rackContainer: req.params.rackContainer}).lean();
    const reqQtyToFill = rackDetail[0].rackCapacity - rackDetail[0].rackCurrentQty;
    const storeStock = await StoreStock.find({productName: req.params.rackContainer}).lean();
    const data = await StoreStock.update({productName: req.params.rackContainer}, {productStoreQty: storeStock[0].productStoreQty - reqQtyToFill});
    if (!data) {
        throw new Error('something went wrong while refill Rack Qty');
    }
    for (let i = 0; i < reqQtyToFill; i++) {
        rackDetail[0].rackProductIds.push(uuidv4());
    }
    await Rack.update({rackId: req.params.rackId, rackContainer: req.params.rackContainer}, {rackCurrentQty: 7, rackProductIds: rackDetail[0].rackProductIds});
    return res.send({
        status: 'success',
        data: 'rack filled successfully'
    });
};
