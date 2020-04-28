const mongoose = require('mongoose');
const express = require('express');
const Router = express.Router();
const LoginsModel = require('../Models/Logins');

Router.get('/', async (req, res) => {
 /*  await  LoginsModel.find().populate('ClassSubjects.ClassId').exec((err, logins) =>{
        res.json(logins);
        
  }) */
 await LoginsModel.find({}).populate({
    path: 'ClassSubjects.ClassId',
    model: 'Class'
    })
    .exec(function(err, data){
        if (err) return handleError(err);
        res.json(data);
        //console.log(data);
    });
});

Router.get('/login/:id', async (req, res) => {
   await LoginsModel.find({}).then(login => {
        res.json(login);
    })
});


Router.post('/', (req, res) => {

    //console.log(req.body);

    let loginObj = new LoginsModel({
        _id : mongoose.Types.ObjectId(),
        Name : req.body.Name,
        username : req.body.username,
        password : req.body.password,
        usertype : req.body.usertype,
        //ClassSubjects : req.body.ClassSubjects
    });

    if(loginObj.usertype === 'Teacher')
    {
        loginObj.ClassSubjects = req.body.ClassSubjects;
    }

    loginObj.save().then(login => {
            res.json(login);
        }).catch(err => {
            res.json( {error : err});
        });
    });

Router.put('/:id', async (req, res) => {
    
    var id = req.params.id;
    var loginObj = {
        //_id : mongoose.Types.ObjectId(),
        Name : req.body.Name,
        username : req.body.username,
        password : req.body.password,
        usertype : req.body.usertype,
        ClassSubjects : req.body.ClassSubjects,
    };
    
   await LoginsModel.findByIdAndUpdate(id, {$set : loginObj}, {'new' : true}, (error, doc) =>{
        res.json(doc);
    });

});

Router.delete('/:id', (req, res) => {
    LoginsModel.findByIdAndDelete(req.params.id).then(result => {
        res.json(result);
    });
});

Router.post('/checkLoginCredentials', (req, res) => {
    LoginsModel.findOne({'username' : req.body.username, 'password' : req.body.pwd}).then(user =>{
       if(user)
       {
            res.json(user);
            console.log(user);
       }
       else{
           res.json({msg : 'error'});
       }

    })
})

module.exports = Router;




