const mongoose = require('mongoose');
const Schema = mongoose.Schema;

VanHOASchema = Schema({
    HOA : String
});

module.exports = mongoose.model("VanHOA", VanHOASchema);