const express = require('express');
const mongoose = require('mongoose');
const VanModel = require('../Models/Van');
const VanHOAModel = require('../Models/VanHOA');
const Router = express.Router();

Router.get('/', async (req, res, next) => {

    await VanModel.find().exec().then((van) => {
        res.json(van);
    });
});

Router.get('/:id', (req, res) => {
    VanModel.findOne({ _id: req.params.id }).then(van => {
        res.json(van);
    });
});

Router.post('/', async (req, res) => {

    VanObj = VanModel({
        VanNo: req.body.VanNo,
        Route: req.body.Route,
        DriverName: req.body.DriverName,
        DriverNo: req.body.DriverNo,
        CleanerName: req.body.CleanerName,
        CleanerNo: req.body.CleanerNo
    });
    //console.log(VanObj);

    await VanObj.save().then(van => {
        res.status(200).json(van);
    }).catch(err => {
        res.json({ msg: err });
    });

});


Router.put('/:id', async (req, res) => {

    VanObj = {
        VanNo: req.body.VanNo,
        Route: req.body.Route,
        DriverName: req.body.DriverName,
        DriverNo: req.body.DriverNo,
        CleanerName: req.body.CleanerName,
        CleanerNo: req.body.CleanerNo
    };

    await VanModel.findByIdAndUpdate(req.params.id, { $set: VanObj }, { 'new': true }, (error, doc) => {
        res.json(doc);
    });
});

Router.delete('/:id', (req, res) => {
    VanModel.findByIdAndDelete(req.params.id).then(van => {
        res.json(van);
    });
});


Router.get('/expense/all', async (req, res) => {

    await VanModel.find().populate('Expense.HOA').exec().then((van) => {
        if (van) {
            var vanexpenselist = [];
            for (var i in van) {
                for (var j = 0; j < van[i].Expense.length; j++) {
                    vanexpenselist.push(
                        {
                            _id : van[i].Expense[j]._id,
                            VanId: van[i]._id,
                            VanNo: van[i].VanNo,
                            HOAId: van[i].Expense[j].HOA._id,
                            HOA: van[i].Expense[j].HOA.HOA,
                            PayMode: van[i].Expense[j].PayMode,
                            Amount: van[i].Expense[j].Amount,
                            Particulars: van[i].Expense[j].Particulars,
                            Date: van[i].Expense[j].Date
                        }
                    );
                }

            }
            //console.log(vanexpenselist);
            res.status(200).json(vanexpenselist);
        }
    });

})

Router.post('/expense/:id', async (req, res) => {
    vanExpenseObj = {
        HOA: req.body.HOAId,
        Amount: req.body.Amount,
        PayMode: req.body.PayMode,
        Particulars: req.body.Particulars
    };

    await VanModel.updateOne({_id : req.params.id}, {$push : {"Expense" : vanExpenseObj}}).then(result=>{
        console.log(result);
        res.json(result);
    })

    /* await VanModel.findOne({ _id: req.params.id }).then(result => {
        result.Expense.push(vanExpenseObj);
        result.save();
    }); */

})

Router.put('/expense/:vanid/:expid', async (req, res) => {
    //console.log({vanId : req.params.vanid, expId : req.params.expid});
    vanExpenseObj = {
        HOA: req.body.HOAId,
        Amount: req.body.Amount,
        PayMode: req.body.PayMode,
        Particulars: req.body.Particulars
    };
    
    await VanModel.findOneAndUpdate({_id : req.params.vanid, 'Expense._id' : req.params.expid}, {$set : {'Expense.$' : vanExpenseObj}},{'new':true}).then(result => {
        res.json(result);
        console.log(result);
    });
    /* await VanModel.findById({_id : req.params.vanid}).then(van =>{
        if(van)
        {
            for(var j=0; j < van.Expense.length; j++)
            {
                if(van.Expense[j]._id == req.params.expid)
                {
                    van.Expense[j]=vanExpenseObj;
                    van.save();
                    res.json(van.Expense[j]);
                }
            }
            
        }
        
    }) */
    
})

Router.delete('/expense/:vanid/:expid', async (req, res) => {
    //console.log(req.params.expid);
    await VanModel.updateOne({_id : req.params.vanid}, {$pull : {'Expense' :{_id : req.params.expid}}}).then(result =>{
        res.json(result);
    });
})

module.exports = Router;