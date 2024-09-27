import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { listingTask } from '../../Apis/Task';
import TaskColumns from './Listing/TaskColumns'
import AppLayout from '../Components/AppLayout';
const TaskListing = () => {
    const [isModal, setIsModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);
    const [filters, setFilters] = useState({ status: null, priority: null });

    const fetchTasks = async () => {
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
        <AppLayout toolkit={<Button size='small' onClick={() => handleModalState(true)}>Add</Button>}>
            <Table
                columns={TaskColumns({ handleRefreshData })}
                dataSource={tasks}
                onChange={(pagination, filters, sorter) => {
                    setSortOrder(sorter.order);
                    handleFilterChange(filters);
                }}
                rowKey="_id" // Assuming _id is the unique identifier for your tasks
            />
            <TaskModal visible={isModal} handleModalState={handleModalState} />

        </AppLayout>
    );
};

export default TaskListing;
