const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get("/",(req,res)=>{
    res.json({msg:"hello world"})
});

app.post("/login",(req,res)=>{
    //request -->database-->true
    //generate token
    //sign userdata
    var userdata = { id:1,username:"priya",age:26};

    jwt.sign({user:userdata},"secretkey",(err,token)=>{
        if(err){
            res.json({error:err});
        }else{
            res.json({token:token});
        }
    })
});

app.post("/save", verifyToken,(req,res)=>{

    jwt.verify(req.token, "secretkey",(err,data)=>{
        if(err){
            res.json({msg:"Access denied"});
        }else{
            res.json({msg:"Data saved", data:data})
        }
    })
});

function verifyToken(req,res,next){

    if(typeof(req.headers['authorization']) != 'undefined' && req.headers['authorization'] != 'undefined'){
        var headerToken = req.headers['authorization'].split(' ')[1];
        console.log((headerToken));
        if(headerToken !== 'undefined'){
            req.token = headerToken;
            next();
        }else{
            res.json({msg:"Unauthorized Request"});
        }
    }else{
        res.json({msg:"Unauthorized Request"});
    }
   
}

app.listen(4000,()=>{
    console.log("app is listening for port 4000");
})