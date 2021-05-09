const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const JsonData = bodyParse.json();
const mongoose = require('mongoose');
const cors = require('cors');
const uploadmodel = require('./uploadmodel');
app.use(cors());
const multer = require('multer');

// Multer for storedata And rename file
const storage = multer.diskStorage({
    destination:'../imageupload/src/assets/upload',filename:(req,file,callBack)=>{
        console.log(file);
        callBack(null,`Image${file.originalname}`)
    }
    })

    var upload = multer({storage:storage})

    // let upload = multer({dest:'upload/'}) 

const dbconffi = require('./dbConff');



 //Single File Upload And insert data Api
 app.post('/fileupload',JsonData ,upload.single('file') , (req,res,next)=>{
    const file = req.file;
    console.log(file.filename);
    if(!file){
        const error = new error('no file')
        error.httpStatusCode=400
        return next(error)
    }

    var send = new uploadmodel({

        Name:req.body.Name,
        Email:req.body.Email,
        Mob:req.body.Mob,
        imgUrl:file.filename
    })
    send.save().then((responce)=>{
        console.log(file.filename);
    }).catch((err)=>{
        console.log(err);
    })
    res.send(file)

   
 })


 // For Update existing record Api
 app.post('/fileupload/:id',JsonData ,upload.single('file') , function(req,res){
    const file = req.file;
    console.log(file.filename);
    if(!file){
        const error = new error('no file')
        error.httpStatusCode=400
        console.log(error)
    }

    uploadmodel.updateOne({_id:req.params.id},{$set:{
        Name:req.body.Name,
        Email:req.body.Email,
        Mob:req.body.Mob,
        imgUrl:file.filename
    }}).then((responce)=>{
        console.log(file.filename);
        res.send(file)
    }).catch((err)=>{
        console.log(err);
    })
    
   
 })




 // For fetch data 
 app.get('/fetchData',function(req,res){
     uploadmodel.find().then((responce)=>{
         res.send(responce);
     }).catch((err)=>{
         console.log(err);
     })
 })

 app.delete('/delete/:id',function(req,res){
    uploadmodel.deleteOne({_id:req.params.id}).then((responce)=>{
        res.send(responce);
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/',function(req,res){
    res.end("your welcome dear");
})

app.listen(3000);
