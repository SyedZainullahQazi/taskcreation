import React from 'react';
import { Input, Button } from 'antd';

const SearchFilter = ({ placeholder, selectedKeys, setSelectedKeys, confirm, clearFilters,  }) => {
  const handleSearch = () => {
    confirm();
  };

  return (
    <div style={{ padding: 8 }}>
      <Input
        placeholder={`Search ${placeholder}`}
        value={selectedKeys[0]}
        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={handleSearch} // Call handleSearch on Enter key
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button
        type="primary"
        onClick={handleSearch} // Call handleSearch only once
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

export default SearchFilter;
