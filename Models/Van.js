const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;


ExpenseSchema=Schema({
    HOA : {
        type : String, ref : 'VanHOA'
    },
    Particulars : String,
    Amount : Number,
    PayMode : String,
    Date : {
        type : Date,
        default : Date.now
    }
});

VanSchema = Schema({
    VanNo : Number,
    Route : String,
    DriverName : String,
    DriverNo : String,
    CleanerName : String,
    CleanerNo : String,
    Expense : [ExpenseSchema]
});


VanSchema.plugin(autoIncrement.plugin, { model: 'Van', startAt: 1, unique:false, incrementBy: 1 });
module.exports = mongoose.model("Van", VanSchema);
