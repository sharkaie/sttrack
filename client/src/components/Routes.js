import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Campaign from "./Campaign";
import CampaignEdit from "./CampaignEdit";
import CampaignAdd from "./CampaignAdd";
import Dashboard from "./Dashboard";
import StudyModuler from "./StudyModuler";
import Timeline from "./Timeline";
import Chapters from "./Chapters";
import ChapterAdd from "./ChapterAdd";
import ChapterEdit from "./ChapterEdit";
import Videos from "./Videos";
import VideoAdd from "./VideoAdd";
import VideoEdit from "./VideoEdit";


const Routes = () => {
  const setHeader = (title)=>{
    console.log(title);
  }
  return (
    <React.Fragment>
      <Switch>
      
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/timeline" component={Timeline} />
        <Route exact path="/study-moduler" component={StudyModuler} />

        <Route exact path="/campaign" component={Campaign} pageHeader={setHeader} />
        <Route exact path="/campaign/new" component={CampaignAdd} />
        <Route exact path="/campaign/edit/:id" component={CampaignEdit} />

        <Route exact path="/campaign/:campaign_id/chapter" component={Chapters} />
        <Route exact path="/campaign/:campaign_id/chapter/new" component={ChapterAdd} />
        <Route exact path="/campaign/:campaign_id/chapter/:chapter_id/edit" component={ChapterEdit} />

        <Route exact path="/campaign/:campaign_id/chapter/:chapter_id/video" component={Videos} />
        <Route exact path="/campaign/:campaign_id/chapter/:chapter_id/video/new" component={VideoAdd} />
        <Route exact path="/campaign/:campaign_id/chapter/:chapter_id/video/:video_id/edit" component={VideoEdit} />
        
        <Route path="/*" render={() => <Redirect to="/404" />} />
      </Switch>
    </React.Fragment>
  );
};

export default Routes;
