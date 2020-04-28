const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const TFBatchSchema = Schema({
    _id : Schema.Types.ObjectId,
    Date : {
        type : Date,
        default : Date.now
    },
    Total : Number,
    BatchDetails : [{
        Date : Date,
        StudId : String,
        Amount : Number
    }]
});

TFBatchSchema.plugin(autoIncrement.plugin, { model: 'TFBatch', startAt: 1, incrementBy: 1 });
module.exports = new mongoose.model('TFBatch', TFBatchSchema);