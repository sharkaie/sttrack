const mongoose = require("mongoose")

const campaignSchema = new mongoose.Schema({
    campaign_title:{
        type:String,
        required:true,
        trim:true
    },
    overview:{
        type:String,
        required:false,
        default:'',
        trim:true
    },
    start_date:{
        type:Date,
        required:true,
        trim:true
    },
    due_date:{
        type:Date,
        required:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:true
    },
    user_id:{
        type:String,
        required:true,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})


const Campaign = new mongoose.model("Campaign", campaignSchema);     

module.exports = Campaign;