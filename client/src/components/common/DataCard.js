import React from 'react'

const DataCard = (props) => {
    return (
        <div className={`card ${props.cardClassName}`} style={props.styles}>
            <div className={`card-body ${props.cardBodyClassName}`}>
                {props.children}
            </div>
        </div>
    )
}

export default DataCard
