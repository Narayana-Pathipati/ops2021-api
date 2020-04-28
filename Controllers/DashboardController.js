const express = require('express');
const mongoose = require('mongoose');
const StudentModel = require('../Models/Student');
const Router = express.Router();


Router.get('/fee/:id', async (req, res ) => {

   let vanid  = req.params.id;
    
    var vanfee=[{
        AprTotal : 0,
        AprPaid : 0,
        MayTotal : 0,
        MayPaid : 0,
        JunTotal : 0,
        JunPaid : 0,
        JulTotal : 0,
        JulPaid : 0,
        AugTotal : 0,
        AugPaid : 0,
        SepTotal : 0,
        SepPaid : 0,
        OctTotal : 0,
        OctPaid : 0,
        NovTotal : 0,
        NovPaid : 0,
        DecTotal : 0,
        DecPaid : 0,
        JanTotal : 0,
        JanPaid : 0,
        FebTotal : 0,
        FebPaid : 0,
        MarTotal : 0,
        MarPaid : 0
    }];

    if(vanid === 'all' || vanid === 'undefined' || vanid === 'null')
    {
        //console.log(vanid);
        vanfee =  await StudentModel.aggregate([
            {
                $match : {IsActive : true, IsVanStudent : true},
            },
            {
                $group : { 
                    _id : null , 
                    AprTotal : { $sum : '$Fee.VanFee.Term1.APR'},
                    AprPaid : {$sum : '$Fee.VanFee.Term1.AprPaid'},
                    MayTotal : { $sum : '$Fee.VanFee.Term1.MAY'},
                    MayPaid : {$sum : '$Fee.VanFee.Term1.MayPaid'},
                    JunTotal : { $sum : '$Fee.VanFee.Term1.JUN'},
                    JunPaid : {$sum : '$Fee.VanFee.Term1.JunPaid'},
    
                    JulTotal : { $sum : '$Fee.VanFee.Term2.JUL'},
                    JulPaid : {$sum : '$Fee.VanFee.Term2.JulPaid'},
                    AugTotal : { $sum : '$Fee.VanFee.Term2.AUG'},
                    AugPaid : {$sum : '$Fee.VanFee.Term2.AugPaid'},
                    SepTotal : { $sum : '$Fee.VanFee.Term2.SEP'},
                    SepPaid : {$sum : '$Fee.VanFee.Term2.SepPaid'},
    
                    OctTotal : { $sum : '$Fee.VanFee.Term3.OCT'},
                    OctPaid : {$sum : '$Fee.VanFee.Term3.OctPaid'},
                    NovTotal : { $sum : '$Fee.VanFee.Term3.NOV'},
                    NovPaid : {$sum : '$Fee.VanFee.Term3.NovPaid'},
                    DecTotal : { $sum : '$Fee.VanFee.Term3.DEC'},
                    DecPaid : {$sum : '$Fee.VanFee.Term3.DecPaid'},
    
                    JanTotal : { $sum : '$Fee.VanFee.Term4.JAN'},
                    JanPaid : {$sum : '$Fee.VanFee.Term4.JanPaid'},
                    FebTotal : { $sum : '$Fee.VanFee.Term4.FEB'},
                    FebPaid : {$sum : '$Fee.VanFee.Term4.FebPaid'},
                    MarTotal : { $sum : '$Fee.VanFee.Term4.MAR'},
                    MarPaid : {$sum : '$Fee.VanFee.Term4.MarPaid'},
                    
                }
            },
        ]);
       
    }
    else
    {
       
        vanfee =  await StudentModel.aggregate([
            {
                $match : {VanId : parseInt(vanid), IsVanStudent : true, IsActive : true},
            },

            {
                $group : { 
                    _id : req.params.id , 
                    AprTotal : { $sum : '$Fee.VanFee.Term1.APR'},
                    AprPaid : {$sum : '$Fee.VanFee.Term1.AprPaid'},
                    MayTotal : { $sum : '$Fee.VanFee.Term1.MAY'},
                    MayPaid : {$sum : '$Fee.VanFee.Term1.MayPaid'},
                    JunTotal : { $sum : '$Fee.VanFee.Term1.JUN'},
                    JunPaid : {$sum : '$Fee.VanFee.Term1.JunPaid'},
    
                    JulTotal : { $sum : '$Fee.VanFee.Term2.JUL'},
                    JulPaid : {$sum : '$Fee.VanFee.Term2.JulPaid'},
                    AugTotal : { $sum : '$Fee.VanFee.Term2.AUG'},
                    AugPaid : {$sum : '$Fee.VanFee.Term2.AugPaid'},
                    SepTotal : { $sum : '$Fee.VanFee.Term2.SEP'},
                    SepPaid : {$sum : '$Fee.VanFee.Term2.SepPaid'},
    
                    OctTotal : { $sum : '$Fee.VanFee.Term3.OCT'},
                    OctPaid : {$sum : '$Fee.VanFee.Term3.OctPaid'},
                    NovTotal : { $sum : '$Fee.VanFee.Term3.NOV'},
                    NovPaid : {$sum : '$Fee.VanFee.Term3.NovPaid'},
                    DecTotal : { $sum : '$Fee.VanFee.Term3.DEC'},
                    DecPaid : {$sum : '$Fee.VanFee.Term3.DecPaid'},
    
                    JanTotal : { $sum : '$Fee.VanFee.Term4.JAN'},
                    JanPaid : {$sum : '$Fee.VanFee.Term4.JanPaid'},
                    FebTotal : { $sum : '$Fee.VanFee.Term4.FEB'},
                    FebPaid : {$sum : '$Fee.VanFee.Term4.FebPaid'},
                    MarTotal : { $sum : '$Fee.VanFee.Term4.MAR'},
                    MarPaid : {$sum : '$Fee.VanFee.Term4.MarPaid'}
                    
                }
            }
        ]);
               
    }

  var termfee =  await StudentModel.aggregate([
        {
            $match : {IsActive : true},
        },

        { $unwind: "$Fee"},
        {
            $group : { 
                _id : null , 
                Term1Total : { $sum : '$Fee.Term1'},
                Term1Paid : {$sum : '$Fee.Term1Paid'},
                Term2Total : {$sum : '$Fee.Term2'},
                Term2Paid : {$sum : '$Fee.Term2Paid'},
                Term3Total : {$sum : '$Fee.Term3'},
                Term3Paid : {$sum : '$Fee.Term3Paid'},
                AccessFee : {$sum : '$AccessoriesFeePaid.Amount'}
            }
        },

    ]);


    var accessfee =  await StudentModel.aggregate([
        {
            $match : {IsActive : true},
        },

        { $unwind: "$AccessoriesFeePaid" },
        {
            $group : { 
                _id : null,
                AccessFee : {$sum : '$AccessoriesFeePaid.Amount'}
            }
        },
    ]);

    res.json({ tuitionfee : termfee, vanfee : vanfee, accessfee : accessfee});
});


  module.exports = Router;