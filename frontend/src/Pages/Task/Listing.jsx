import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { listingTask } from '../../Apis/Task';
import TaskColumns from './Listing/TaskColumns'
import AppLayout from '../Components/AppLayout';
import TaskModal from  './Listing/TaskModal';
import { PlusOutlined } from '@ant-design/icons';
const TaskListing = () => {
    const [isModal, setIsModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);
    const [filters, setFilters] = useState({ status: null, priority: null });

    const [record,setRecord] = useState(null);
    const handleRecord = (state)=>{
      setRecord(state);
    }
    const fetchTasks = async () => {
      console.log("FETCHING TASKSSSSSS");
        const params = {
            sortOrder,
            filters
        };
        try {
            const response = await listingTask(params);
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [sortOrder, filters]);

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    const handleRefreshData = () => {
        fetchTasks();
    };

    const handleModalState = (state) => {
        setIsModal(state);
      };

    return (
        <AppLayout title={'TODO - LISTVIEW'}
        toolkit={<Button
            size='small'
            type='primary'
            className='mr-10'
            onClick={() => handleModalState(true)}
            style={{ backgroundColor: 'black', borderColor: 'black', color: 'white' }}
            icon={<PlusOutlined style={{ color: 'white' }} />}
        >
            Add 
        </Button>}>
            <Table
                columns={TaskColumns({ handleRefreshData,handleModalState,handleRecord })}
                dataSource={tasks}
                onChange={(pagination, filters, sorter) => {
                    setSortOrder(sorter.order);
                    handleFilterChange(filters);
                }}
                rowKey="_id" // Assuming _id is the unique identifier for your tasks
            />

            <TaskModal visible={isModal} handleModalState={handleModalState} handleRefreshData={handleRefreshData} record={record}/>

        </AppLayout>
    );
};

export default TaskListing;
