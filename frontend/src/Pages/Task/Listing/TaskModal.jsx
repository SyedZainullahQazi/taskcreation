import React from 'react';
import { Form, Modal, } from 'antd';
import TaskForm from './TaskForm';

const TaskModal = ({ visible, handleModalState, handleRefreshData, record,handleRecord }) => {
  const [form] = Form.useForm();

 
  return (
    <Modal
      title="Create New Task"
      open={visible}
      onCancel={() => {
        form.resetFields();
        handleModalState(false);
        if(record){
          handleRecord(null);
        }
        // handleItemRecord(null);
      }}
      footer={null}
    >
      <TaskForm
        form={form}
        handleModalState={handleModalState}
        handleRefreshData={handleRefreshData}
        handleRecord={handleRecord}
        record={record}
      />
    </Modal>
  );
};

export default TaskModal;
