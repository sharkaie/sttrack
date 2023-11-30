const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Campaign = require("../models/campaigns");
const Chapter = require("../models/chapters");
const User = require("../models/users");

router.get("/api/study-moduler", auth, async (req, res) => {
  if (!req.user._id) {
    res.status(403).send("Unautorized");
  }
  user_id = req.user._id;
  const campaigns = await Campaign.find({ user_id: user_id, status: true });
  const chapters = await Chapter.find({ user_id: user_id, status: true });

  res.status(200).send({
    user_id: user_id,
    campaigns: campaigns,
    chapters: chapters,
  });
});

// Dashboard
router.get("/api/dashboard", auth, async (req, res) => {
  const user_id = req.user._id;
  const campaigns = await Campaign.find({ user_id: user_id });
  const chapters = await Chapter.find({ user_id: user_id, status: true });
  const today_date = new Date();
  const currDate = `${today_date.getFullYear()}-${today_date.getMonth()}-${today_date.getDate()}`;
  let totalVideosDaily = 0;
  let totalChaptersCompleted = 0;
  let totalCampaignsCompleted = 0;
  const videos = [];

  chapters.map((chapter) => {
    chapter.videos.map((video) => {
      videos.push(video);
    });
  });

  const watched = videos.filter((video) => {
    return video.watched === true;
  });

  const todayWatched = videos.filter((video) => {
    let watchedAt = new Date(video.watched_at);
    watchedAt = `${watchedAt.getFullYear()}-${watchedAt.getMonth()}-${watchedAt.getDate()}`;
    return watchedAt === currDate;
  });

  const videoUnwatched = videos.length - watched.length;

  campaigns.map((campaign) => {
    const start_date = new Date(campaign.start_date);
    const due_date = new Date(campaign.due_date);
    const todaysDate = new Date();
    const daysLeft = Math.floor(
      (due_date.getTime() - todaysDate.getTime()) / (1000 * 3600 * 24)
    );

    if (start_date < todaysDate && todaysDate < due_date) {
      let campaignChapters = chapters.filter((chapter) => {
        return chapter.campaign_id == campaign._id;
      });

      // total chapters completed
      const chaptersCompleted = chapters.filter((chapter) => {
        // console.log('chapter', chapter);

        const chapterCampaignId = chapter.campaign_id;
        const campaignId = campaign._id;

        if (chapterCampaignId == campaignId) {
          if (chapter.videos.length > 0) {
            const watchedVideos = chapter.videos.filter((video) => {
              return video.watched === true;
            });

            if (watchedVideos.length === chapter.videos.length) {
              return chapter;
            }
          }
        }
      });

      if (chaptersCompleted.length === campaignChapters.length) {
        totalCampaignsCompleted = totalCampaignsCompleted + 1;
      }

      totalChaptersCompleted =
        totalChaptersCompleted + chaptersCompleted.length;

      let thisCampaignTotalVideos = 0;
      //   console.log("campaignChapters", campaignChapters);
      campaignChapters.map((chapter) => {
        const unwatchedTodayVideos = chapter.videos.filter((video) => {
          if (video.watched) {
            let watchedAt = new Date(video.watched_at);
            const wdate = `${watchedAt.getFullYear()}-${watchedAt.getMonth()}-${watchedAt.getDate()}`;

            if (wdate === currDate) {
              return video;
            }
          } else {
            return video;
          }
        });

        thisCampaignTotalVideos =
          thisCampaignTotalVideos + unwatchedTodayVideos.length;
      });

      if (thisCampaignTotalVideos > 0) {
        const videosPerDay =
          thisCampaignTotalVideos % daysLeft === 0
            ? Math.floor(thisCampaignTotalVideos / daysLeft)
            : Math.floor(thisCampaignTotalVideos / daysLeft) + 1;

        totalVideosDaily = totalVideosDaily + videosPerDay;
      }
    }
  });

  res.status(200).send({
    campaigns: {
      total: campaigns.length,
      done: totalCampaignsCompleted,
    },
    chapters: {
      total: chapters.length,
      done: totalChaptersCompleted,
    },
    videos: {
      total: videos.length,
      watched: watched.length,
      unwatchedVideo: videoUnwatched,
      watchedToday: todayWatched.length,
      toWatchToday: totalVideosDaily,
    },
    message: "Welcome to Dashboard",
  });
});

module.exports = router;
