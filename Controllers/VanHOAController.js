const mongoose = require('mongoose');
const VanHOASchema = require('../Models/VanHOA');

const express = require('express')
const Router = express.Router();

Router.get('/', async (req, res) => {

    await VanHOASchema.find({}).exec().then(result => {
        res.json(result);
        //console.log(result);
    });

});

Router.get('/:id', async (req, res) => {

    await VanHOASchema.findOne({ _id: req.params.id }).then(result => {
        res.json(result);
        //console.log(result);
    });

});

Router.post('/', async (req, res) => {

    vanHOAObj = VanHOASchema({
        HOA: req.body.HOA
    });

    await vanHOAObj.save().then(result => {
        res.status(200).json(result);
    }).catch(err => {
        res.json({ msg: err });
    });

});


Router.put('/:id', async (req, res) => {

    vanHOAObj = {
        HOA : req.body.HOA
    }

    await VanHOASchema.findByIdAndUpdate(req.params.id, {$set : vanHOAObj},{'new' : true}, (error, doc) =>{
        res.json(doc);
    });

});

Router.delete('/:id', async (req, res) =>{
    await VanHOASchema.findByIdAndDelete(req.params.id).then((result)=>{
        res.json(result);
    })
})


module.exports = Router;