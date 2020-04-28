const mongoose = require('mongoose');
const Schema = mongoose.Schema;

TuitionFeeSchema = Schema({
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
    Term : String,
    TransId : String,
    ClearedOn : Date
});

module.exports = mongoose.model("TuitionFee", TuitionFeeSchema);