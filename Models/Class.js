const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

ClassSchema = Schema({
    _id : Schema.Types.ObjectId,
    ClassName : String,
    Section : String,
    ClassSection : {
        type : String,
        default : function(){
            return this.ClassName+'-'+this.Section
        }
    },
    Subjects : [String],
    TermFee : Number,
    AccessoriesFee : Number,
    Shoe : Number,
    Socks : Number,
    Uniform : Number
});

ClassSchema.plugin(autoIncrement.plugin, { model: 'Class', field: 'id',unique : false, startAt: 1, incrementBy: 1 });
module.exports = mongoose.model("Class", ClassSchema);