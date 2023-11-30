const express = require('express')
const router = new express.Router();
const User = require('../models/users');

// Show Users
// router.get('/api/user/:id', ,async(req,res)=>{
//     try{
//         const _id = req.params.id;
//         const userData = await User.findById(_id);
//         if(!userData){
//             res.status(400).send({
//                 error:"Invalid Id"
//             });
//         }
//         res.status(200).send(userData);
//     }catch (error) {
//         res.status(400).send(error);
//     }
// });


// Create User - Register
router.post('/api/user', async(req,res)=>{
    try{

        const password = req.body.password;        
       
            const createUser = new User({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                password:password    
            })

            // await createUser.generateAuthToken();
            
            const userData = await createUser.save();
            res.status(200).send(userData);

        
    }catch (error) {
        res.status(400).send(error);
    }
});


// Edit User
// router.patch('/api/user/:id', async(req,res)=>{
//     try{
//         const _id = req.params.id;
//         const userData = await User.findByIdAndUpdate(_id, req.body,{
//             new:true
//         });
//         res.status(200).send(userData);
//     }catch (error) {
//         res.status(400).send(error);
//     }
// });


// Delete User
// router.delete('/api/user/:id', async(req,res)=>{
//     try{
//         const id = req.params.id;
//         const userData = await User.findByIdAndDelete(id);
//         if(!userData){
//             res.status(400).send("Bad Request");
//         }
//         res.status(200).send(userData);
//     }catch (error) {
//         res.status(400).send(error);
//     }
// });


module.exports = router;