module.exports = (app) => {
    const store = require('../controller/store.controller');
    const rack = require('../controller/rack.controller');
    const trolley = require('../controller/trolley.controller');
    const product = require('../controller/product.controller');
    const customer = require('../controller/customer.controller');

    //Product
    // add product to Products
    app.post('/product/addProduct', product.addProduct);

    //Store
    // add item to store
    app.post('/store/addItemToStore', store.addItemToStore);

    // Rack
    // get Available Qty from rack
    app.get('/rack/getAvailQty/:rackId/:rackContainer', rack.getAvailQtyOfRack);
    // get Available Qty from rack
    app.get('/rack/getAvailQty', rack.getAvailQtyOfAllRacks);
    // fill rack
    app.get('/rack/fillTheRack/:rackId/:rackContainer', rack.fillTheRack);
    app.post('/rack/addDataRack', rack.addDataRack);

    // Trolley
    //Add Remove Product From Trolly
    app.post('/trolley/addTrolley', trolley.addTrolley);
    app.get('/trolley/addEditItemToTrolley/:productId/:trolleyId', trolley.addEditItemToTrolley);
    app.get('/trolley/productDetail/:trolleyId', trolley.trolleyItemDetails);
    app.get('/trolley/calculateBill/:trolleyId', trolley.calculateBill);
    app.get('/trolley/checkoutTrolley/:trolleyId', trolley.checkoutTrolley);
    app.get('/trolley/resetTrolley/:trolleyId', trolley.resetTrolley);

    // Customer
    // Add customerDetails
    app.post('/customer/addCustomer', customer.addCustomer);

    app.get('/', () => {
        console.log('hello');
    })

};
