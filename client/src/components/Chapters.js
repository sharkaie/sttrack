import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SetTitle from "./common/SetTitle";
import { useHistory, useParams } from "react-router-dom";
import adminServices from "../services/admin";
import FeaturedTable from "./common/FeaturedTable";
import TileTable from "./common/TileTable";
// import Pagination from "./common/Pagination";
import DataCardHeader from "./common/DataCardHeader";
import Trow from "./common/Trow";
import Tdata from "./common/Tdata";

const Chapters = () => {
  SetTitle("My Campaign Chapters");

  const [campaignsData, setCampaignsData] = useState("");
  const [chaptersData, setChaptersData] = useState("");

  const history = useHistory();
    const {campaign_id} = useParams();

    // console.log(campaign_id);

  useEffect(() => {
    const fetchData = async () => {
      const campaign_response = await adminServices.getCampaignService(campaign_id);
      const response = await adminServices.getAllChaptersService(campaign_id);
      // console.log(response);
      if (response.status === 200) {
        // console.log("api loaded succesfully");
        setCampaignsData(campaign_response.data);
        setChaptersData(response.data);
      } else {
        history.push("/login");
      }
    };
    fetchData();
  }, []);

  const DeleteHandler = async (campaign_id, chapter_id)=>{
    //   console.log(campaign_id);
        const response = await adminServices.deleteChapterService({campaign_id:campaign_id, chapter_id:chapter_id});
        if(response.status == 200){
            // console.log(response.data);
            // console.log("deleted");
            setChaptersData(chaptersData.filter((obj)=>{
                return obj._id !== chapter_id;
            }));
        }else{
            console.log('failed');
        }
  }

   
  // console.log(chaptersData);

  return (
    <>
      {chaptersData ? (
        <FeaturedTable
          title={`Campaign [${campaignsData.campaign_title}] Chapters`}
          newLink={`/campaign/${campaign_id}/chapter/new`}
          newButton="New Chapter"
        >
        <DataCardHeader defaultHeader="false">
            <h4 className="header-title my-auto mr-auto">
              <Link className="text-info" to='/campaign'>
                Campaign
              </Link>
              <i className="uil uil-angle-right"></i>
              {campaignsData.campaign_title}
            </h4>

            <Link
              to={`/campaign/${campaignsData._id}/chapter/new`}
              className="btn btn-dark"
            >
              <span className="d-block d-sm-block d-md-none">
                <i className="mdi mdi-chart-box-plus-outline"></i>
              </span>
              <span className="d-none d-sm-none d-md-block">
                <i className="mdi mdi-chart-box-plus-outline"></i> New Chapter
              </span>
            </Link>
          </DataCardHeader>
          <p>
            <b>0</b> Chapters completed out of {chaptersData.length}
          </p>
          <TileTable divStyle={{height:'62vh',overflowY:'auto'}}>
            {chaptersData.map((chapter, index) => {
                
                  const watchedVideos = chapter.videos.filter((video)=>{
                    return video.watched===true;
                  })

              return (
                  <Trow key={index}>
                    <Tdata>
                    <h5 className="font-14 my-1">
                        <a className="text-body text-truncate">{chapter.chapter_title}</a>                        
                      </h5>
                      <span className="text-muted font-13 text-truncate">{chapter.overview}</span>
                    
                        <span className="badge badge-info-lighten float-right" onClick={()=>{history.push(`/campaign/${campaign_id}/chapter/${chapter._id}/video`)}} role="button">
                           {`videos ${watchedVideos.length}/${chapter.videos.length}`}
                        </span>
                      
                      
                      
                    </Tdata>
                    <Tdata className="px-auto" >
                      <span className="text-muted font-13">Status</span> <br />
                      
                      <span className={`badge badge-${chapter.status? chapter.videos.length === watchedVideos.length&& chapter.videos.length>0?"success":"warning" :"danger"}-lighten`}>                      
                      {chapter.status? chapter.videos.length === watchedVideos.length&& chapter.videos.length>0?"completed":"uncomplete" :"disabled"}                      
                      </span>
                    </Tdata>
                    <Tdata >
                      <span className="text-muted font-13">
                        Total time spend
                      </span>
                      <h5 className="font-14 mt-1 font-weight-normal">
                        3h 20min
                      </h5>
                    </Tdata>
                    <Tdata className="table-action" style={{ width: "90px" }} >
                      <Link to={`/campaign/${chapter.campaign_id}/chapter/${chapter._id}/edit`} className="action-icon" role="button">
                        {" "}
                        <i className="mdi mdi-pencil"></i>
                      </Link>
                      <a className="action-icon" onClick={()=>{DeleteHandler(chapter.campaign_id, chapter._id)}} role="button">
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

export default Chapters;
