const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const VFBatchSchema = Schema({
    _id : Schema.Types.ObjectId,
    Date : {
        type : Date,
        default : Date.now
    },
    Total : Number,
    BatchDetails : [{
        Date : Date,
        StudId : String,
        PaidFor : String,
        Amount : Number
    }]
});

VFBatchSchema.plugin(autoIncrement.plugin, { model: 'VFBatch', startAt: 1, incrementBy: 1 });
module.exports = new mongoose.model('VFBatch', VFBatchSchema);