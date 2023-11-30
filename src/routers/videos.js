const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Campaign = require("../models/campaigns");
const Chapter = require("../models/chapters");

// Show Single Chapters
// router.get("/api/campaign/:campaign_id/chapter/:chapter_id/video/:video_id", auth, async (req, res) => {
//     try {

//       if (req.user._id&&req.params.campaign_id&&req.params.chapter_id && req.params.video_id) {
//         const user_id= req.user._id;
//         // console.log('ok1');
//         const chapter_id = req.params.chapter_id;
//         const campaign_id = req.params.campaign_id;

//         const chapter = await Chapter.find({ user_id: user_id, campaign_id: campaign_id ,_id:chapter_id });
//         // console.log(chapter);

//         res.status(200).send(chapter[0].videos);
//       } else {
//         res.status(400).send("No Campaign Identifier Passed");
//       }
//     console.log("ok");
//     } catch (error) {
//       res.status(500).send("Something went Wrong");
//     }
//   });

// Show All Videos
// router.get("/api/campaign/:campaign_id/chapter/:chapter_id/video", auth, async (req, res) => {
//   try {
//     if (
//         !req.user._id ||
//         !req.params.campaign_id ||
//         !req.params.chapter_id
//       ) {
//         res.status(400).send({ error: "Invalid Data" });
//       }
//     const user = req.user;
//     if (user._id) {
//       const user_id = user._id;
//       const campaign_id = req.params.campaign_id;
//       const campaign_id = req.params.chapter_id;
//       const isCampaignValid = await Campaign.findById({_id:campaign_id});
//       const currChapter = await Chapter.find({_id:chapter_id, campaign_id:campaign_id, user_id:user_id});

//       if(!isCampaignValid || !currChapter){
//         res.status(400).send({ error: "Invalid Campaign or Chapter" });
//       }

//       const videos = await Chapter.find({ campaign_id: campaign_id });

//       if(videos){
//         console.log(videos.videos);
//         res.status(200).send(videos.videos);
//       }else{
//         res.status(400).send("Something Went Wrong");
//       }

//     } else {
//       res.status(400).send("Something went Wrong");
//     }
//   } catch (error) {
//     res.status(500).send("Something went Wrong");
//   }
// });

// Add New Video
router.post(
  "/api/campaign/:campaign_id/chapter/:chapter_id/video",
  auth,
  async (req, res) => {
    try {
      if (
        !req.body.video_title ||
        !req.body.youtube_link ||
        !req.body.video_duration ||
        !req.user._id ||
        !req.params.campaign_id ||
        !req.params.chapter_id
      ) {
        res.status(400).send({ error: "Invalid Data1" });
      }
      console.log("ok1");

      const user_id = req.user._id;
      const campaign_id = req.params.campaign_id;
      const chapter_id = req.body.chapter_id;
      console.log("ok2");
      const isCampaignValid = await Campaign.findById({ _id: campaign_id });
      const currChapter = await Chapter.find({
        _id: chapter_id,
        campaign_id: campaign_id,
        user_id: user_id,
      });
      let updatedChapter = currChapter[0];
      if (!isCampaignValid || !currChapter) {
        res.status(400).send({ error: "Invalid Campaign or Chapter" });
      }
      console.log("ok3");

      // thinking about Many updates objects algorithm
      // for multiple saving of element send data in an array  from podt react and here use map loop and use push method to save them one by one

      //console.log("ok1");
      const videoData = {
        video_title: req.body.video_title,
        video_overview: req.body.overview,
        video_link: req.body.youtube_link,
        video_duration: req.body.video_duration,
        watched: req.body.watched,
        status: req.body.status,
      };
      //console.log("ok2");
      console.log(videoData);
      console.log("ok4");
      updatedChapter.videos.push(videoData);
      console.log(updatedChapter);
      const latestChapter = await updatedChapter.save();
      console.log("ok5");
      if (latestChapter) {
        res.status(200).send(latestChapter);
      } else {
        res.status(400).send({ error: "Invalid Data3" });
      }
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// Edit Videos
router.patch(
  "/api/campaign/:campaign_id/chapter/:chapter_id/video",
  auth,
  async (req, res) => {
    try {
      if (
        !req.params.campaign_id ||
        !req.body.video_id ||
        !req.params.chapter_id ||
        !req.user._id
      ) {
        res.status(400).send({ error: "Invalid Data params" });
      }

      const user_id = req.user._id;
      const campaign_id = req.body.campaign_id;
      const chapter_id = req.body.chapter_id;
      const video_id = req.body.video_id;

      const isCampaignValid = await Campaign.findById(campaign_id);

      const currChapter = await Chapter.find({
        _id: chapter_id,
        campaign_id: campaign_id,
        user_id: user_id,
      });
      if (!isCampaignValid || !currChapter) {
        res.status(400).send({ error: "Invalid Campaign or Chapter" });
      }

      const updObj = req.body.json ? req.body.json : {
        "videos.$.video_title": req.body.video_title,
        "videos.$.video_overview": req.body.overview,
        "videos.$.video_link": req.body.youtube_link,
        "videos.$.video_duration": req.body.video_duration,
        "videos.$.watched": req.body.watched,
        "videos.$.status": req.body.status,
      };
      const editChapter = await Chapter.findOneAndUpdate(
        { _id: chapter_id, "videos._id": video_id },
        {
          $set: updObj,
        },
        { new: true }
      );

      if (editChapter) {
        res.status(200).send(editChapter);
      } else {
        res.status(400).send({ error: "Invalid Data" });
      }
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

// update specific

// Delete Campaign
router.delete(
  "/api/campaign/:campaign_id/chapter/:chapter_id/video",
  auth,
  async (req, res) => {
    try {
      if (
        !req.params.campaign_id ||
        !req.body.video_id ||
        !req.body.chapter_id
      ) {
        res.status(400).send({ error: "Invalid Data" });
      }
      // res.status(200).send("ok");

      const campaign_id = req.body.campaign_id;
      const chapter_id = req.body.chapter_id;
      const video_id = req.body.video_id;

      const isCampaignValid = await Campaign.findById(campaign_id);
      const chapter = await Chapter.find({
        _id: chapter_id,
        campaign_id: campaign_id,
      });

      let videoToDeleteChapter = chapter[0];
      console.log(videoToDeleteChapter);
      if (!isCampaignValid || !videoToDeleteChapter) {
        res.status(400).send({ error: "Invalid Campaign or video" });
      }

      videoToDeleteChapter.videos = videoToDeleteChapter.videos.filter(
        (video) => {
          return video._id != video_id;
        }
      );

      const deletedVideo = await videoToDeleteChapter.save();

      console.log(deletedVideo);
      if (deletedVideo) {
        res.status(200).send(deletedVideo);
      } else {
        res.status(400).send({ error: "Invalid Data" });
      }
    } catch (error) {
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
