import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SetTitle from "./common/SetTitle";
import { useHistory } from "react-router-dom";
import adminServices from "../services/admin";
import FeaturedTable from "./common/FeaturedTable";
import TileTable from "./common/TileTable";
// import Pagination from "./common/Pagination";
import Trow from "./common/Trow";
import Tdata from "./common/Tdata";
import services from "../services/services";
import DataCardHeader from "./common/DataCardHeader";

const Campaign = () => {
  SetTitle("My Study Campaigns");

  const [campaignsData, setCampaignsData] = useState("");
  const [chaptersData, setChaptersData] = useState("");

  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      const response = await adminServices.getAllCampaignService();
      const chapter_response = await adminServices.getEveryChapterService();

      if (response.status === 200) {
        // console.log("api loaded succesfully");
        setCampaignsData(response.data);
        setChaptersData(chapter_response.data)
        // console.log(chapter_response.data);
      } else {
        history.push("/login");
      }
    };
    fetchData();
  }, []);

  const DeleteHandler = async (campaign_id)=>{
      // console.log(campaign_id);
        const response = await adminServices.deleteCampaignService({campaign_id:campaign_id});
        if(response.status == 200){
            // console.log(response.data);
            // console.log("deleted");
            setCampaignsData(campaignsData.filter((obj)=>{
                return obj._id !== campaign_id;
            }));
        }else{
            console.log('failed');
        }
  }

   
  // console.log(campaignsData, chaptersData);

  return (
    <>
      {campaignsData && chaptersData? (
        <FeaturedTable
        >
        <DataCardHeader defaultHeader="true"
        btn={true}
          title="Study Campaigns"
          newLink="/campaign/new"
          newButton="New Campaign" />
          <p>
            <b>0</b> Campaigns completed out of {campaignsData.length}
          </p>
          <TileTable divStyle={{height:'62vh',overflowY:'auto'}}>
            {campaignsData.map((campaign, index) => {
                const start_date = new Date(campaign.start_date);
                const due_date = new Date(campaign.due_date);
                const today_date = new Date();
                const remain_days = Math.floor((due_date.getTime() - today_date.getTime())/ (1000 * 3600 * 24));
                const remainingDays = remain_days > 0 ? `Due in ${remain_days} days`: `No days remaining`;
                const totalChapters = services.no_chapters(chaptersData, campaign._id);
                const chaptersCompleted = chaptersData.filter((chapter)=>{
                    if(chapter.campaign_id===campaign._id){
                      if(chapter.videos.length>0){
                        const watchedVideos = chapter.videos.filter((video)=>{
                        return video.watched===true;
                      })
                      
                      
                      if(watchedVideos.length === chapter.videos.length){
                        return chapter;
                      }
                    }
                    }
                });

                 

              return (
                  <Trow key={index}>
                    <Tdata>
                    <h5 className="font-14 my-1">
                        <a className="text-body text-truncate">{campaign.campaign_title}</a>                        
                      </h5>
                      <span className="text-muted font-13">{remainingDays}</span>
                    
                        <span className="badge badge-info-lighten float-right" onClick={()=>{history.push(`/campaign/${campaign._id}/chapter`)}} role="button">
                           {`Chapters ${chaptersCompleted.length}/${totalChapters}`}
                        </span>
                      
                      
                      
                    </Tdata>
                    <Tdata className="px-auto" >
                      <span className="text-muted font-13">Status</span> <br />
                      
                      <span className={`badge badge-${remain_days>=0 && campaign.status? chaptersCompleted.length === totalChapters && totalChapters>0?"success":"warning":"danger"}-lighten`}>
                      
                      {remain_days>=0 && campaign.status? chaptersCompleted.length === totalChapters&& totalChapters>0?"completed":"In-progress":"date-passed"}
                      </span>
                    </Tdata>
                    <Tdata >
                      <span className="text-muted font-13">Start Date</span>
                      <h5 className="font-14 mt-1 font-weight-normal">
                        { `${("0" + start_date.getDate()).slice(-2)}-${("0" + (start_date.getMonth() + 1)).slice(-2)}-${start_date.getFullYear()}`}
                      </h5>
                    </Tdata>
                    <Tdata >
                      <span className="text-muted font-13">Due Date</span>
                      <h5 className="font-14 mt-1 font-weight-normal">
                      { `${("0" + due_date.getDate()).slice(-2)}-${("0" + (due_date.getMonth() + 1)).slice(-2)}-${start_date.getFullYear()}`}
                      </h5>
                    </Tdata>
                    <Tdata >
                      <span className="text-muted font-13">
                        Total time spend
                      </span>
                      <h5 className="font-14 mt-1 font-weight-normal">
                        0h 0min
                      </h5>
                    </Tdata>
                    <Tdata className="table-action" style={{ width: "90px" }} >
                      <Link to={`/campaign/edit/${campaign._id}`} className="action-icon" role="button">
                        {" "}
                        <i className="mdi mdi-pencil"></i>
                      </Link>
                      <a className="action-icon" onClick={()=>{DeleteHandler(campaign._id)}} role="button">
                        {" "}
                        <i className="mdi mdi-delete"></i>
                      </a>
                    </Tdata>
                  </Trow>
              );
            })}
          </TileTable>
          {/* <Pagination></Pagination> */}
        </FeaturedTable>
      ) : (
        <div className="bouncing-loader"  ><div ></div><div ></div><div ></div></div>
      )}
    </>
  );
};

export default Campaign;
