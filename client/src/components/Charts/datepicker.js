import React from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = (props) => {
  const { placeholder, date, handleDateChange } = props;
  return (
    <div>
      <div>{placeholder}</div>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        maxDate={new Date()}
        dateFormat="MMM dd, yyyy"
        className="picker"
      />
    </div>
  );
};

CustomDatePicker.propTypes = {
  placeholder: PropTypes.string.isRequired,
  date: PropTypes.isRequired,
  handleDateChange: PropTypes.isRequired,
};

export default CustomDatePicker;
