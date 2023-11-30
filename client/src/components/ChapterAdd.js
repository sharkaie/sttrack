import React, { useState } from "react";
import SetTitle from "./common/SetTitle";
import { useParams } from 'react-router-dom'

import adminServices from '../services/admin';
import ChapterForm from '../components/forms/ChapterForm';

const ChapterAdd = (props) => {
  SetTitle("Add New Chapter");


  const {campaign_id} = useParams();

  const [formData, setFormData] = useState({
    chapter_title:'',
    overview:'',
    status:true
  });

  const submitHandler = async (event) =>{
    // console.log('Submiting ...');
    event.preventDefault();
    const response = await adminServices.postNewChapterService(formData, campaign_id);
    // console.log(response);
    if(response.status === 200){
        // console.log('Chapter created');
        props.history.push(`/campaign/${campaign_id}/chapter`);
    }else{
        console.log('Chapter creation Fail');
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
            <ChapterForm submitHandler={submitHandler} cancelLink={`/campaign/${campaign_id}/chapter`} formData={formData} btnName="Add" btnTheme="warning" formHandler={formHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterAdd;
