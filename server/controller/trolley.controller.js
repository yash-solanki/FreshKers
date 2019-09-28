const Trolley = require('../models/trolly.model');
const Store = require('../models/storeStock.model');
const Rack = require('../models/rack.model');
const Product = require('../models/product.model');

exports.addTrolley = async (req, res) => {
  const trolley = new Trolley({
      trollyId: req.body.trollyId,
      trollyContainer: []
  });
  const data = await trolley.save();
  if (!data) {
      throw new Error('something went wrong while insert trolley');
  }
  return res.send(data);
};

exports.addEditItemToTrolley = async (req, res) => {
    if (!req.params.productId) {
        throw new Error('itemId is missing');
    }
    if (!req.params.trolleyId) {
        throw new Error('item name is missing');
    }
    // check for array
    const existData = await Trolley.find({trollyId: req.params.trolleyId}).lean();
    if (existData[0].isCheckout) {
        return res.send('you already checkout');
    }
    const product = await Product.find({productId: req.params.productId}).lean();
    const RackData = await Rack.find({rackContainer: product[0].productName}).lean();
    if (!existData[0].trollyContainer.length) {
        const removedProductIds = RackData[0].rackProductIds.filter(productId => productId !== req.params.productId);
        existData[0].trollyContainer.push({
            productIds: req.params.productId,
            productName: product[0].productName,
            productQty: 1,
            productPrice: product[0].productPrice
        });
        await Rack.updateOne({rackContainer: product[0].productName}, {rackProductIds: removedProductIds, rackCurrentQty: removedProductIds.length});
    } else {
        const productNames = existData[0].trollyContainer.map(product => product.productName);
        // let productIds = existData[0].trollyContainer.map(product => product.productIds.map(pId => pId)).flat();
        const removeProductIds = [];
        if (productNames.includes(product[0].productName)) {
            for (let i = 0, l = existData[0].trollyContainer.length; i < l; i++) {
                // const compId = existData[0].trollyContainer[i].productIds.indexOf(product[0].productId);
                if (existData[0].trollyContainer[i].productName === product[0].productName) {
                    if (existData[0].trollyContainer[i].productIds.includes(product[0].productId)) {
                        existData[0].trollyContainer[i].productQty > 1 ? existData[0].trollyContainer[i].productQty-- : removeProductIds.push(existData[0].trollyContainer[i]._id);
                    /*    // const addRackIds = RackData.rackProductIds.filter(productId => productId !== req.params.productId);
                        console.log("RackData[0]====>",RackData[0].rackProductIds, req.params.productId);
                        const addRackIds = RackData[0].rackProductIds.push(req.params.productId);
                        console.log("RackData[0]====>",RackData[0].rackProductIds, req.params.productId, addRackIds);*/
                        await Rack.update({rackContainer: product[0].productName}, { $push: {rackProductIds: req.params.productId}, $inc: {rackCurrentQty: 1}});
                    } else {
                        // const removedProductIds = RackData.rackProductIds.push(req.params.productId);
                        const removedProductIds = RackData[0].rackProductIds.filter(productId => productId !== req.params.productId);
                        existData[0].trollyContainer[i].productQty++;
                        existData[0].trollyContainer[i].productIds.push(product[0].productId);
                        await Rack.updateOne({rackContainer: product[0].productName}, {rackProductIds: removedProductIds, rackCurrentQty: removedProductIds.length});
                    }
                }
            }
        } else {
            const removedProductIds = RackData[0].rackProductIds.filter(productId => productId !== req.params.productId);
            existData[0].trollyContainer.push({
                productIds: req.params.productId,
                productName: product[0].productName,
                productQty: 1,
                productPrice: product[0].productPrice
            });
            await Rack.updateOne({rackContainer: product[0].productName}, {rackProductIds: removedProductIds, rackCurrentQty: removedProductIds.length});
        }
        if (removeProductIds.length) {
            existData[0].trollyContainer = existData[0].trollyContainer.filter((trolly) => !removeProductIds.includes(trolly._id));
        }
    }
    const data = await Trolley.updateOne({trollyId: req.params.trolleyId}, {trollyContainer: existData[0].trollyContainer});
    if (!data) {
        throw new Error('something went wrong while adding/removing item');
    }
    return res.send({
        status: 'success',
        data: 'item added successfully'
    });
};

exports.calculateBill = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  if (!req.params.trolleyId) {
      throw new Error('trolleyId is missing');
  }
  const data = await Trolley.find({trollyId: req.params.trolleyId}).lean();
  if (!data) {
      throw new Error('something went wrong while finding trolley data');
  }
  return res.send(data);
};

// exports.calculateBill = async (req, res) => {
exports.trolleyItemDetails = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    if (!req.params.trolleyId) {
        throw new Error('trolleyId is missing');
    }
    const data = await Trolley.find({trollyId: req.params.trolleyId}).lean();
    if (!data) {
        throw new Error('something went wrong while finding trolley data');
    }
    let totalAmount = 0;
    console.log("data[0]====>",data[0].trollyContainer);
    if (data[0].trollyContainer && data[0].trollyContainer.length > 0) {
        for (let i = 0; i < data[0].trollyContainer.length; i++) {
            totalAmount += data[0].trollyContainer[i].productPrice * data[0].trollyContainer[i].productQty;
        }
    }
    data[0]['billAmount'] = totalAmount;
    // return res.send({
    //     status: 'success',
    //     data: data
    // });
    return res.send(data);
};

exports.checkoutTrolley = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  if (!req.params.trolleyId) {
      throw new Error('trolley id is missing');
  }
  const data = await Trolley.updateOne({trollyId: req.params.trolleyId}, {isCheckout: true}).lean();
  if (!data) {
      throw new Error('something went wrong while checkout Trolley');
  }
  return res.send({
      status: 'success',
      data: 'trolley checkout successfully'
  });
};

exports.resetTrolley = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    if (!req.params.trolleyId) {
        return res.send('trolley id is missing');
    }
    const data = await Trolley.updateOne({trollyId: req.params.trolleyId}, {trollyContainer: [], isCheckout: false});
    if (!data) {
        throw new Error('something went wrong while updating trolley');
    }
    return res.send(data);
};
