const Customer = require('../models/customer.model');

exports.addCustomer = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    const customer = new Customer({
        customerName: req.body.customerName,
        customerContactNo: req.body.customerContact,
        BillIssuerName: req.body.billIssuer,
        customerPurchaseDetail: [{
            trollyId: req.params.trollyId,
            trollyBucket: req.body.trollyContainer
        }]
    });
    const data = await customer.save();
    if (!data) {
        throw new Error('something went wrong while insert trolley');
    }
    return res.send(data);
};
