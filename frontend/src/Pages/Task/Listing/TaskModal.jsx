import React, { useState } from 'react';
import { Form, Modal, } from 'antd';
import TaskForm from './TaskForm';

const TaskModal = ({ visible, handleModalState,handleRefreshData}) => {
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
        handleRefreshData={handleRefreshData}
      />
    </Modal>
  );
};

export default TaskModal;
