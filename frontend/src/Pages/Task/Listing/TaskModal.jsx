import React, { useState } from 'react';
import { Form, Modal, } from 'antd';
import TaskForm from './TaskForm';

const TaskModal = ({ visible, handleModalState}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Create New Task"
      open={visible}
      onCancel={() => {
        form.resetFields();
        handleModalState(false);
        // handleItemRecord(null);
      }}
      footer={null}
    >
      <TaskForm
        form={form}
        handleModalState={handleModalState}
      />
    </Modal>
  );
};

export default TaskModal;
