const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dhiraj:ztT4blZumC0vKGzT@cluster0.7a6ts.mongodb.net/uploadimages?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection done");
}).catch((err)=>{
    console.log(err+"connection failed");
})

module.exports= mongoose;
