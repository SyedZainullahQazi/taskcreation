import React from 'react';
import { Form, Modal, } from 'antd';
import TaskForm from './TaskForm';

const TaskModal = ({ visible, handleModalState, handleRefreshData, record }) => {
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
        record={record}
      />
    </Modal>
  );
};

export default TaskModal;
