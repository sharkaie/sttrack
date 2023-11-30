import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';

import SetTitle from "./common/SetTitle";
import adminServices from '../services/admin';
import CampaignForm from '../components/forms/CampaignForm';

const CampaignEdit = (props) => {
  SetTitle("Edit Campaign");


  const {id} = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({    
    campaign_id:id,
    campaign_title: '',
    overview: '',
    start_date: '',
    due_date: '',
    status:'',
  });

  useEffect(()=>{
    const fetchData = async ()=>{
        // You can await here
        
        const response = await adminServices.getCampaignService(id);
        // console.log(response);
        if(response.status === 200){
            // console.log('entered');
            const start_date = new Date(response.data.start_date);
            const due_date = new Date(response.data.due_date);
            // var month = ("0" + (a.getMonth() + 1)).slice(-2); 
            //     var date = ("0" + a.getDate()).slice(-2);
            setFormData({
                campaign_id:response.data._id,
                campaign_title: response.data.campaign_title,
                overview: response.data.overview,
                start_date: `${start_date.getFullYear()}-${("0" + (start_date.getMonth() + 1)).slice(-2)}-${("0" + start_date.getDate()).slice(-2)}`,
                due_date: `${due_date.getFullYear()}-${("0" + (due_date.getMonth() + 1)).slice(-2)}-${("0" + due_date.getDate()).slice(-2)}`,
                status:true
            });
        }else{
            history.push('/login')
        }
    }
    fetchData();
  }, [])

  

  const submitHandler = async (event) =>{
    // console.log('Submiting ...'+ id);
    event.preventDefault();
    const response = await adminServices.editCampaignService(formData);
    // console.log(response);
    if(response.status === 200){
        // console.log('Campaign Edited');
        props.history.push('/campaign');
    }else{
        console.log('Campaign edit Fail');
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
            <CampaignForm cancelLink={`/campaign`} submitHandler={submitHandler} formData={formData} btnName="Save" btnTheme="success" btnIcon="content-save-edit-outline" formHandler={formHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignEdit;
