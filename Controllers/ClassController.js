const express = require('express');
const mongoose = require('mongoose');
const ClassModel = require('../Models/Class');
const Router = express.Router();

Router.get('/', async (req, res, next ) => {
    
  await ClassModel.find().exec().then((classes) => {
        res.json(classes);
    });
});

Router.get('/:id', (req, res) => {
    ClassModel.findOne({_id : req.params.id}).then(class1 => {
        res.json(class1);
    });
});

Router.post('/', async (req,res) => {
    ClassObj =  ClassModel({
        _id : mongoose.Types.ObjectId(),
        ClassName : req.body.ClassName,
        Section : req.body.Section,
        TermFee : req.body.TermFee,
        AccessoriesFee : req.body.AccessoriesFee,
        Uniform : req.body.Uniform,
        Shoe : req.body.Shoe,
        Socks : req.body.Socks,
        Subjects : req.body.Subjects
    });
    console.log(ClassObj);
   await ClassObj.save().then(class1 => {
        res.status(200).json(class1);
    }).catch(err => {
        res.json({msg : err});
    });
   
});


Router.put('/:id', async (req, res) => {

    ClassObj = {
        ClassName : req.body.ClassName,
        Section : req.body.Section,
        TermFee : req.body.TermFee,
        ClassSection : req.body.ClassName+"-"+req.body.Section,
        AccessoriesFee : req.body.AccessoriesFee,
        Uniform : req.body.Uniform,
        Shoe : req.body.Shoe,
        Socks : req.body.Socks,
        Subjects : req.body.Subjects
    };

    await ClassModel.findByIdAndUpdate(req.params.id , {$set : ClassObj}, {'new' : true}, (error, doc) =>{
        res.json(doc);
    });
});

Router.delete('/:id', (req, res) => {
    ClassModel.findByIdAndDelete(req.params.id).then(class1 => {
        res.json(class1);
    });
})

module.exports = Router;