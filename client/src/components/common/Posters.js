import React from 'react'
import SidebarPoster from "./SidebarPoster";

const Posters = (props) => {
    return (
        <>
        {props.poster.map((itemValue, index)=>{
            return <SidebarPoster key={index} id={index} svgIcon={itemValue.svgIcon} title={itemValue.title} description={itemValue.description} onClose={itemValue.onCLose} btnTitle={itemValue.btnTitle} btnClick={itemValue.btnClick}/>;    
        })}
        
        </>
    )
}

export default Posters
