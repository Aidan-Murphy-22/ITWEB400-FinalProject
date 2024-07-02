import React, { useState } from 'react';

const DatePicker = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    onSelectDate(e.target.value); 
  };

  return (
    <div>
      <label htmlFor="datePicker" className=''>Select Date:</label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={handleDateChange}
        className='inputDesign'
      />
    </div>
  );
};

export default DatePicker;