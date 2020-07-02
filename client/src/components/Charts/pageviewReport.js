import React, { useState, useEffect } from 'react';
import { addDays } from 'date-fns';
import { notification } from 'antd';
import CustomDatePicker from './datepicker';
import queryReport from './queryReport';
import getSecrets from '../../googleAuth/getSecrets';

const PageviewsReport = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());
  const [totalPages, setTotalPages] = useState(0);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    setTotalPages(queryResult.length);
    const total = response.result.reports[0].data.totals[0].values[0];
    const newReportData = [];
    queryResult.forEach((row, idx) => {
      if (idx < 10) {
        const tempObj = {
          path: row.dimensions[0],
          views: row.metrics[0].values[0],
          perc: `${parseFloat((row.metrics[0].values[0] / total) * 100).toFixed(
            1
          )}%`,
        };
        newReportData.push(tempObj);
      }
    });
    setReportData(newReportData);
  };
  const reactAppView = async () => {
    const { REACT_APP_VIEW_ID } = await getSecrets();
    const request = {
      viewID: REACT_APP_VIEW_ID,
      startDate,
      endDate,
      metrics: 'ga:pageviews',
      dimensions: ['ga:pagePath'],
      orderBy: {
        fieldName: 'ga:pageViews',
        order: 'DESCENDING',
      },
      filter: 'ga:pagePath!@localhost/',
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => displayResults(resp))
          .catch((error) => {
            const { message } = error;
            notification.error({
              message: 'Error',
              description: message,
            });
          }),
      1000
    );
  };
  useEffect(() => {
    reactAppView();
  }, [startDate, endDate]);

  return (
    <div>
      <h1>Top 10 Pages by Views</h1>
      <p>{`Total pages - ${totalPages}`}</p>
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
      {reportData.length && (
        <div className="pages-table">
          <table className="pages-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Views</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((row) => (
                <tr key={row.id}>
                  <td className="left-align">{row.path}</td>
                  <td>{row.views}</td>
                  <td>{row.perc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PageviewsReport;
