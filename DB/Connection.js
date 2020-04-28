const mongoose = require('mongoose');
autoIncrement = require('mongoose-auto-increment');
//'mongodb+srv://oxford_123:oxford_123@oxford-xxnir.mongodb.net/OPS2021?retryWrites=true&w=majority'
//mongodb+srv://oxford_123:oxford_123@cluster-gcp-ge47a.gcp.mongodb.net/OPS2021?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://oxford_123:oxford_123@oxford-xxnir.mongodb.net/OPS2021?retryWrites=true&w=majority', 
{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }, () => {
    console.log('MongoDB Server Connected Successfully..');
});

var connection = mongoose.createConnection('mongodb+srv://oxford_123:oxford_123@oxford-xxnir.mongodb.net/OPS2021?retryWrites=true&w=majority', 
{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}, () => {
    //console.log('MongoDB Server Connected Successfully..');
});

autoIncrement.initialize(connection);