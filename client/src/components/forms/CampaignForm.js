import React  from "react";
import { Link } from 'react-router-dom'
import Input from "../common/Input";
import TextArea from "../common/TextArea";


const CampaignForm = (props) => {  

  return (
    <form onSubmit={props.submitHandler}>
      <div className="row">
        <div className="col-xl-6">
          <Input
            type="text"
            label="Campaign Title"
            id="campaign_title"
            name="campaign_title"
            value={props.formData.campaign_title}
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
            placeholder="Enter an Overview about your Campaign (optional)"
            onChanged={props.formHandler}
          />
        </div>

        <div className="col-xl-6">
          <Input
            type="date"
            label="Start Date"
            id="start_date"
            name="start_date"
            value={props.formData.start_date}
            placeholder="Select Start Date"
            onChanged={props.formHandler}
          />

          <Input
            type="date"
            label="Due Date"
            id="due_date"
            name="due_date"
            value={props.formData.due_date}
            placeholder="Select Due Date"
            onChanged={props.formHandler}
          />
        </div>
      </div>
      <div className="col-lg-12 mt-3 d-flex justify-content-between px-0">
        <Link to="/campaign" type="button" className="btn btn-light">
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
