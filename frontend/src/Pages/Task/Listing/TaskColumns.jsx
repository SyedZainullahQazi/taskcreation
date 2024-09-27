import React from 'react';
import { Tag, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import TaskStatusSwitch from './TaskStatusSwtich';
import { deleteTask } from '../../../Apis/Task';
import SearchDateFilter from './SearchDateFilter';
import SearchFilter from './SearchFilter';

const TaskColumns = ({ handleRefreshData, handleModalState, handleRecord }) => {
  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      handleRefreshData();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <SearchFilter 
          placeholder="title"
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
          handleRefreshData={handleRefreshData}
        />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <SearchFilter 
          placeholder="description"
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
          handleRefreshData={handleRefreshData}
        />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Pending', value: 'pending' },
        { text: 'Completed', value: 'completed' },
      ],
      onFilter: (value, record) => record.status.includes(value),
      render: (status, record) => (
        <TaskStatusSwitch record={record} handleRefreshData={handleRefreshData} />
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      filters: [
        { text: 'Low', value: 'low' },
        { text: 'Medium', value: 'medium' },
        { text: 'High', value: 'high' },
      ],
      onFilter: (value, record) => record.priority.includes(value),
      render: (priority) => (
        <Tag color={priority === 'high' ? 'red' : priority === 'medium' ? 'orange' : 'green'}>
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: true,
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <SearchDateFilter 
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
          handleRefreshData={handleRefreshData}
        />
      ),
      render: (date) => 
        date ? dayjs(date).format('YYYY-MM-DD') : 
        <Tag color={'red'}>{'NO DUE DATE'}</Tag>,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      // sorter: true,
      render: (date) => dayjs(date).format('YYYY-MM-DD'),
    },
    // {
    //   title: 'Updated At',
    //   dataIndex: 'updatedAt',
    //   key: 'updatedAt',
    //   render: (date) => dayjs(date).format('YYYY-MM-DD'),
    // },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => {
              handleRecord(record);
                handleModalState(true);
            }} 
          />
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record._id)} // Assuming _id is the task ID
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="link" 
              danger 
              icon={<DeleteOutlined />} 
            />
          </Popconfirm>
        </>
      ),
    },
  ];
};

export default TaskColumns;
