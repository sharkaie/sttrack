import React, { useState } from 'react'
import TextArea from '../common/TextArea';

const ModulerOverviewForm = (props) => {

    const [videoOverview, setVideoOverview] = useState(props.videoOverview);
    const handleVideoOverview = (event) => {
        const value = event.target.value;
        setVideoOverview(value);
      };

    const handleUpdateOverview = (event)=>{
        event.preventDefault();
        props.handleUpdateOverview(videoOverview);
    }
    return (
        <form onSubmit={handleUpdateOverview}>
                    <TextArea
                      name="video_overview"
                      value={videoOverview}
                      onChanged={handleVideoOverview}
                      rows="3"
                    ></TextArea>
                    <button type="button" onClick={props.handleVideoEnd} className="btn btn-warning px-2 float-left">Watched <i className="uil uil-angle-right"></i></button>
                    <button type="submit" className="btn btn-success px-2 float-right">Save</button>
                    </form>
    )
}

export default ModulerOverviewForm
