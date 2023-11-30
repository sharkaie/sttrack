import React from 'react'

const Pagination = () => {
    return (
        <nav className="mt-2">
              <ul className="pagination justify-content-end mb-0">
                <li className="page-item disabled">
                  <a className="page-link" tabIndex="-1">
                    Previous
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link">Next</a>
                </li>
              </ul>
            </nav>
    )
}

export default Pagination
