import React  from "react";
import { Link } from 'react-router-dom'
import Input from "../common/Input";
import TextArea from "../common/TextArea";


const CampaignForm = (props) => {  

  return (
    <form onSubmit={props.submitHandler}>
      <div className="row">
        <div className="col-xl-12">
          <Input
            type="text"
            label="Chapter Title"
            id="chapter_title"
            name="chapter_title"
            value={props.formData.chapter_title}
            placeholder="Enter Campaign Name"
            onChanged={props.formHandler}
            focus={true}
          />

          <TextArea
            label="Overview"
            rows="5"
            name="overview"
            value={props.formData.overview}
            id="overview"
            placeholder="Enter an Overview about your Chapter (optional)"
            onChanged={props.formHandler}
          />
        </div>
      </div>
      <div className="col-lg-12 mt-3 d-flex justify-content-between px-0">
        <Link to={props.cancelLink} type="button" className="btn btn-light">
          Cancel
        </Link>
        <button type="submit" className={`btn btn-${props.btnTheme}`}>
          <i className={`mdi mdi-${props.btnIcon}`}></i> {props.btnName}
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;
