

import React from 'react';
import { Link } from 'react-router-dom';


const App = (props) => (

  <div>


    <div>

      <Link to="/">Home</Link>
      &nbsp;
      <Link to="/about">About Us</Link>
      &nbsp;
      <Link to="/contact">Contact Us</Link>

    </div>


    <section>

      { props.children }

    </section>


    //<footer>
    //</footer>


  </div>

);


export default App;