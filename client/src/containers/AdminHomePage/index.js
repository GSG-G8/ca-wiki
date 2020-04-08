import React from 'react';
import AdminCohort from '../../components/AdminContainer';

const test = () => {
  window.location.href = 'admin/cohorts';
};

export default () => {
  return (
    <AdminCohort buttonContent="Add Cohort" buttonFunction={test}>
      <h2>hello Test from Admin Home Page</h2>
    </AdminCohort>
  );
};
