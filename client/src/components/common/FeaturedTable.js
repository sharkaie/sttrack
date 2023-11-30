import React from "react";
import { Link } from "react-router-dom";
import DataCard from "./DataCard";


const FeaturedTable = (props) => {
  return (
    <div className="row">
      <div className="col-xl-12">
        <DataCard>                 
          {props.children}
        </DataCard>
      </div>
    </div>
  );
};

export default FeaturedTable;
