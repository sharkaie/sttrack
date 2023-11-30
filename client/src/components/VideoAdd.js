import React, { useEffect, useState } from "react";
import SetTitle from "./common/SetTitle";
import { useParams } from "react-router-dom";
import adminServices from "../services/admin";
import VideoForm from "../components/forms/VideoForm";
import ReactPlayer from "react-player/youtube";


const VideoAdd = (props) => {
  useEffect(()=>{
    SetTitle("Add New Video");
  })

  const { campaign_id, chapter_id } = useParams();

  const [formData, setFormData] = useState({
    chapter_id: chapter_id,
    campaign_id: campaign_id,
    video_title: "",
    video_duration:"",
    overview: "",
    youtube_link: "",
    status: true,
  });

  const submitHandler = async (event) => {
    // console.log("Submiting ...");
    event.preventDefault();
    // console.log(formData);
    const response = await adminServices.postNewVideoService(formData);
    // console.log(response);
    if (response.status === 200) {
      // console.log("Chapter created");
      props.history.push(
        `/campaign/${campaign_id}/chapter/${chapter_id}/video`
      );
    } else {
      console.log("Video creation Fail");
    }
  };

  const durationHandler = (duration) => {    

    setFormData((preValue) => {
      return {
        ...preValue,
        video_duration: duration,
      };
    });
  };

  const formHandler = (event) => {
    const { name, value } = event.target;

    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-body">
            <VideoForm
              submitHandler={submitHandler}
              cancelLink={`/campaign/${campaign_id}/chapter/${chapter_id}/video`}
              formData={formData}
              durationHandler={durationHandler}
              btnName="Add"
              btnTheme="warning"
              formHandler={formHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAdd;
