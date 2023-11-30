import React, { useEffect, useState } from "react";
import admin from "../services/admin";
import services from "../services/services";
import DataCard from "./common/DataCard";
import DataCardHeader from "./common/DataCardHeader";
import Tdata from "./common/Tdata";
import TileTable from "./common/TileTable";
import ReactPlayer from "react-player/youtube";
import TextArea from "../components/common/TextArea";
import "../css/custom.css";
import SetTitle from "./common/SetTitle";
import CurrTime from "./common/CurrTime";
import TimeLeft from "./common/TimeLeft";
import CurrVideoTimeLeft from "./common/CurrVideoTimeLeft";

const StudyModuler = () => {
  SetTitle("Study Modular");
  // console.log("Moduler Started");
  //INitalize States

  // const [apiData, setApiData] = useState();
  const [todaysVideos, setTodaysVideos] = useState();
  const [nowPlaying, setNowPlaying] = useState();
  const [autoPlay, setAutoPlay] = useState(false);
  const [info, setInfo] = useState({
    totalVideos:0,
    videosWatched:0,
  })
  const [videoOverview, setVideoOverview] = useState();
  const [preload, setPreload] = useState({
    saveBtn:false,
    watchedBtn:false,
  })

  const current_time = new Date();
  useEffect(() => {
    const setDataApi = async () => {
      // console.log("effect running...fetch api");
      const data = await services.videoFetchChunker();
      // setApiData(data.responseData);
      if(data !== 'null'){
        // console.log('function success', data);
        
        
        setInfo(data.info)
        // const unwatchedVideos = services.getUnwatchedVideos(data.finalChunk)
        let tempSet = 0;
        let nowPlayingVideo = {};
        data.chunkedVideos.map((day, dIndex)=>{
          day.map((video, vIndex)=>{
            if(!video.watched && tempSet === 0){
              video.dayIndex = dIndex;
              video.videoIndex = vIndex;
              nowPlayingVideo = video;
              tempSet = 1;
            }
          })
        })
        // console.log('nowPlayingVideo',nowPlayingVideo);
        setTodaysVideos(data.chunkedVideos);
        // console.log('*******finalChunk******',data.finalChunk);
        // // data.finalChunk[2][2]=[];
        // console.log(data.finalChunk[2][0]);
        
        if(tempSet===1){
          setNowPlaying(nowPlayingVideo);
         services.scrollToView(`${nowPlayingVideo.dayIndex}list${nowPlayingVideo.videoIndex}`);
         setVideoOverview(nowPlayingVideo.video_overview);

        }else if(data.chunkedVideos[0][0]){
          const videoToWatch = data.chunkedVideos[0][0];
          videoToWatch.dayIndex = 0;
          videoToWatch.videoIndex = 0;
          setNowPlaying(videoToWatch);
         services.scrollToView(`${videoToWatch.dayIndex}list${videoToWatch.videoIndex}`);
         setVideoOverview(videoToWatch.video_overview);
        }
        

        
      }
   
    };

    setDataApi();
  }, []);
 

  const handleVideoPlay = (video, dayIndex, videoIndex) => {
    // console.log("setting the video to play");
    video.dayIndex = dayIndex;
    video.videoIndex = videoIndex;
    setNowPlaying(video);
    setVideoOverview(video.video_overview);
    // console.log("video Setted");
  };

  const playNextVideo = ()=>{
    // console.log('Play next video running...');
    const {dayIndex,  videoIndex} = nowPlaying;

    let temp1, temp2, found = 0;
    todaysVideos.map((dayVideos,dIndex)=>{
      dayVideos.map((video, vIndex)=>{
        if(temp1!==1){
          if(dIndex === dayIndex && vIndex === videoIndex){
            // console.log("Video Found");
            temp1 = 1;
            // console.log("updated temp1 -> 1");
          }
        }else if(temp2!==1){
          // console.log("next video is ...");
          // console.log(video);
          temp2 = 1;
          video.dayIndex = dIndex;
          video.videoIndex = vIndex;
          setAutoPlay(true);
          setNowPlaying(video);
          setVideoOverview(video.video_overview)
          found = 1;
          // console.log("updated temp2 -> 1");
        }
      })
    })
    if(found !==1){
      // setNowPlaying('');
      
    }
    setPreload((prevalue)=>{
      return {
        ...prevalue,
        watchedBtn:false
      }
    })
  }

  const toggleAutoPlay = ()=>{
    setAutoPlay((prevalue)=>{
      return !prevalue;
    })
  }

  const videoWatched = async ()=>{
    const updObj = {
      "videos.$.watched": true,
      "videos.$.watched_at": new Date(),
    }

    setInfo((prevalue)=>{
      return {
        ...prevalue,
      videosWatch:info.videosWatch+1
      }
    })

    setTodaysVideos((preArray)=>{
      preArray[nowPlaying.dayIndex][nowPlaying.videoIndex].watched = true;
      return preArray;
    })
    
    
    const response = await admin.editVideoService({
      json:updObj,
      video_id:nowPlaying._id,
      chapter_id:nowPlaying.chapter_id,
      campaign_id:nowPlaying.campaign_id

    });
    return response.status;
  }


  const handleVideoEnd = async()=>{
    // console.log("video Ended");
    setPreload((prevalue)=>{
      return {
        ...prevalue,
        watchedBtn:true
      }
    })
    const watchedUpdateStatus = await videoWatched();
    // console.log(watchedUpdateStatus);
    if(watchedUpdateStatus === 200){
      playNextVideo();
    }else{
      console.log("system error");
    }
    
    // const videos = todaysVideos.map((dayVideo, dayIndex)=>{
    //   dayVideo.map((video, videoIndex)=>{
    //     video,
    //   })
    // })
    // getVideoFromIndex({day:nowPlaying.dayIndex,video:nowPlaying.videoIndex+1})
  }

  const handleVideoOverview = (event) => {
    const value = event.target.value;
    setVideoOverview(value);
  };

  const handleUpdateOverview = async (event) => {
    event.preventDefault();
    setPreload((prevalue)=>{
      return {
        ...prevalue,
        saveBtn:true
      }
    })
    const updObj = {
      "videos.$.video_overview": videoOverview
    }
    const response = await admin.editVideoService({
      json:updObj,
      video_id:nowPlaying._id,
      chapter_id:nowPlaying.chapter_id,
      campaign_id:nowPlaying.campaign_id

    });

    if (response.status === 200) {
      setPreload((prevalue)=>{
        return {
          ...prevalue,
          saveBtn:false,
        }
      })
    }else{
      setPreload((prevalue)=>{
        return {
          ...prevalue,
          saveBtn:true,
        }
      })
    }
    // console.log("submit detected");
  }
  // console.log('lobby running');
  

 
  return (
    <>
      <div className="row">
        <div className="col-xl-8 col-lg-7">
          <DataCard
            cardClassName="bg-secondary-lighten p-0"
            cardBodyClassName="p-0"
            styles={{ minHeight: "25vh",backgroundSize:'cover',backgroundImage:`url(data:image/gif;base64,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)` }}
          >
            {todaysVideos && nowPlaying ? (
              <div className="embed-responsive embed-responsive-16by9">
                <ReactPlayer
                  url={nowPlaying.video_link}
                  controls={true}
                  config={{
                    youtube: {
                      playerVars: { enablejsapi: 1 },
                    },
                  }}
                  height="100%"
                  width="100%"
                  playing={autoPlay}
                  onEnded={handleVideoEnd}
                />
              </div>
            ) : (
              ""
            )}
          </DataCard>

          
        </div>

        <div className="col-xl-4 col-lg-5 col-md-12">
        <DataCard cardClassName="d-block" styles={{ minHeight: "25vh" }}>
            {nowPlaying ? (
              <>
                <DataCardHeader defaultHeader="false">
                  <h4 className="text-dark text-truncate text-uppercase">
                    {nowPlaying.video_title}
                  </h4>
                </DataCardHeader>

                <div className="row">
                  <div className="col-6">
                    <p className="mt-2 mb-1 text-muted font-weight-bold font-12 text-uppercase">
                      Duration
                    </p>
                    <div className="media">
                      <i className="mdi mdi-timer-outline mr-1"></i>
                      <div className="media-body">
                        <h5 className="mt-1 font-14">
                          {services.hms(nowPlaying.video_duration)}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <span className="text-muted float-right">
                      {nowPlaying.campaign_title}
                      <i className="uil uil-angle-double-right text-dark"></i>
                      {nowPlaying.chapter_title}
                    </span>
                  </div>
                  <div className='col-12'>
                  <h5 >Overview :</h5>
                  <form onSubmit={handleUpdateOverview}>
                    <TextArea
                      name="video_overview"
                      value={videoOverview}
                      onChanged={handleVideoOverview}
                      rows="3"
                    ></TextArea>
                    <button type="button" onClick={handleVideoEnd} className="btn btn-warning px-2 float-left" disabled={preload.watchedBtn} >
                    {preload.watchedBtn?
                      <>
                        <span className="spinner-border spinner-border-sm mr-1" role="status" ></span>{'Loading...'}
                        </>
                      :
                      <>Watched<i className="uil uil-angle-right"></i></>
                      }</button>
                    <button type="submit" className="btn btn-success px-2 float-right" disabled={preload.saveBtn} >
                      {preload.saveBtn?
                      <>
                        <span className="spinner-border spinner-border-sm mr-1" role="status" ></span>{'Saving...'}
                        </>
                      :
                      'Save'
                      }
                    </button>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </DataCard>
        </div>
        <div className="col-xl-7 col-lg-6">
          <DataCard cardClassName="card">
          <DataCardHeader defaultHeader="false" >
          <h4 className="header-title my-auto">Todays Videos</h4>
          <span className="float-right d-flex align-items-center">
            <input type="checkbox" id="autoplaySwitch" defaultChecked={autoPlay} onChange={toggleAutoPlay} data-switch="secondary"/>
              <label style={{marginBottom:'auto',marginTop:'auto'}} htmlFor="autoplaySwitch" data-on-label="on" data-off-label="off"></label>
                
            </span></DataCardHeader>            

            
            <TileTable divStyle={{ height: "30vh", overflowY: "auto" }}>
              {todaysVideos && nowPlaying
                ? todaysVideos.map((videoArray, index) => {
                  return <React.Fragment key={"ars"+index}>
                    {index===0?null:<tr><Tdata>{`Day ${index+1}`}</Tdata></tr>}
                    {videoArray.length>0 ? videoArray.map((video, vindex) => {
                      return <tr
                          key={vindex}
                          id={index+'list'+vindex}
                          className={`video-tile ${
                            nowPlaying._id === video._id ? "video-active" : ""
                          }`}
                          onClick={() => {
                            handleVideoPlay(video,index,vindex);
                          }}
                          role="button"
                        >
                        <Tdata className={`hovered-dark text-center ${nowPlaying._id === video._id ? 'iconbg-dark-active':''}`} width='1%'>
                        <span><i className="uil uil-play"></i></span></Tdata>
                          <Tdata width='1%'>
                          <span className="d-flex">
                          <img
                                className="rounded"
                                src={services.getVideoThumbnail(
                                  video.video_link,
                                  "medium"
                                )}
                                height="50"
                                alt="videoThumb"
                              />
                          </span>
                          
                          <span className={` badge badge-info-lighten mt-1`}>
                              {services.hms(video.video_duration)}
                            </span>
                          </Tdata>
                          
                          <Tdata width={'100%'}><h5 className="font-14 my-1 mx-auto">
                              <a className="text-body text-wrap ">
                                {video.video_title}
                              </a>
                            </h5>
                            <span className="text-muted font-13">
                              {video.chapter_title}
                            </span></Tdata>
                            <Tdata width={'1%'}>
                          <span className={` badge badge-${video.watched?'success':'danger'}-lighten mt-1`}>
                              {video.watched?'watched':'unwatched'}
                            </span>
                          </Tdata>
                          <Tdata width={'1%'}><span className="text-muted font-13">Campaign</span>
                            <h5 className="font-14 mt-1 font-weight-normal">
                              {video.campaign_title}
                            </h5></Tdata>
                        </tr>
                    }):''}</React.Fragment>
                    
                  })
                : <tr><Tdata>No Video Found</Tdata></tr>}
                </TileTable>;
          </DataCard>
        </div>

        <div className="col-xl-5 col-lg-6">
          <div className="row">
            <div className="col-lg-6">
              <div className="card widget-flat">
                <div className="card-body">
                  <div className="float-right">
                    <i className="uil uil-play bg-success-lighten widget-icon text-dark"></i>
                  </div>
                  <h5
                    className="text-muted font-weight-normal mt-0"
                    title="Number of Customers"
                  >
                    Videos Watch
                  </h5>
                  <h3 className="mt-3 mb-3">
                  {todaysVideos?
                    `${info.videosWatched}/${info.totalVideos}`
                  :
                    ''
                  }
                  </h3>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card widget-flat">
                <div className="card-body">
                  <div className="float-right">
                    <i className="mdi mdi-timer-outline widget-icon bg-danger-lighten text-dark"></i>
                  </div>
                  <h5
                    className="text-muted font-weight-normal mt-0"
                    title="Number of Orders"
                  >
                    Day Ends In
                  </h5>
                  <h3 className="mt-3 mb-3">{nowPlaying?<TimeLeft/>:''}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card widget-flat">
                <div className="card-body">
                  <div className="float-right">
                    <i className="mdi mdi-timer-outline widget-icon bg-info-lighten text-dark"></i>
                  </div>
                  <h5
                    className="text-muted font-weight-normal mt-0"
                    title="Number of Orders"
                  >
                    Campaign Time Left
                  </h5>
                  <h3 className="mt-3 mb-3">{nowPlaying?<CurrVideoTimeLeft due_date={nowPlaying.campaign_due_date}/>:''}</h3>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card widget-flat">
                <div className="card-body">
                  <div className="float-right">
                    <i className={`uil uil-${current_time.getHours()>=18 || current_time.getHours()<6?'moon bg-dark-lighten  ':'sun bg-warning-lighten'} widget-icon text-dark`}></i>
                  </div>
                  <h5
                    className="text-muted font-weight-normal mt-0"
                    title="Number of Orders"
                  >
                    Current Time
                  </h5>
                  <h3 className="mt-3 mb-3">{nowPlaying?<CurrTime/>:''}</h3>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default StudyModuler;
