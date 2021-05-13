const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const JsonData = bodyParse.json();
const mongoose = require('mongoose');
const cors = require('cors');
const uploadmodel = require('./uploadmodel');
const fs = require('fs');
const cookiesp = require('cookie-parser');
app.use(cookiesp());
app.use(cors());
app.use('/upload', express.static('upload'));
const dbconffi = require('./dbConff');

  
// fs.unlink('upload/Imageadvisorapp.png',function(err){
//     if(err){
//         console.log(err)
//     }else{
//         console.log("done");
//     }
// })

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const multer = require('multer');
const { model } = require('mongoose');

// Multer for storedata And rename file
const storage = multer.diskStorage({
    destination:'upload',filename:(req,file,callBack)=>{
        // console.log(file);
        callBack(null,`${randomNum(100000,599990)}Image${file.originalname}`)
    }
    })

    var upload = multer({storage:storage})

    // let upload = multer({dest:'upload/'}) 


 //Single File Upload And insert data Api
 app.post('/fileupload',JsonData ,upload.single('file') , (req,res,next)=>{
    const file = req.file;
    // console.log(file.filename);
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
        // console.log(file.filename);
    }).catch((err)=>{
        console.log(err);
    })
    res.send(file)

   
 })


 // For Update existing record Api
 app.post('/fileupload/:id',JsonData ,upload.single('file') , function(req,res){
    const file = req.file;
    // console.log(file.filename);
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
        // console.log(file.filename);
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

    uploadmodel.find({_id:req.params.id}).then((responce)=>{

        fs.unlink('upload/'+responce[0].imgUrl,function(err){
                if(err){
                    console.log(err)
                }else{
                    uploadmodel.deleteOne({_id:req.params.id}).then((responce)=>{
                        res.send(responce);
                    })
                    .catch((err)=>{-
                        console.log(err);
                    })
                }
            })

    }).catch((err)=>{
        console.log(err);
    })
})

app.get('/',function(req,res){
    res.send({ some: 'json' });  

    // res.end("your welcome dear");
})

app.get('/setcookiesk',function(req,res){
    console.log('heloo');
    res.cookie('zozotinew','travel Comapany new');
    // res.cookie('volyo','software development');
    // res.cookie('lucid','software development concept ');
    // res.status(200).send("cookies Send Successfully ");


})
app.get('/getcookies',function(req,res){

    res.status(200).send(req.cookies);


})

app.listen(3000);

