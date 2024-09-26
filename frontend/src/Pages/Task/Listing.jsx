import React, { useState } from 'react';
import { Button, Card, Flex, Layout, Table, Typography } from "antd";
const { Header, Content, Footer } = Layout;
import { CheckCircleOutlined } from '@ant-design/icons'; // Import an icon from Ant Design
import AppLayout from '../Components/AppLayout';
import TaskModal from './Listing/TaskModal';
import TaskColumns from './Listing/TaskColumns';

function Listing() {
  const [isModal, setIsMoadl] = useState(false);
  const [tasks, setTasks] = useState([]);
  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/api/tasks'); // Adjust the URL as needed
  //       setTasks(response.data);
  //     } catch (error) {
  //       console.error('Error fetching tasks:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  const handleModalState = (state) => {
    setIsMoadl(state);
  }
  const columns = TaskColumns();

  return (
    <>
      <Flex justify='flex-end'>
        <Button size='small' onClick={() => handleModalState(true)}>Add</Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={tasks}
        // loading={loading}
        rowKey="_id" // Use unique key from your data
      />
      <TaskModal visible={isModal} handleModalState={handleModalState} />
    </>
  );
}

export default Listing;
