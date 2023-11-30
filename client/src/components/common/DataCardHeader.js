import React from 'react'
import { Link } from 'react-router-dom'


const DataCardHeader = (props) => {
    
    return (
        <div className="d-flex justify-content-between align-items-center mb-2">
        {props.defaultHeader==="false"?
            props.children
             :
             <><h4 className="header-title my-auto">{props.title}</h4>
            {props.btn===true?
                <Link to={props.newLink} className="btn btn-dark">
                    <i className="mdi mdi-chart-box-plus-outline"></i>{" "}
                    {props.newButton}
                </Link>
            :null}
            </>
            
        }
        
            
        </div>
    )
}

export default DataCardHeader
