module.exports = {
    // url: 'mongodb://localhost:27017/easy-notes'
    url: "mongodb+srv://yash-solanki:yash@solanki@freshkers-mpnaz.mongodb.net/FreshKers?retryWrites=true&w=majority"
};


// connect with mongo atlas
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://yash-solanki:yash@solanki@freshkers-mpnaz.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});

