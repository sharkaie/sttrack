import React, { useState } from "react";
import SetTitle from "./common/SetTitle";
import adminServices from '../services/admin';
import CampaignForm from '../components/forms/CampaignForm';

const CampaignAdd = (props) => {
  SetTitle("Add New Campaign");

  const [formData, setFormData] = useState({
    campaign_title: '',
    overview: '',
    start_date: '',
    due_date: '',
  });

  const submitHandler = async (event) =>{
    // console.log('Submiting ...');
    event.preventDefault();
    const response = await adminServices.postNewCampaignService(formData);
    // console.log(response);
    if(response.status === 200){
        // console.log('Campaign created');
        props.history.push('/campaign');
    }else{
        console.log('Campaign creation Fail');
    }
  }

  

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
            <CampaignForm cancelLink={`/campaign`} submitHandler={submitHandler} formData={formData} btnName="Add" btnTheme="warning" formHandler={formHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignAdd;
