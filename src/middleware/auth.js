const jwt = require('jsonwebtoken');
const User = require('../models/users')

const auth = async (req, res, next) => {
    try {
        
        const token = req.headers['x-access-token'];
    
        if(!token){ res.status(403).send({message:'No token found'})}
        const verifyUser = await jwt.verify(token, process.env.SECRET_KEY);
        const userData = await User.findOne({_id:verifyUser._id});
        if(!userData){
           res.status(403).send({message:"Unautorized"});
        }
        const allTokens = userData.tokens;
        //console.log(allTokens);
        const tokenIsValid = allTokens.filter((objToken)=>{
            //console.log("****" +objToken.token+"****");
            return objToken.token === token;
        })


        if(!tokenIsValid[0].token){
            res.status(419).send({message:"Session Expired"});
        }
        req.user = userData;
        req.token = token;
        // console.log('cleared');
        next();
    } catch (error) {
        console.log('nope');
        res.status(500).send({message:error});
    }
}

module.exports = auth;