const mongoose = require('../../_DBConfig/DBConn');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

router.post('/register', upload.single('photo'), (req, res) => {
    if(req.file) {

        console.log("File received "+ req.file.originalname)
    }
    const email = req.body.email;
    console.log("Adding user "+ email);
    let newUser = new User({
        email : req.body.email,
        password : req.body.password,
        name : req.body.name,
        mobileNo: req.body.mobileNo,
        district: req.body.district,
        province: req.body.province,
        nic: req.body.nic,
        postalCode : req.body.postalCode,
        imageId : req.file.originalname
    });
    User.addUser(newUser,(err)=>{
        if(err){
            console.log("Error registering user");
        }else {
            res.json({success:true,msg:'User registered'});
            console.log("User Registered successfully");
            console.log(res.json())
        }
    })
});

module.exports = router;
