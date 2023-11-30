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
import services from '../services/services';

const Videos = () => {
  SetTitle("Chapters Videos");

  const [campaignsData, setCampaignsData] = useState("");
  const [chaptersData, setChaptersData] = useState("");

  const history = useHistory();
  const { campaign_id, chapter_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const campaign_response = await adminServices.getCampaignService(
        campaign_id
      );
      const chapter_response = await adminServices.getChapterService(
        campaign_id,
        chapter_id
      );

      if (chapter_response.status === 200 && campaign_response.status === 200) {
        // console.log("api loaded succesfully");
        setCampaignsData(campaign_response.data);
        setChaptersData(chapter_response.data);
      } else {
        history.push("/login");
      }
    };
    fetchData();
  }, []);

  

  const DeleteHandler = async (videoId) => {
    // console.log(videoId);
    const response = await adminServices.deleteVideoService({
      campaign_id: campaign_id,
      chapter_id: chapter_id,
      video_id: videoId,
    });
    if (response.status == 200) {
      // console.log(response.data);

      setChaptersData((prevData) => {
        return {
          ...prevData,
          videos: [],
          videos: prevData.videos.filter((video) => {
            return video._id !== videoId;
          }),
        };
      });
    } else {
      console.log("deletetion failed");
    }
  };

  

  return (
    <>
      {chaptersData && campaignsData ? (
        <FeaturedTable
          campaignTitle={campaignsData.campaign_title}
          campaignLink="/campaign"
          chapterTitle={chaptersData.chapter_title}
          chapterLink={`/campaign/${campaignsData._id}/chapter`}
          newLink={`/campaign/${campaignsData._id}/chapter/${chaptersData._id}/video/new`}
          newButton="New Video"
        >
          <DataCardHeader defaultHeader="false">
            <h4 className="header-title my-auto mr-auto">
              <Link
                className="text-info"
                to={`/campaign/${campaignsData._id}/chapter`}
              >
                {campaignsData.campaign_title}
              </Link>
              <i className="uil uil-angle-right"></i>{" "}
              {chaptersData.chapter_title} Videos
            </h4>

            <Link
              to={`/campaign/${campaignsData._id}/chapter/${chaptersData._id}/video/new`}
              className="btn btn-dark"
            >
              <span className="d-block d-sm-block d-md-none">
                <i className="mdi mdi-chart-box-plus-outline"></i>
              </span>
              <span className="d-none d-sm-none d-md-block">
                <i className="mdi mdi-chart-box-plus-outline"></i> New Video
              </span>
            </Link>
          </DataCardHeader>
          <p>
            <b>{services.no_videos_watched(chaptersData.videos)}</b> Videos completed out of {chaptersData.videos.length}
          </p>
          <TileTable divStyle={{ height: "62vh", overflowY: "auto" }}>
            {chaptersData.videos.map((video, index) => {
              return (
                <Trow key={index}>
                  <Tdata>
                    <h5 className="font-14 my-1">
                      <a className="text-body text-truncate">{video.video_title}</a>
                    </h5>
                    <span className="text-muted font-13 text-truncate">
                      {video.video_overview}
                    </span>

                    <span className="badge badge-info-lighten float-right">
                      {services.hms(video.video_duration)}
                    </span>
                  </Tdata>
                  <Tdata>
                   <img className="img-fluid rounded" style={{width:"10vh", maxHeight:"5vh"}} src={services.getVideoThumbnail(video.video_link, 'medium')}/>
                  </Tdata>
                  <Tdata className="px-auto">
                    <span className="text-muted font-13">Status</span> <br />
                    <span
                      className={`badge badge-${
                        video.watched ? "success" : video.status?"warning":"danger"
                      }-lighten`}
                    >
                    {video.watched?'watched':
                      video.status && !video.watched ? "uncomplete" : "disabled"
                    }
                    </span>
                  </Tdata>
                  <Tdata>
                    <span className="text-muted font-13">Total watch-time</span>
                    <h5 className="font-14 mt-1 font-weight-normal">
                      {services.hms(video.watch_time)}
                    </h5>
                  </Tdata>
                  <Tdata className="table-action" style={{ width: "90px" }}>
                    <Link
                      to={`/campaign/${chaptersData.campaign_id}/chapter/${chaptersData._id}/video/${video._id}/edit`}
                      className="action-icon"
                      role="button"
                    >
                      {" "}
                      <i className="mdi mdi-pencil"></i>
                    </Link>
                    <a
                      className="action-icon"
                      onClick={() => {
                        DeleteHandler(video._id);
                      }}
                      role="button"
                    >
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

export default Videos;
