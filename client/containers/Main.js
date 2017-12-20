

import React from 'react';
import { Link } from 'react-router-dom';


const Main = (props) => (

  <div>

    <div>

      <Link to="/">Home</Link>
      &nbsp;
      <Link to="/about">About</Link>

    </div>

    <section>

      { props.children }
      
    </section>

  </div>

);


export default Main;