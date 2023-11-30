import React, {useState}  from "react";
import { Link } from 'react-router-dom'
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import ReactPlayer from "react-player/youtube";
import services from "../../services/services";
import validator from "validator";

const VideoForm = (props) => {  

  const [videoLength, setVideoLength] = useState();
  const [validate, setValidate] =useState({
    video_title:'',
    youtube_link:''
  });


const handleDuration = (duration) => {
  const hms_duration = services.hms(duration.toFixed(0));

  // console.log("onDuration", hms_duration);
  props.durationHandler(duration);
  setVideoLength(hms_duration);
};

const handleReady = ()=>{
  // console.log('ready')
}

const onChanged = (event)=>{
  const {name, value} = event.target;
  if(name==='video_title' || name==='youtube_link'){
    if(value===''){
      setValidate((pre)=>{
        return {
          ...pre,
          [name]:true
        }
      })
    }else if(name==='youtube_link'&&!validator.isURL(value)){
      setValidate((pre)=>{
        return {
          ...pre,
          [name]:true
        }
      })
    }else{
      setValidate((pre)=>{
        return {
          ...pre,
          [name]:false
        }
      })
    }
    
  }
              
  props.formHandler(event)            
}




  return (
    <form onSubmit={props.submitHandler}>
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          <Input
            type="text"
            label="Video Title"
            id="video_title"
            name="video_title"
            extraClass={validate.video_title===true? 'is-invalid':validate.video_title===false?'is-valid':''}
            value={props.formData.video_title}
            placeholder="Enter Video Title"
            onChanged={onChanged}
            focus={true}
          />

          <TextArea
            label="Overview"
            rows="5"
            name="overview"
            value={props.formData.overview}
            id="overview"
            placeholder="Enter an Overview about your Video (optional)"
            onChanged={onChanged}
          />

          <Input
            type="url"
            label="Youtube Link"
            id="youtube_link"
            name="youtube_link"
            value={props.formData.youtube_link}
            extraClass={validate.youtube_link===true? 'is-invalid':validate.youtube_link===false?'is-valid':''}
            placeholder="Enter Youtube Link"
            onChanged={onChanged}
          />

         
        </div>
        <div className={`col-lg-6 col-sm-12 rounded ${!props.formData.youtube_link ? 'bg-secondary-lighten':''}`} style={{minHeight:'25vh',width:'100%'}}>
        
                {props.formData.youtube_link ? (
                  <>
                  <div className="embed-responsive embed-responsive-16by9">
                  
                  <ReactPlayer 
                    url={props.formData.youtube_link}
                    config={{
                      youtube: {
                        playerVars: { enablejsapi: 1 },
                      },
                    }}
                    height="auto"
                    width="auto"
                    playing={false}
                    onReady={handleReady}
                    onDuration={handleDuration}
                  />
                  
                  </div>
                  <span className="font-13 text-muted float-right">
                    duration : {videoLength}
                  </span>
                  </>

                  
                ) : (
                  ''
                )}
        </div>
      </div>
      <div className="col-lg-12 mt-3 d-flex justify-content-between px-0">
        <Link to={props.cancelLink} type="button" className="btn btn-light">
          Cancel
        </Link>
        <button type="submit" className={`btn btn-${props.btnTheme}`} disabled={props.formData.video_title && props.formData.youtube_link && props.formData.video_duration? false:true} >
          <i className={`mdi mdi-${props.btnIcon}`}></i> {props.btnName}
        </button>
      </div>
      
    </form>
  );
};

export default VideoForm;
