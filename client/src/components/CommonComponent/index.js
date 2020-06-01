import React, { Component } from 'react';
import { Button } from 'antd';
import HomeImage from '../../assets/images/Group 369.svg';

import './style.css';

class CommonComponent extends Component {
  render() {
    return (
      <div className="container">
        <div className="container-text">
          <h1>PALESTINES FIRST</h1>
          <h1> FULL-STACK CODE ACADEMY</h1>
          <p>
            The Code Academy Is Palestine’s First Full-Stack Coding Bootcamp
            With A Flagship Campus In Gaza And Second Campus Opening In The West
            Bank In November 2018. The Code Academy Is A Joint Project Of Mercy
            Corps/Gaza Sky Geeks And Founders & Coders International. We Train
            16 Students Per Cohort In A Full-Time, Intensive Course For 8 Weeks
            With An Additional 16 Weeks Of Project-Based Learning With
            Real-World Clients To Jumpstart Your Professional Portfolio. The
            Objective Is To Graduate As Full-Stack Developers Who Can Deploy
            Production-Grade Software Online And Secure High-Quality Jobs With
            Companies Or Work As Freelance Developers.
          </p>
          <Button>JOIN THE CODE ACADEMY</Button>
        </div>
        <div className="container-photo">
          <img src={HomeImage} alt="Home" />
        </div>
      </div>
    );
  }
}

export default CommonComponent;
