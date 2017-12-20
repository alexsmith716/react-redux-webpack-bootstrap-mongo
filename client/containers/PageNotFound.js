
import React from 'react'
import { Link } from 'react-router-dom'


const PageNotFound = (props) => (
  <div>
    <p>
      404 - Page not found. 
    </p>
    <Link to="/">Go Home</Link>
  </div>

)


export default PageNotFound