// TaskStatusSwitch.jsx
import React, { useState } from 'react';
import { Switch, message } from 'antd';
import { updateTaskStatus } from '../../../Apis/Task'; // Assume this is your API call

const TaskStatusSwitch = ({ record, handleRefreshData }) => {
  const [loading, setLoading] = useState(false);
  const [status,setStatus] = useState(record.status);
  const { _id } = record;

  const handleStatusChange = async () => {
    try {
      setLoading(true);
      const newStatus = status === 'completed' ? 'pending' : 'completed';
      const response = await updateTaskStatus(_id, newStatus);
      setStatus(response.data.status);
      message.success(`Task status updated to ${newStatus}`);
    } catch (error) {
      message.error('Failed to update task status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Switch
      checked={status === 'completed'}
      loading={loading}
      onChange={handleStatusChange}
      checkedChildren="Completed"
      unCheckedChildren="Pending"
    />
  );
};

export default TaskStatusSwitch;
