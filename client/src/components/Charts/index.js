import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
  state = {
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          data: [28, 45, 40, 55, 67, 50, 60],
          fill: false,
          borderColor: '#E8505B',
          pointBorderColor: '#E8505B',
          pointBackgroundColor: '#E8505B',
          pointHoverBackgroundColor: '#E8505B',
          pointHoverBorderColor: '#E8505B',
        },
      ],
    },
  };

  render() {
    const { chartData } = this.state;
    return (
      <div className="admin-chart">
        <h1>Number of Visitors</h1>
        <Line
          data={chartData}
          options={{
            legend: {
              display: false,
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
