import React, { useState, useEffect } from 'react';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [country, setSelectCountry] = useState("");
  const [today, setToday] = useState("");

  useEffect(() => {
    if (country === 'india') {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 20 );
      setToday(currentDate.toISOString().split("T")[0]);
    } else {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 30 );
      setToday(currentDate.toISOString().split("T")[0]);
    }
  }, [country]);

  const selectCountry = (event) => {
    setSelectCountry(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div>
      <label>Select {country}</label>
      <select
        className="form-select"
        id="floatingSelect"
        aria-label="Floating label select example"
        onChange={selectCountry}
      >
        <option value="" selected>Select</option>
        <option value="india">India</option>
        <option value="abroad">Abroad</option>
      </select>
      <label htmlFor="date">Select a date: </label>
      <input
        type="date"
        id="date"
        name="date"
        value={selectedDate}
        min={today}
        onChange={handleDateChange}
      />
      {selectedDate && <p>Selected Date: {selectedDate}</p>}
    </div>
  );
};

export default DatePicker;
