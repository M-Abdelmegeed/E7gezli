require("dotenv").config();
const User=require('../models/User');
const bcrypt=require('bcrypt')

const registerUser = async(req,res)=>{
    const body=req.body;
    const newUser = new User({
        firstName: body.firstName,
        lastName:body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        password: body.password,
        role:body.role,
        image:body.image
    });

    bcrypt.hash(
        newUser.password + process.env.PEPPER,
        +process.env.SALT_ROUNDS || "",
        async (err, hash) => {
            newUser.password = hash;
            await newUser.save();
            res.send('New User Saved');
        }
    );
}

module.exports=registerUser;