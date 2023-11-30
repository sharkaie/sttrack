import React, { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';

import SetTitle from "./common/SetTitle";
import adminServices from '../services/admin';
import ChapterForm from '../components/forms/ChapterForm';


const ChapterEdit = (props) => {
  SetTitle("Edit Chapter");

  const {campaign_id, chapter_id} = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({    
    campaign_id:campaign_id,
    chapter_id:chapter_id,
    chapter_title: '',
    overview: '',
    status:'',
  });

  useEffect(()=>{
    const fetchData = async ()=>{
        // You can await here
        
        
        const response = await adminServices.getChapterService(campaign_id, chapter_id);
        
        if(response.status === 200){
            
            setFormData({
                campaign_id:response.data._id,
                chapter_id:chapter_id,
                chapter_title: response.data.chapter_title,
                overview: response.data.overview,
                status:true
            });
        // console.log("Fetch Dtat");
        }else{
          
            history.push('/login')
        }
    }
    fetchData();
  }, [])

  

  const submitHandler = async (event) =>{
    
    event.preventDefault();
    
    const response = await adminServices.editChapterService(formData, campaign_id);
    
    if(response.status === 200){
        
        props.history.push(`/campaign/${campaign_id}/chapter`);
    }else{
        console.log('Chapter edit Fail');
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
            <ChapterForm submitHandler={submitHandler} cancelLink={`/campaign/${campaign_id}/chapter`} formData={formData} btnName="Save" btnTheme="success" btnIcon="content-save-edit-outline" formHandler={formHandler} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterEdit;
