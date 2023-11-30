import React from 'react'

const TileTable = (props) => {
    return (
        <div className="table-responsive" style={props.divStyle}>
              <table className={`table table-centered table-nowrap table-hover mb-0 ${props.className}`} style={props.style}>
                <tbody>
                  {props.children}
                </tbody>
              </table>
            </div>
    )
}

export default TileTable
