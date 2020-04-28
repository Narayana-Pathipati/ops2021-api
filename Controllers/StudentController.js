const express = require('express');
const mongoose = require('mongoose');
const StudentModel = require('../Models/Student');
const ClassModel = require('../Models/Class');

const Router = express.Router();
 
Router.get('/', async (req, res ) => {
    
  await StudentModel.find({IsActive : true}).populate('ClassId VanId').exec( (error, students) => {
      res.json(students);
  })
});

Router.get('/searchby/:by/:value?', async (req, res ) => {

    if(req.params.by == 'name'){
        //searchby = 'name'
        await StudentModel.find({IsActive : true , $text : {$search : req.params.value}}).populate('ClassId VanId').exec( (error, students) => {
            //console.log(students);
            res.json(students);
        })
    }
    else if(req.params.by == 'admno')
    {
        //searchby = 'admno'
        await StudentModel.find({IsActive : true, AdmNo : req.params.value}).populate('ClassId VanId').exec( (error, students) => {
            res.json(students);
        })
    }
    else if(req.params.by == 'classwise')
    {
        let classids=[];
        classids = req.params.value.split(',');
        //searchby = 'classwise'
        await StudentModel.find({IsActive : true, ClassId : {$in : classids}}).populate('ClassId VanId').exec( (error, students) => {
            res.json(students);
        })
    }

    else if(req.params.by == 'vanwise')
    {
        if(req.params.value == 'all')
        {
            await StudentModel.find({IsActive : true, IsVanStudent : true}).populate('ClassId VanId').exec( (error, students) => {
                res.json(students);
            })
        }else
        {
            let vanids = [];
            vanids = req.params.value.split(',');
            await StudentModel.find({IsActive : true, VanId : {$in : vanids}}).populate('ClassId VanId').exec( (error, students) => {
                res.json(students);
            })
        }
     
    }

    else {
        
        await StudentModel.find({IsActive : true}).populate('ClassId VanId').exec( (error, students) => {
            res.json(students);
        })
    }
 
  });

Router.get('/:id', async (req, res) => {
  await StudentModel.findOne({_id : req.params.id, IsActive : true}).populate('ClassId VanId').exec((error, student) => {
    if(!error)    
    {
        res.json(student);
    }
    else{
        res.json('error');
    }
    });
});

Router.post('/', async (req, res) => {

   let StudentObj = new StudentModel({
        //_id : mongoose.Types.ObjectId(),
        Name : req.body.Name,
        ClassId : req.body.ClassId,
        AdmNo : req.body.AdmNo,
        Gender : req.body.Gender,
        DOB : req.body.DOB,
        DOA : req.body.DOA,
        BloodGroup : req.body.BloodGroup,
        Concession : req.body.Concession,
        Address : req.body.Address,
            DrNo : req.body.Address.DrNo,
            Street : req.body.Address.Street,
            VillageCity : req.body.Address.VillageCity,
            District : req.body.Address.District,
            Pincode : req.body.Address.Pincode,
        FatherName : req.body.FatherName,
        MotherName : req.body.MotherName,
        ContactNo1 : req.body.ContactNo1,
        ContactNo2 : req.body.ContactNo2,
        AadharNo : req.body.AadharNo,
        EmisNo : req.body.EmisNo,
        VanId : req.body.VanId,
        VanNo : req.body.VanNo,
        IsVanStudent : req.body.IsVanStudent,
        Coord : req.body.Coord,
            lat : req.body.Coord.lat,
            lon : req.body.Coord.lon,
        Distance : req.body.Distance,
        VanId : req.body.VanId,
        IsLateAdmission :req.body.IsLateAdmission,
        Fee : req.body.Fee,
            Term1 : req.body.Fee.Term1,
            Term2 : req.body.Fee.Term2,
            Term3 : req.body.Fee.Term3,
            AccessoriesFee : req.body.Fee.AccessoriesFee,
            VanFee : req.body.VanFee,
                TotalMonths : req.body.Fee.VanFee.TotalMonths,
                IsInterior : req.body.Fee.VanFee.IsInterior,
                InteriorFee : req.body.Fee.VanFee.InteriorFee,
                MonthlyFee : req.body.Fee.VanFee.MonthlyFee,
                Term1 : req.body.Fee.VanFee.Term1,
                    APR : req.body.Fee.VanFee.Term1.APR,
                    AprPaid : req.body.Fee.VanFee.Term1.AprPaid,
                    MAY : req.body.Fee.VanFee.Term1.MAY,
                    MayPaid : req.body.Fee.VanFee.Term1.MayPaid,
                    JUN : req.body.Fee.VanFee.Term1.JUN,
                    JunPaid : req.body.Fee.VanFee.Term1.JunPaid,
                Term2 : req.body.Fee.VanFee.Term2,
                    JUL : req.body.Fee.VanFee.Term2.JUL,
                    JulPaid : req.body.Fee.VanFee.Term2.JulPaid,
                    AUG : req.body.Fee.VanFee.Term2.AUG,
                    AugPaid : req.body.Fee.VanFee.Term2.AugPaid,
                    SEP : req.body.Fee.VanFee.Term2.SEP,
                    SepPaid : req.body.Fee.VanFee.Term2.SepPaid,
                Term3 : req.body.Fee.VanFee.Term3,
                    OCT : req.body.Fee.VanFee.Term3.OCT,
                    OctPaid : req.body.Fee.VanFee.Term3.OctPaid,
                    NOV : req.body.Fee.VanFee.Term3.NOV,
                    NovPaid : req.body.Fee.VanFee.Term3.NovPaid,
                    DEC : req.body.Fee.VanFee.Term3.DEC,
                    DecPaid : req.body.Fee.VanFee.Term3.DecPaid,
                Term4 : req.body.Fee.VanFee.Term4,
                    JAN : req.body.Fee.VanFee.Term4.JAN,
                    JanPaid : req.body.Fee.VanFee.Term4.JanPaid,
                    FEB : req.body.Fee.VanFee.Term4.FEB,
                    FebPaid : req.body.Fee.VanFee.Term4.FebPaid,
                    MAR : req.body.Fee.VanFee.Term4.MAR,
                    MarPaid : req.body.Fee.VanFee.Term4.MarPaid,
        IsActive : req.body.IsActive,
        /* TuitionFeePaid=[],
        VanFeePaid = [],
        AccessoriesFeePaid=[] */
        });
        
   await StudentObj.save().then(student => {
        res.status(200).json(student);
    }).catch(err => {
        res.json({msg : err});
        console.log(err);
    });
});


Router.put('/:id', async (req, res) => {

   //console.log(req.body.IsVanStudent);
    
    StudentObj = {
        //_id : mongoose.Types.ObjectId(),
        Name : req.body.Name,
        ClassId : req.body.ClassId,
        AdmNo : req.body.AdmNo,
        Gender : req.body.Gender,
        DOB : req.body.DOB,
        DOA : req.body.DOA,
        BloodGroup : req.body.BloodGroup,
        Concession : req.body.Concession,
        Address : req.body.Address,
            DrNo : req.body.Address.DrNo,
            Street : req.body.Address.Street,
            VillageCity : req.body.Address.VillageCity,
            District : req.body.Address.District,
            Pincode : req.body.Address.Pincode,
        FatherName : req.body.FatherName,
        MotherName : req.body.MotherName,
        ContactNo1 : req.body.ContactNo1,
        ContactNo2 : req.body.ContactNo2,
        AadharNo : req.body.AadharNo,
        EmisNo : req.body.EmisNo,
        VanId : req.body.VanId,
        VanNo : req.body.VanNo,
        IsVanStudent : req.body.IsVanStudent,
        Coord : req.body.Coord,
            lat : req.body.Coord.lat,
            lon : req.body.Coord.lon,
        Distance : req.body.Distance,
        VanId : req.body.VanId,
        IsLateAdmission :req.body.IsLateAdmission,
        Fee : req.body.Fee,
            Term1 : req.body.Fee.Term1,
            Term2 : req.body.Fee.Term2,
            Term3 : req.body.Fee.Term3,
            AccessoriesFee : req.body.Fee.AccessoriesFee,
            VanFee : req.body.VanFee,
                TotalMonths : req.body.Fee.VanFee.TotalMonths,
                IsInterior : req.body.Fee.VanFee.IsInterior,
                InteriorFee : req.body.Fee.VanFee.InteriorFee,
                MonthlyFee : req.body.Fee.VanFee.MonthlyFee,
                Term1 : req.body.Fee.VanFee.Term1,
                    APR : req.body.Fee.VanFee.Term1.APR,
                    //AprPaid : req.body.Fee.VanFee.Term1.AprPaid,
                    MAY : req.body.Fee.VanFee.Term1.MAY,
                    //MayPaid : req.body.Fee.VanFee.Term1.MayPaid,
                    JUN : req.body.Fee.VanFee.Term1.JUN,
                    //JunPaid : req.body.Fee.VanFee.Term1.JunPaid,
                Term2 : req.body.Fee.VanFee.Term2,
                    JUL : req.body.Fee.VanFee.Term2.JUL,
                    //JulPaid : req.body.Fee.VanFee.Term2.JulPaid,
                    AUG : req.body.Fee.VanFee.Term2.AUG,
                    //AugPaid : req.body.Fee.VanFee.Term2.AugPaid,
                    SEP : req.body.Fee.VanFee.Term2.SEP,
                    //SepPaid : req.body.Fee.VanFee.Term2.SepPaid,
                Term3 : req.body.Fee.VanFee.Term3,
                    OCT : req.body.Fee.VanFee.Term3.OCT,
                    //OctPaid : req.body.Fee.VanFee.Term3.OctPaid,
                    NOV : req.body.Fee.VanFee.Term3.NOV,
                   // NovPaid : req.body.Fee.VanFee.Term3.NovPaid,
                    DEC : req.body.Fee.VanFee.Term3.DEC,
                    //DecPaid : req.body.Fee.VanFee.Term3.DecPaid,
                Term4 : req.body.Fee.VanFee.Term4,
                    JAN : req.body.Fee.VanFee.Term4.JAN,
                    //JanPaid : req.body.Fee.VanFee.Term4.JanPaid,
                    FEB : req.body.Fee.VanFee.Term4.FEB,
                   // FebPaid : req.body.Fee.VanFee.Term4.FebPaid,
                    MAR : req.body.Fee.VanFee.Term4.MAR,
                   // MarPaid : req.body.Fee.VanFee.Term4.MarPaid,

        IsActive : req.body.IsActive
        };


        await StudentModel.findByIdAndUpdate(req.params.id , {$set : StudentObj}, {new : true}).then((student) => {
            res.status(200).json(student);
        }).catch(err => {
            res.json({msg : err});
            console.log(err);
        });
          
});

Router.delete('/:id', async (req, res) => {
  await  StudentModel.findByIdAndUpdate(req.params.id, {$set : {IsActive : false}}, {'new' : true}, (error, doc) => {
        res.json(doc);
    });
});

Router.post('/tuitionfee/:id', async (req, res) =>{
       
    await StudentModel.findOne({_id : req.params.id, IsActive : true}).then((student, error) =>{

        if(student){
            req.body.TuitionFeePaid.forEach((fee, index, array) =>{
                student.TuitionFeePaid.push(fee);
            })

            if(req.body.TuitionFeeDue.Term1Paid > 0)
            {
                student.Fee.Term1Paid = student.Fee.Term1Paid + req.body.TuitionFeeDue.Term1Paid;
            }
            if(req.body.TuitionFeeDue.Term2Paid > 0)
            {
                student.Fee.Term2Paid = student.Fee.Term2Paid + req.body.TuitionFeeDue.Term2Paid;
            }
            if(req.body.TuitionFeeDue.Term3Paid > 0)
            {
                student.Fee.Term3Paid = student.Fee.Term3Paid + req.body.TuitionFeeDue.Term3Paid;
            }
            
            student.save().then(student => {
                res.send(student);
            });

        }
    })
});


Router.post('/vanfee/:id', async (req, res, next) =>{

    await StudentModel.findOne({_id : req.params.id, IsActive : true}).then( (student, error) => {

        if(student) {

                var vanFeePaidObj={
                    PaidFor : req.body.VanFeePaid.PaidFor,
                      Amount : req.body.VanFeePaid.Amount,
                      PayMode : req.body.VanFeePaid.PayMode,
                      ChequeNo : req.body.VanFeePaid.ChequeNo,
                      ChequeDate : req.body.VanFeePaid.ChequeDate,
                      Remarks : req.body.VanFeePaid.Remarks,
                      Month : req.body.VanFeePaid.Month,
                      TransId : req.body.VanFeePaid.TransId,
                      ClearedOn : req.body.VanFeePaid.ClearedOn
                  }
                  
                  student.VanFeePaid.push(vanFeePaidObj);

            //term1
            if(req.body.VanFeeDue.aprpaid > 0)
            {
                student.Fee.VanFee.Term1.AprPaid += req.body.VanFeeDue.aprpaid;
            }
            if(req.body.VanFeeDue.maypaid > 0)
            {
                student.Fee.VanFee.Term1.MayPaid += req.body.VanFeeDue.maypaid;
            }
            if(req.body.VanFeeDue.junpaid > 0)
            {
                student.Fee.VanFee.Term1.JunPaid += req.body.VanFeeDue.junpaid;
            }
            //term2
            if(req.body.VanFeeDue.julpaid > 0)
            {
                student.Fee.VanFee.Term2.JulPaid += req.body.VanFeeDue.julpaid;
            }
            if(req.body.VanFeeDue.augpaid > 0)
            {
                student.Fee.VanFee.Term2.AugPaid += req.body.VanFeeDue.augpaid;
            }
            if(req.body.VanFeeDue.seppaid > 0)
            {
                student.Fee.VanFee.Term2.SepPaid += req.body.VanFeeDue.seppaid;
            }
            //term3
            if(req.body.VanFeeDue.octpaid > 0)
            {
                student.Fee.VanFee.Term3.OctPaid += req.body.VanFeeDue.octpaid;
            }
            if(req.body.VanFeeDue.novpaid > 0)
            {
                student.Fee.VanFee.Term3.NovPaid += req.body.VanFeeDue.novpaid;
            }
            if(req.body.VanFeeDue.decpaid > 0)
            {
                student.Fee.VanFee.Term3.DecPaid += req.body.VanFeeDue.decpaid;
            }
            //term4
            if(req.body.VanFeeDue.janpaid > 0)
            {
                student.Fee.VanFee.Term4.JanPaid += req.body.VanFeeDue.janpaid;
            }
            if(req.body.VanFeeDue.febpaid > 0)
            {
                student.Fee.VanFee.Term4.FebPaid += req.body.VanFeeDue.febpaid;
            }
            if(req.body.VanFeeDue.marpaid > 0)
            {
                student.Fee.VanFee.Term4.MarPaid += req.body.VanFeeDue.marpaid;
            }

            student.save().then(student => {
                res.send(student);
            });

        }
    })

});

Router.post('/accessoriesfee/:id', async (req, res) =>{
    
    var StudentObj = {
            _id : mongoose.Types.ObjectId(),
            Amount : req.body.Amount,
            PayMode : req.body.PayMode, 
            ChequeNo : req.body.ChequeNo,
            ChequeDate : req.body.ChequeDate,
            Remarks : req.body.Remarks,
            TransId : req.body.TransId,
            ClearedOn : req.body.ClearedOn
    }

    await StudentModel.findOne({_id : req.params.id, IsActive : true}).then((student, error) =>{
        if(student){
            //console.log(req.body);
            student.AccessoriesFeePaid.push(StudentObj);
            student.save().then((student) => {
                res.json(student);
            })
        }
    })

   /*  await StudentModel.findByIdAndUpdate(req.params.id , {$push : {AccessoriesFeePaid : StudentObj}}, {'new' : true}, (error, doc) =>{
        res.json(doc);
    }); */
});

Router.get("/classwise/strength", async (req, res) => {
 
   await StudentModel.aggregate([
    {
        $project: {
        male: {$cond: [{$eq: ["$Gender", "Male"]}, 1, 0]},
        female: {$cond: [{$eq: ["$Gender", "Female"]}, 1, 0]},
        classid : '$ClassId',
        }
    },

    {$group: { _id: '$classid', male: {$sum: "$male"},
                          female: {$sum: "$female"},
                          total: {$sum: 1},
    }},
  ]).exec().then(result =>  {
      ClassModel.populate(result, {path : '_id'}, (err, doc) => {
        //console.log(doc);
        res.json(doc);
      })
     
  });

  
});

Router.get('/tfeebill/:studid/:feeid', (req, res) => {
    var studid = req.params.studid;
    var feeid = req.params.feeid;
    StudentModel.findOne({'TuitionFeePaid._id' : feeid}).populate('ClassId').then(fee => {
        let tuitionfee;
        for(var i=0; i < fee.TuitionFeePaid.length; i++)
        {
            if(fee.TuitionFeePaid[i]._id == feeid)
            {
               tuitionfee = fee.TuitionFeePaid[i];
               //fee.TuitionFeePaid.splice(i,1);
            }
        }
        fee.TuitionFeePaid=tuitionfee;
        res.json(fee);
    })
});

Router.get('/vfeebill/:studid/:feeid', (req, res) => {
    var studid = req.params.studid;
    var feeid = req.params.feeid;

    StudentModel.findOne({'VanFeePaid._id' : feeid}).populate('ClassId').exec().then(fee => {
        var vanfee;
        for(var i=0; i < fee.VanFeePaid.length; i++)
        {
            if(fee.VanFeePaid[i]._id == feeid)
            {
                vanfee=fee.VanFeePaid[i];
               //fee.VanFeePaid.splice(i,1);
            }
        }
        fee.VanFeePaid = vanfee;
       //console.log(fee);
        res.json(fee);
    })
});


module.exports = Router;