require('dotenv').config()
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt=require('bcrypt');


const userLogin = async (req,res)=>{
    // Authenticate User
    const email=req.body.email;
    const password=req.body.password;
    const person= await User.findOne({email:email}).exec();
    // console.log(person.password);
    const match = bcrypt.compareSync(password + process.env.PEPPER, person.password);
    if(match) {
        //login
        const user = {firstName:person.firstName,email:person.email, id:person._id};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn:'900s'});
        res.json({accessToken:accessToken});
    }else{
        res.send("Invalid user credentials!");
    }
}

const authenticateToken = (req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token = authHeader && authHeader;
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,
        // {expiresIn:'15s'},
        (err, user)=>{
        if(err) return res.send("Invalid token").sendStatus(403);
        req.user=user;
        next();
    })
}


module.exports={userLogin,authenticateToken};