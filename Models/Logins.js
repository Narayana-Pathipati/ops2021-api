const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginsSchema = new Schema({
    _id : Schema.Types.ObjectId,
    Name : String,
    username : String,
    password : String,
    usertype : String,
    ClassSubjects : [{
         ClassId : {
             type : String,
             default : ''
         },
         Subjects : [{
             Subject : {
                 type : String,
                 default : '',
             },
             IsSelected : {
                 type : Boolean,
                 default : false
             }
         }]
    }]
});

module.exports = mongoose.model('Logins', LoginsSchema);