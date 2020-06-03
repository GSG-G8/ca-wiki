import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { addDays } from 'date-fns';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import CustomDatePicker from './datepicker';
import queryReport from './queryReport';
import { formatDate } from './utils';

const DayVisitsReport = (props) => {
  const { title, metric } = props;
  const INITIAL_STATE = {
    labels: [],
    values: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [average, setAverage] = useState(0);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    const total = response.result.reports[0].data.totals[0].values[0];
    setAverage(parseInt(total / response.result.reports[0].data.rowCount, 10));
    const labels = [];
    const values = [];
    queryResult.forEach((row) => {
      labels.push(formatDate(row.dimensions[0]));
      values.push(row.metrics[0].values[0]);
    });
    setReportData({
      ...reportData,
      labels,
      values,
    });
  };

  const data = {
    labels: reportData.labels,
    datasets: [
      {
        label: `${title} per day`,
        fill: false,
        borderColor: '#E8505B',
        pointBorderColor: '#E8505B',
        pointBackgroundColor: '#E8505B',
        pointHoverBackgroundColor: '#E8505B',
        pointHoverBorderColor: '#E8505B',
        lineTension: 0.3,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: reportData.values,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        font: {
          size: 0,
        },
      },
    },
  };

  useEffect(() => {
    const request = {
      startDate,
      endDate,
      metrics: metric,
      dimensions: ['ga:date'],
    };
    queryReport(request)
      .then((resp) => displayResults(resp))
      .catch((error) => {
        const { message } = error;
        notification.error({
          message: 'Error',
          description: message,
        });
      });
  }, [startDate, endDate]);

  return (
    <div className="admin-chart">
      <h1>Number of Visitors ({`${title} per day)`}</h1>
      <p>{`Average - ${average} ${title}`}</p>
      <div className="date-picker">
        <CustomDatePicker
          placeholder="Start date"
          date={startDate}
          handleDateChange={(date) => setStartDate(date)}
        />
        <CustomDatePicker
          placeholder="End date"
          date={endDate}
          handleDateChange={(date) => setEndDate(date)}
        />
      </div>
      {reportData && (
        <div className="line-chart">
          <Line data={data} options={options} width={500} height={262} />
        </div>
      )}
    </div>
  );
};

DayVisitsReport.propTypes = {
  title: PropTypes.string.isRequired,
  metric: PropTypes.string.isRequired,
};

export default DayVisitsReport;
