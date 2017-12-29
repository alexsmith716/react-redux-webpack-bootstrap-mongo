
import React from 'react';

import style from './style.css';



const LoaderSpinner = () => (

  <div className={style.spinner}>
    <div className={style.cube1}/>
    <div className={style.cube2}/>
    <div className={style.cube3}/>
    <div className={style.cube4}/>
  </div>

);


export default LoaderSpinner;
