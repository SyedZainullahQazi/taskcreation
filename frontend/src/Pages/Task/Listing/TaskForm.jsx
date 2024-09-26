import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Space, DatePicker, message, Select } from 'antd';
import dayjs from 'dayjs';
import { createTask } from '../../../Apis/Task';

const { Option } = Select; // Destructure Option from Select

const TaskForm = ({ form, handleModalState }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log(dayjs(values.dueDate).format('YYYY-MM-DD'))
      // Format the dueDate using dayjs
      values['dueDate'] = dayjs(values.dueDate).format('YYYY-MM-DD');
      
      
      // Simulate an API call (replace this with your actual API call)
      const response = await createTask(values);
      console.log('THE RECEIVED RESPONSE IS ',response);
      message.success('Task successfully created!');
      
      // Reset the form fields
      form.resetFields();
      handleModalState(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('An error occurred while creating the task');
    } finally {
      setLoading(false);
    }
  };

  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < dayjs().startOf('day');
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="title"
            label="Task Title"
            rules={[{ required: true, message: 'Please enter the task title' }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item
            name="description"
            label="Task Description"
            rules={[{ required: true, message: 'Please enter the task description' }]}
          >
            <Input.TextArea
              placeholder="Enter task description"
              rows={4}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="dueDate"
            label="Due Date/Time"
            rules={[{ required: false, message: 'Please select the due date/time' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="Select due date/time"
              style={{ width: '100%' }} // Ensure full width
              disabledDate={disabledDate}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select the priority' }]}
          >
            <Select placeholder="Select priority" style={{ width: '100%' }}>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form.Item>
            <Space style={{ float: 'right' }}>
              <Button onClick={() => handleModalState(false)}>
                Close
              </Button>
              <Button 
                loading={loading} 
                type="primary" 
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
