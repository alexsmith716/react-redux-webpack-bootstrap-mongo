
import React from 'react';

import style from './style.css';



const LoaderSpinner = () => (

  <div className={styles.spinner}>
    <div className={styles.cube1}/>
    <div className={styles.cube2}/>
    <div className={styles.cube3}/>
    <div className={styles.cube4}/>
  </div>

);


export default LoaderSpinner;
