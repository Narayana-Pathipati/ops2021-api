const mongoose=require('mongoose');
const express= require('express');
const Router = express.Router();
/* const TFBatchModel = require('../Models/TFBatch'); */
const StudentModel = require('../Models/Student');
const ClassModel = require('../Models/Class');
const VFBatchModel = require('../Models/VFBatch');

Router.get('/', (req,res) => {
    VFBatchModel.find({}).exec().then(batches =>{
        res.json(batches);
        console.log(batches);
    });
})

Router.get('/VanFeeCash', (req,res) => {

    StudentModel.aggregate([
            {$unwind:"$VanFeePaid"},
            {$match:{IsActive : true, "VanFeePaid.PayMode":"Cash", "VanFeePaid.IsBatchCreated":false}},
            ]).exec().then(student => {
                ClassModel.populate(student, {path : 'ClassId'}).then(data =>{
                    res.json(data);
                })
                
            })
});

Router.post('/', (req, res) => {

    let batchDetails = [];
    for(var i=0; i < req.body.length ; i++)
    {
        batchDetails.push({Date : req.body[i].Date, StudId : req.body[i].StudId, Amount : req.body[i].Amount, vfid : req.body[i].vfid, PaidFor : req.body[i].PaidFor})
    };

    let VFBatchObj = new VFBatchModel({
        //_id : mongoose.Types.ObjectId(),
        Total : req.body[0].Total,
        BatchDetails : batchDetails
    });
        console.log('post request called.');

        VFBatchObj.save().then(obj => {
            batchDetails.forEach(batch => {
                StudentModel.findOneAndUpdate({'VanFeePaid._id' : batch.vfid}, {'VanFeePaid.$.IsBatchCreated' : true}).then(student =>{
                });
            });
            res.json(obj)
        }).catch(err => {
            console.log(err);
        });
});

Router.get('/:id', (req, res) => {

    VFBatchModel.aggregate([
        {$unwind : '$BatchDetails'},
        {$match : {_id : parseInt(req.params.id)}}
    ]).then(batch => {
       StudentModel.populate(batch, {path : "BatchDetails.StudId"}).then(result => {
           ClassModel.populate(result, {path : "BatchDetails.StudId.ClassId"}).then(data =>{
               res.json(data);
               console.log(data);
           })
       })
    });
  
});

Router.put('/:id', (req, res) =>{

    const VFBatchObj = {
        _id : mongoose.Types.ObjectId(),
        total : req.body.total,
        BatchDetails : req.body.BatchDetails,
    };

    VFBatchModel.findOneAndUpdate(req.params.id, {$set : VFBatchObj },{new : true}).then(batch => {
        res.json(batch)
    }).catch(error =>{
        res.json({msg : error});
    })
});


module.exports = Router;