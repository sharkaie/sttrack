import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import SetTitle from "./common/SetTitle";
import adminServices from "../services/admin";
import VideoForm from "../components/forms/VideoForm";


const VideoEdit = (props) => {
  SetTitle("Edit Video");

  const { campaign_id, chapter_id, video_id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    campaign_id: campaign_id,
    chapter_id: chapter_id,
    video_id: video_id,
    video_title: "",
    youtube_link: "",
    video_duration:"",
    overview: "",
    watched:"",
    status: "",
  });

  const toggleSwitchHandler = (event)=>{
    console.log('Switch toggle fired', event);
  }
  // const [isvalid, setIsValid] = useState({
  //   video_title:'is-valid',
  //   overview:'is-invalid'
  // });

  useEffect(() => {
    const fetchData = async () => {
      // You can await here

      const response = await adminServices.getChapterService(
        campaign_id,
        chapter_id
      );

      if (response.status === 200) {
        const videoData = response.data.videos.filter((video) => {
          return video._id == video_id;
        });
        // console.log('watchedsasd',videoData[0].watched);
        setFormData({
          campaign_id: campaign_id,
          chapter_id: chapter_id,
          video_id: video_id,
          video_title: videoData[0].video_title,
          overview: videoData[0].video_overview,
          youtube_link: videoData[0].video_link,
          video_duration:'',
          status: true,
        });
      } else {
        history.push("/login");
      }
    };
    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await adminServices.editVideoService(formData);

    if (response.status === 200) {
      props.history.push(
        `/campaign/${campaign_id}/chapter/${chapter_id}/video`
      );
    } else {
      console.log("Video edit Fail");
    }
  };

  const formHandler = (event) => {
    const { name, value } = event.target;
    // console.log(name, value, event);
    setFormData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });

    // const isvalid = 
  };

  const durationHandler = (duration) => {    

    setFormData((preValue) => {
      return {
        ...preValue,
        video_duration: duration,
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
                  btnName="Save"
                  btnTheme="success"
                  btnIcon="content-save-edit-outline"
                  formHandler={formHandler}
                />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEdit;
