import React from 'react';
import AdminCohort from '../../components/AdminContainer';
import Test from '../../components';

export default () => {
  return (
    <AdminCohort
      buttonContent="Add Cohort"
      contentComponent={<Test location="hello from Admin Home Page" />}
    />
  );
};
