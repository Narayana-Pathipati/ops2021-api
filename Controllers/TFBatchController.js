const mongoose=require('mongoose');
const express= require('express');
const Router = express.Router();
const TFBatchModel = require('../Models/TFBatch');
const StudentModel = require('../Models/Student');
const ClassModel = require('../Models/Class');
/* const VFBatchModel = require('../Models/VFBatch'); */

Router.get('/', (req,res) => {
    TFBatchModel.find({}).exec().then(batches =>{
        res.json(batches);
        console.log(batches);
    });
})

Router.get('/TuitionFeeCash', (req,res) => {

    StudentModel.aggregate([

            {$unwind:"$TuitionFeePaid"},
            {$match:{IsActive : true, "TuitionFeePaid.PayMode":"Cash", "TuitionFeePaid.IsBatchCreated":false}},
            
            ]).exec().then(student => {
                ClassModel.populate(student, {path : 'ClassId'}).then(data =>{
                    res.json(data);
                    //console.log(data);
                })
                
            })
});

Router.post('/', (req, res) => {
    
    let batchDetails = [];
    for(var i=0; i < req.body.length ; i++)
    {
        batchDetails.push({Date : req.body[i].Date, StudId : req.body[i].StudId, Amount : req.body[i].Amount,tfid : req.body[i].tfid})
    };
    //console.log(batchDetails);

    let TFBatchObj = new TFBatchModel({
        //_id : mongoose.Types.ObjectId(),
        Total : req.body[0].Total,
        BatchDetails : batchDetails

    /* req.body.forEach(batch => {
        let TFBatchObj = new TFBatchModel({
            //_id : mongoose.Types.ObjectId(),
            Total : batch.Total,
            BatchDetails : {
                Date : batch.Date,
                StudId : batch.StudId,
                Amount : batch.Amount
            }
        }) */
    });

        TFBatchObj.save().then(obj => {
            batchDetails.forEach(batch => {
                StudentModel.findOneAndUpdate({'TuitionFeePaid._id' : batch.tfid}, {'TuitionFeePaid.$.IsBatchCreated' : true}).then(student =>{
                });
            });
        
            /* StudentModel.findById(batch.StudId).then(student => {
                if(student)
                {
                    student.TuitionFeePaid.forEach(tf => {                    
                        if(tf._id == batch.tfid)
                        {
                            tf.IsBatchCreated = true;
                            return student.save();
                        }
                    });   
                }
            }) */

            res.json(obj)
            
        }).catch(err => {
            console.log(err);
        });
   
});

Router.get('/:id', (req, res) => {

    TFBatchModel.aggregate([
        {$unwind : '$BatchDetails'},
        {$match : {_id : parseInt(req.params.id)}}
    ]).then(batch => {
       StudentModel.populate(batch, {path : "BatchDetails.StudId"}).then(result => {
           ClassModel.populate(result, {path : "BatchDetails.StudId.ClassId"}).then(data =>{
               res.json(data);
               console.log(data);
           })
           //console.log(result);
           //res.json(result);
       })
    });
   /*  TFBatchModel.findOne({_id : req.params.id}).then(batch => {
        StudentModel.populate(batch, {path : 'StudId'}).then(result => {
            console.log(result);
            res.json(result);
        })
    }) */
  
});

Router.put('/:id', (req, res) =>{

    const TFBatchObj = {
        _id : mongoose.Types.ObjectId(),
        total : req.body.total,
        BatchDetails : req.body.BatchDetails,
    };

    TFBatchModel.findOneAndUpdate(req.params.id, {$set : TFBatchObj },{new : true}).then(batch => {
        res.json(batch)
    }).catch(error =>{
        res.json({msg : error});
    })
});


module.exports = Router;