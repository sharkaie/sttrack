// import axios from "axios";
import admin from "./admin";

import { useState } from "react";

// no. of videos are watched from given videos
const no_videos_watched = (videos) => {
  //console.log(JSON.stringify(videos));
  const watched_videos = videos.filter((video) => {
    return video.watched === true;
  });
  //console.log(JSON.stringify(watched_videos.length));
  return watched_videos.length;
};

// no chapters in the campaign
const no_chapters = (chapters, campaign_id) => {
  if (chapters && campaign_id) {
    const campaignChapters = chapters.filter((chapter) => {
      return chapter.campaign_id === campaign_id;
    });
    return campaignChapters.length;
  } else {
    return 0;
  }
};

// Youtube Video Thumbnail Src link genrator
const getVideoThumbnail = (url, quality) => {
  if (url) {
    var video_id, thumbnail, result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      video_id = result.pop();
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      video_id = result.pop();
    }

    if (video_id) {
      if (typeof quality == "undefined") {
        quality = "high";
      }

      var quality_key = "maxresdefault"; // Max quality
      if (quality == "low") {
        quality_key = "sddefault";
      } else if (quality == "medium") {
        quality_key = "mqdefault";
      } else if (quality == "high") {
        quality_key = "hqdefault";
      }

      var thumbnail =
        "https://img.youtube.com/vi/" + video_id + "/" + quality_key + ".jpg";
      return thumbnail;
    }
  }
  return false;
};

const chunkArray = (myArray, chunk_size) => {
  let index = 0;
  let arrayLength = myArray.length;
  let tempArray = [];

  for (index = 0; index < arrayLength; index += chunk_size) {
    const myChunk = myArray.slice(index, index + chunk_size);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
};

const todaysVideos = (campaignsData, chaptersData) => {
  let totalNosOfVideosDaily = 0;
  let videosToWatch = [];
  campaignsData.map((campaign, index) => {
    // console.log(`Campaign : ${index + 1}`);
    const due_date = new Date(campaign.due_date);
    const today_date = new Date();
    const daysLeft = Math.floor(
      (due_date.getTime() - today_date.getTime()) / (1000 * 3600 * 24)
    );

    // console.log("remain " +daysLeft);

    const campaignChapters = chaptersData.filter((chapter, index) => {
      return chapter.campaign_id === campaign._id;
    });

    let totalVideos = 0;

    campaignChapters.map((chapter, index) => {
      totalVideos = totalVideos + chapter.videos.length;
      chapter.videos.map((video, index) => {
        video.chapter_id = chapter._id;
        video.chapter_title = chapter.chapter_title;
        video.campaign_id = campaign._id;
        video.campaign_title = campaign.campaign_title;
        video.campaign_due_date = campaign.due_date;

        videosToWatch.push(video);
        // console.log(chapter.videos.length);
      });
    });

    const perDayVideos =
      totalVideos % daysLeft === 0
        ? Math.floor(totalVideos / daysLeft)
        : Math.floor(totalVideos / daysLeft) + 1;

    // let videosToWatch = [];

    // console.log(`Total days left = ${daysLeft}`);
    // console.log(`Total videos = ${totalVideos}`);
    // console.log(`Videos/day = ${perDayVideos}`);
    totalNosOfVideosDaily = totalNosOfVideosDaily + perDayVideos;
  });
  // console.log("**********");
  // console.log("videos to watch daily = " + totalNosOfVideosDaily);
  const chunkedVideos = chunkArray(videosToWatch, totalNosOfVideosDaily);

  // console.log(chunkedVideos);

  // console.log("**********");
  return chunkedVideos;
};

const getTimeRemaining = (endtime) => {
  let enddate = new Date(endtime);
  enddate.setHours(24);
  enddate.setMinutes(0);
  enddate.setSeconds(0);
  enddate.setMilliseconds(0);
  let difference = enddate - new Date();
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: ("0"+Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(-2),
      minutes: ("0"+Math.floor((difference / 1000 / 60) % 60)).slice(-2),
      seconds: ("0"+Math.floor((difference / 1000) % 60)).slice(-2),
    };
  }
  return timeLeft;
};

const dateTimeToDate = (date) => {
  const nowDate = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
    -2
  )}-${("0" + date.getDate()).slice(-2)}`;
  return nowDate;
};

const videoFetchChunker = async () => {
  const response = await admin.getModulerService();
  // // setApiData(response.data);
  let totalVideosDaily = 0;
  let allVideos = [];
  let allVideosExceptFromToday = [];
  let videosWatched = 0;
  let videosLeft = 0;

  // console.log(response.data);

  const chapterNos = response.data.chapters.length;
  const campaignNos = response.data.campaigns.length;
  // console.log("campaigns", campaignNos);
  // console.log("chapters", chapterNos);
  const today_date = new Date();
  if (campaignNos > 0 && chapterNos > 0) {
    // maping campaigns
    response.data.campaigns.map((campaign) => {
      const start_date = new Date(campaign.start_date);
      const due_date = new Date(campaign.due_date);
      
      const daysLeft = Math.floor(
        (due_date.getTime() - today_date.getTime()) / (1000 * 3600 * 24)
      );
      // console.log("remain days", daysLeft);
      // console.log("start date", start_date);
      // console.log("due date", due_date);

      // check if campaign is started or ended
      if (start_date < today_date && today_date < due_date) {
        // console.log("videos campaign available");
        let currCampaignChapters = response.data.chapters.filter(
          (chapter) => {
            return chapter.campaign_id === campaign._id;
          }
        );
        
        let thisCampaignTotalVideos = 0;
        
        // chapter
        currCampaignChapters.map((chapter) => {
          const unwatchedTodayVideos = chapter.videos.filter((video)=>{
            if(video.watched){
            let watchedAt = new Date(video.watched_at);
              const wdate = `${watchedAt.getDate()}-${watchedAt.getMonth()}-${watchedAt.getFullYear()}`;
              const tdate = `${today_date.getDate()}-${today_date.getMonth()}-${today_date.getFullYear()}`;
              if(wdate === tdate){
                return video;
              }
            }else{
              return video;
            }
          })
          // console.log('unwatched Today videos', unwatchedTodayVideos.length);
          thisCampaignTotalVideos = thisCampaignTotalVideos + unwatchedTodayVideos.length;
          // console.log(
          //   "total videos",
          //   chapter.chapter_title,
          //   chapter.overview,
          //   chapter.videos.length
          // );

          chapter.videos.map((video) => {
            video.chapter_id = chapter._id;
            video.chapter_title = chapter.chapter_title;
            video.campaign_id = campaign._id;
            video.campaign_title = campaign.campaign_title;
            video.campaign_due_date = due_date;
            allVideos.push(video);
            if (video.watched) {
              let watchedAt = new Date(video.watched_at);
              const wdate = `${watchedAt.getDate()}-${watchedAt.getMonth()}-${watchedAt.getFullYear()}`;
              const tdate = `${today_date.getDate()}-${today_date.getMonth()}-${today_date.getFullYear()}`;
              if(tdate===wdate){
                allVideosExceptFromToday.push(video)
                
              }
              videosWatched = videosWatched + 1;
            } else {
              allVideosExceptFromToday.push(video)
              videosLeft = videosLeft + 1;
            }
          });
        });
        // console.log('total campaign videos',thisCampaignTotalVideos);
        if(thisCampaignTotalVideos>0){
          const videosPerDay =
          thisCampaignTotalVideos % daysLeft === 0
            ? Math.floor(thisCampaignTotalVideos / daysLeft)
            : Math.floor(thisCampaignTotalVideos / daysLeft) + 1;

          totalVideosDaily = totalVideosDaily + videosPerDay;
  
          // console.log('Videos per Day = ', videosPerDay);
        }
       
      } else {
        console.log("videos campaign unavailable");
      }
      // console.log("******************");
    });

  } else {
    // console.log('null was');
    return "null";
  }


  const overallVideos = videosLeft + videosWatched;

  


  // console.log('Total Videos per Day = ', totalVideosDaily);
  // console.log("Total Videos", overallVideos);
  // console.log("Left Videos", videosLeft);
  // console.log("All Videos Array", allVideos);
  // console.log("Videos Watched", videosWatched);
  

  if (overallVideos !== 0) {
    // let finalChunk = [];
    
    let chunkedVideos = chunkArray(allVideosExceptFromToday, totalVideosDaily);
    // chunkedVideos.map((dayArray)=>{
    //   let tempArray = [];
    //   dayArray.map((video)=>{
        
        

    //     if(!video.watched){
    //       tempArray.push(video);
    //     }else if(video.watched_at){
    //       let watchedAt = new Date(video.watched_at);
    //       console.log('watchedAt',watchedAt);
    //       const wdate = `${watchedAt.getDate()}-${watchedAt.getMonth()}-${watchedAt.getFullYear()}`;
    //       const tdate = `${today_date.getDate()}-${today_date.getMonth()}-${today_date.getFullYear()}`;
    //       if(tdate===wdate){
    //         console.log('wtched todaywatchedAt',watchedAt);
    //         tempArray.push(video);
    //       }
          
    //     }
    //   })
    //   if(tempArray.length>0){
    //     finalChunk.push(tempArray);
    //   }
      
    // })
    // console.log('final Chunk', finalChunk);
    // console.log('chunked Videos = ', chunkedVideos);
    
    // console.log("Videos were found");
    return {
      unChunkedVideos:allVideos,
      chunkedVideos: chunkedVideos,
      // finalChunk:finalChunk,
      info: {
        totalVideos: overallVideos,
        videosWatched: videosWatched,
      },
      responseData: response.data,
    };


  } else {

    // console.log("No videos Found");
    return 'null'

  }

};

const getUnwatchedVideos = (videos)=>{
  const unwatchedVideos = videos.filter((video)=>{
    
    return video.watched!==true;
  })
  return {unwatchedVideos}
}

const hms = (seconds) => {
  seconds = Number(seconds);
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);
  let s = Math.floor((seconds % 3600) % 60);

  h = h > 0 ? h : 0;
  m = m > 0 ? ("0"+ m).slice(-2) : 0;
  s = s > 0 ? ("0"+ s).slice(-2) : 0;

  return h + "h " + m + "min " + s + "s";
};

const scrollToView = (id)=>{
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
  });
}

const functions = {
  no_videos_watched,
  no_chapters,
  getVideoThumbnail,
  todaysVideos,
  getTimeRemaining,
  videoFetchChunker,
  getUnwatchedVideos,
  hms,
  dateTimeToDate,
  scrollToView
};

export default functions;
