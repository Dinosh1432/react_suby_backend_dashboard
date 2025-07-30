import React from 'react'
import {Link} from 'react-router-dom'

const PageNotFOund = () => {
  return (
    <div className="page-Error" style={{fontSize:'1.5rem',color:'darkblue'}}>
        <>
        <Link to="/">
        <p>Go back</p>
        </Link></>
        <h1>404</h1>
        <p>Page Not Found</p>
    </div>
  )
}

export default PageNotFOund