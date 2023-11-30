const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Campaign = require("../models/campaigns");
const Chapter = require("../models/chapters");


// Show Single Chapters
router.get("/api/campaign/:campaign_id/chapter/:chapter_id", auth, async (req, res) => {
    try {
      
      if (req.user._id&&req.params.campaign_id&&req.params.chapter_id) {
        const user_id= req.user._id;
        console.log('ok1');
        const chapter_id = req.params.chapter_id;
        const campaign_id = req.params.campaign_id;

        const chapter = await Chapter.find({ user_id: user_id, campaign_id: campaign_id ,_id:chapter_id });
        console.log(chapter);
        res.status(200).send(chapter[0]);
      } else {
        res.status(400).send("No Campaign Identifier Passed");
      }
    console.log("ok");
    } catch (error) {
      res.status(500).send("Something went Wrong");
    }
  });

  // Show All Chapters of all Campaign
router.get("/api/campaign/every/chapters", auth, async (req, res) => {
 
  try {
    
    if(
        !req.user._id
      ) {
        res.status(400).send({ error: "Invalid Token" });
      }
      
    const user = req.user;
    
    if (user._id) {
      const user_id = user._id; 
      const chapters = await Chapter.find({user_id:user_id});
      res.status(200).send(chapters);
    } else {
      res.status(400).send("Something went Wrong");
    }
  } catch (error) {
    res.status(500).send("Something went Wrong");
  }
});

// Show All Chapters
router.get("/api/campaign/:campaign_id/chapter", auth, async (req, res) => {
  try {
    if (
        !req.user._id &&
        !req.params.campaign_id
      ) {
        res.status(400).send({ error: "Invalid Data" });
      }
    const user = req.user;
    if (user._id) {
      const user_id = user._id;
      const campaign_id = req.params.campaign_id;
      const isCampaignValid = await Campaign.find({ _id: campaign_id , user_id:user_id});
      if(!isCampaignValid){
        res.status(400).send({ error: "Invalid Campaign" });
      }

      const chapters = await Chapter.find({ campaign_id: campaign_id });

      res.status(200).send(chapters);
    } else {
      res.status(400).send("Something went Wrong");
    }
  } catch (error) {
    res.status(500).send("Something went Wrong");
  }
});


// Create Chapter
router.post("/api/campaign/:campaign_id/chapter", auth, async (req, res) => {
  try {
    
    if (
      !req.body.chapter_title ||
      !req.user._id ||
      !req.params.campaign_id
    ) {
      res.status(400).send({ error: "Invalid Data" });
    }

    const user_id = req.user._id;
    const campaign_id = req.params.campaign_id;

    const isCampaignValid = await Campaign.find({_id:campaign_id, user_id:user_id});
    
    if(!isCampaignValid){
        res.status(400).send({ error: "Invalid Campaign" });
    }


    const chapterData = {
        chapter_title: req.body.chapter_title,
        overview: req.body.overview,
        status: req.body.status,
        user_id: req.user._id,
        campaign_id:campaign_id,
      };

      const createdChapter = await new Chapter(chapterData).save();
      

      if (createdChapter) {
        res.status(200).send(createdChapter);
      } else {
        res.status(400).send({ error: "Invalid Data" });
      }

  } catch (error) {
    res.status(500).send("Server Error");
  }
});


// Edit Campaign
router.patch("/api/campaign/:campaign_id/chapter", auth, async (req, res) => {
    try {console.log(req.body.campaign_id);
        if (
          !req.body.campaign_id&&
          !req.body.chapter_title &&
          !req.body.chapter_id &&
          !req.user._id
        ) {
          res.status(400).send({ error: "InValid Data params" });
        }
        const user_id = req.user._id;
        const campaign_id = req.body.campaign_id;
        const chapter_id = req.body.chapter_id;
        const isCampaignValid = await Campaign.find({_id:campaign_id, user_id:user_id});
        if(!isCampaignValid){
            res.status(400).send({ error: "Invalid Campaign" });
        }
        const chapterData = {
          chapter_title: req.body.chapter_title,
          overview: req.body.overview,
          start_date: req.body.start_date,
          status: req.body.status,
        };
        
    
        const editChapter = await Chapter.findByIdAndUpdate(chapter_id, {$set : chapterData }, {new:true});
        
        if (editChapter) {
          res.status(200).send(editChapter);
        } else {
          res.status(400).send({ error: "Invalid Data" });
        }
      } catch (error) {
        res.status(500).send("Server Error");
      }
});


// Delete Campaign
router.delete("/api/campaign/:campaign_id/chapter", auth, async (req, res) => {
    
  try {
    if (!req.params.campaign_id && !req.body._id) {
      res.status(400).send({ error: "InValid Data" });
    }
    const campaign_id = req.body.campaign_id;
    const chapter_id = req.body.chapter_id;

    const isCampaignValid = await Campaign.find({_id:campaign_id});
    if(!isCampaignValid){
        res.status(400).send({ error: "Invalid Campaign" });
    }

    // res.status(200).send(req.body.campaign_id);
    const deleteChapter = await Chapter.findByIdAndDelete(chapter_id);
    console.log(deleteChapter);
    if (deleteChapter) {
      res.status(200).send(deleteChapter);
    } else {
      res.status(400).send({ error: "Invalid Data" });
    }
  } catch (error) {
    res.status(500).send("Server Error");
  }
});






module.exports = router;
