import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CurrTime from "./common/CurrTime";
import TimeLeft from "./common/TimeLeft";
import adminServices from "../services/admin";
import SetTitle from "./common/SetTitle";

const Dashboard = () => {
  SetTitle('Dashboard')
  const [apiData, setApiData] = useState("");
  const history = useHistory();
  const current_time = new Date();
  useEffect(() => {
    const fetchData = async () => {
      // You can await here

      const response = await adminServices.getDashboardService();
      // console.log(response);
      if (response.status === 200) {
        // console.log("entered");
        setApiData(response.data);
      } else {
        history.push("/login");
      }
     
    };
    fetchData();
  }, []);

  // console.log(apiData);

  return (
    <React.Fragment>
      {!apiData ? (
        <div className="bouncing-loader"  ><div ></div><div ></div><div ></div></div>
      ) : (
        <div className="row">
          <div className="col-lg-3 col-md-4 col-xl-3">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-right">
                  <i className="uil uil-book-open bg-info-lighten widget-icon text-dark"></i>
                </div>
                <h5
                  className="text-muted font-weight-normal mt-0"
                  title="Campaigns"
                >
                  Campaigns
                </h5>
                <h3 className="mt-3 mb-3">{`${apiData.campaigns.done} / ${apiData.campaigns.total}`}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-xl-3">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-right">
                  <i className="uil uil-notebooks bg-light widget-icon text-dark"></i>
                </div>
                <h5
                  className="text-muted font-weight-normal mt-0"
                  title="Growth"
                >
                  Chapter
                </h5>
                <h3 className="mt-3 mb-3">{`${apiData.chapters.done} / ${apiData.chapters.total}`}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-xl-3">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-right">
                  <i className="uil uil-play bg-success-lighten widget-icon text-dark"></i>
                </div>
                <h5
                  className="text-muted font-weight-normal mt-0"
                  title="Growth"
                >
                  Todays Videos
                </h5>
                <h3 className="mt-3 mb-3">{`${apiData.videos.watchedToday} / ${apiData.videos.toWatchToday}`}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-xl-3">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-right">
                  <i className="uil uil-play-circle bg-primary-lighten widget-icon text-dark"></i>
                </div>
                <h5
                  className="text-muted font-weight-normal mt-0"
                  title="Growth"
                >
                  Videos
                </h5>
                <h3 className="mt-3 mb-3">{`${apiData.videos.watched} / ${apiData.videos.total}`}</h3>
              </div>
            </div>
          </div>


          <div className="col-lg-3 col-md-4 col-xl-3">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-right">
                  <i
                    className={`uil uil-${current_time.getHours()>=18 || current_time.getHours()<6?'moon bg-dark-lighten  ':'sun bg-warning-lighten'} widget-icon text-dark`}
                  ></i>
                </div>
                <h5
                  className="text-muted font-weight-normal mt-0"
                  title="Number of Orders"
                >
                  Current Time
                </h5>
                <h3 className="mt-3 mb-3">{apiData ? <CurrTime /> : ""}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-xl-3">
            <div className="card widget-flat">
              <div className="card-body">
                <div className="float-right">
                  <i className="mdi mdi-timer-outline widget-icon bg-danger-lighten text-dark"></i>
                </div>
                <h5
                  className="text-muted font-weight-normal mt-0"
                  title="Number of Orders"
                >
                  Day Ends In
                </h5>
                <h3 className="mt-3 mb-3">{apiData ? <TimeLeft /> : ""}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
