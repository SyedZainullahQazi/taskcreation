import React from 'react';
import { DatePicker, Button } from 'antd';
import dayjs from 'dayjs';

const SearchDateFilter = ({ selectedKeys, setSelectedKeys, confirm, clearFilters, handleRefreshData }) => {
  const handleDateChange = (date, dateString) => {
    setSelectedKeys(dateString ? [dateString] : []);
  };

  const handleSearch = () => {
    confirm();
  };

  return (
    <div style={{ padding: 8 }}>
      <DatePicker
        format="YYYY-MM-DD" // Formatting to YYYY-MM-DD
        value={selectedKeys[0] ? dayjs(selectedKeys[0], 'YYYY-MM-DD') : null}
        onChange={handleDateChange}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
        placeholder="Select Due Date"
      />
      <Button
        type="primary"
        onClick={handleSearch}
        size="small"
        style={{ width: 90, marginRight: 8 }}
      >
        Search
      </Button>
      <Button
        onClick={() => {
          clearFilters();
        }}
        size="small"
      >
        Reset
      </Button>
    </div>
  );
};

export default SearchDateFilter;
