const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Campaign = require("../models/campaigns");


// Show Single Campaigns
router.get("/api/campaign/:campaign_id", auth, async (req, res) => {
    try {
      
      if (req.user._id&&req.params.campaign_id) {
        const user = req.user;
        const campaign_id = req.params.campaign_id;
        const user_id = user._id;
        const campaign = await Campaign.find({ user_id: user_id, _id:campaign_id });
        res.status(200).send(campaign[0]);
      } else {
        res.status(400).send("No Campaign Identifier Passed");
      }
    } catch (error) {
      res.status(500).send("Something went Wrong");
    }
  });

// Show All Campaigns
router.get("/api/campaign", auth, async (req, res) => {
  try {
    user = req.user;
    if (user._id) {
      const user_id = user._id;
      const campaigns = await Campaign.find({ user_id: user_id });
      res.status(200).send(campaigns);
    } else {
      res.status(400).send("Something went Wrong");
    }
  } catch (error) {
    res.status(500).send("Something went Wrong");
  }
});

// Create Campaign
router.post("/api/campaign", auth, async (req, res) => {
  try {
    if (
      !req.body.campaign_title &&
      req.body.overview &&
      req.body.start_date &&
      req.body.due_date &&
      req.user._id
    ) {
      res.status(400).send({ error: "InValid Data" });
    }
    const campaignData = {
      campaign_title: req.body.campaign_title,
      overview: req.body.overview,
      start_date: req.body.start_date,
      due_date: req.body.due_date,
      status: req.body.status,
      user_id: req.user._id,
    };

    const createCampaign = new Campaign(campaignData);
    const createdCampaign = await createCampaign.save();
    if (createdCampaign) {
      res.status(200).send(createdCampaign);
    } else {
      res.status(400).send({ error: "InValid Data" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// Edit Campaign
router.patch("/api/campaign", auth, async (req, res) => {
    try {console.log(req.body.campaign_id);
        if (
          !req.body.campaign_title &&
          req.body.overview &&
          req.body.start_date &&
          req.body.due_date &&
          req.user._id
        ) {
          res.status(400).send({ error: "InValid Data" });
        }
        user_id = req.user._id;
        campaign_id = req.body.campaign_id;
        console.log(req.body);
        const campaignData = {
          campaign_title: req.body.campaign_title,
          overview: req.body.overview,
          start_date: req.body.start_date,
          due_date: req.body.due_date,
          status: req.body.status,
          user_id: user_id,
        };
        console.log(campaignData);
        
    
        const editCampaign = await Campaign.findByIdAndUpdate(campaign_id, {$set : campaignData }, {new:true});
        
        if (editCampaign) {
          res.status(200).send(editCampaign);
        } else {
          res.status(400).send({ error: "Invalid Data" });
        }
      } catch (error) {
        res.status(500).send("Server Error");
      }
});


// Delete Campaign
router.delete("/api/campaign", auth, async (req, res) => {
    
  try {
    if (!req.body.campaign_id) {
      res.status(400).send({ error: "InValid Data" });
    }
    const campaign_id = req.body.campaign_id;

    // res.status(200).send(req.body.campaign_id);
    const deleteCampaign = await Campaign.findByIdAndDelete(campaign_id);
    console.log(deleteCampaign);
    if (deleteCampaign) {
      res.status(200).send(deleteCampaign);
    } else {
      res.status(400).send({ error: "InValid Data" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
