const mongoose = require('mongoose');
const Schema = mongoose.Schema;

VanFeeSchema = Schema({
    _id : Schema.Types.ObjectId,
    StudId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    Amount : Number,
    PayMode : String,
    Date : Date.now,
    ChequeNo : String,
    ChequeDate : Date,
    Remarks : String,
    Month : [String],
    TransId : String,
    ClearedOn : Date
});

module.exports = mongoose.model("VanFee", VanFeeSchema);