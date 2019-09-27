const Rack = require('../models/rack.model');

exports.getAvailQty = async (req, res) => {
    if (!req.params.rackId) {
        throw new Error('please provide rackId');
    }
    if (!req.params.rackContainer) {
        throw new Error('please provide productId');
    }
    const Racks = new Rack({
        rackId: 'racsfasdf2',
        rackContainer: 'prods002',
        rackCapacity: 10,
        rackCurrentQty: 9
    });
    // const data = await Rack.find().lean();
    const data = await Racks.save();
    if (!data) {
        throw new Error('something went wrong while finding avilable Qty');
    }
    return res.send(data);
//     const availableProduct = await Rack.find({rackId: req.params.rackId, rackContainer: req.params.rackContainer}).lean();
//     if (!availableProduct) {
//         throw new Error('something went wrong while finding avilable Qty');
//     }
//     return res.send(availableProduct);
};
