
import React from 'react'
import { Link } from 'react-router-dom'


const Layout = (props) => (

  <div>

    <header>

      <Link to="/">Home</Link>
      &nbsp;
      <Link to="/about">About</Link>
      
    </header>

    <section>

      { props.children }

    </section>

  </div>

)


export default Layout