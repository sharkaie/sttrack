const express = require('express')
const bcrypt = require('bcryptjs');
const router = new express.Router();
const User = require('../models/users')
const Campaign = require('../models/campaigns');
const auth = require('../middleware/auth');


// Login User
router.post('/api/login', async(req,res)=>{
    try{

        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({email:email});
        
        if(userData){
            const verifyPassword = await bcrypt.compare(password, userData.password);
            const token = await userData.generateAuthToken();
            const result = await userData.save();
            console.log(result);
            if(verifyPassword){
                res.status(200).send({
                    authenticated:true,
                    access_token:token
                });
            }else{
                res.status(403).send({
                    error:"Invalid Login credentials"
                });
            }
        }else{
            res.status(403).send({
                error:"Invalid Login credentials"
            });
        }
        

    }catch (error) {
        res.status(400).send(error);
    }
});


router.get('/api/is_authenticated', auth,(req,res)=>{
    res.status(200).send({authenticated:true,
        user:{
            firstname:req.user.firstname,
            lastname:req.user.lastname,
            email:req.user.email,
        }
    })
})


// Logout User
router.get('/api/logout', auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((currElement)=>{
            return currElement.token!==req.token;
        })

        await req.user.save();
        res.status(200).send({status:"logout_successful"})
    } catch (error) {
        res.status(500).send('Server Error');
    }
})


// Logout User From All Devices
router.post('/api/logout-all-devices', auth, async (req,res)=>{
    try {
        req.user.tokens = [];

        await req.user.save();
        res.status(200).send({status:"logout_successful"})
    } catch (error) {
        res.status(500).send('Server Error');
    }
})


module.exports = router;