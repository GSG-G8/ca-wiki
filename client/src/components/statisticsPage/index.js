import React, { Component } from 'react';
import { Progress } from 'antd';

class Statistics extends Component {

    state = {
        statistics : 
   {
    numberOfCohorts: Number,
    numberOfProjects: Number,
    numberOfStudent: Number
    }
    }


render() {
    return(
        <div className='container'>
            
          <div style={{ width: 170 }}>
                <Progress percent={30} size="small" />
                <Progress percent={50} size="small" status="active" />
                <Progress percent={70} size="small" status="exception" />
                <Progress percent={100} size="small" />
            </div>

        </div>

    );
}

}

export default Statistics;