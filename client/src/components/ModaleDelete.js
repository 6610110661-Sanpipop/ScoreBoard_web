import { ExclamationCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Modal, Space } from 'antd';



const ModaleDelete = (props) => {
  const [modal, contextHolder] = Modal.useModal();

  const confirm = () => {
    modal.confirm({
      title: 'Please Confirmed',
      icon: <ExclamationCircleOutlined />,
      content: `คุณยืนยันที่จะลบ ${props.name} หรือไม่`,
      okText: 'Confirm',
      cancelText: 'Cancle',
      onOk: () => {
        console.log('deleter',props.idclicked);
        props.onDelete(props.idclicked)
      },
    });
  };

  return (
    <>
      <Space>
        <Button  onClick={confirm}>Delete</Button>
      </Space>
      {contextHolder}
    </>
  );
};

export default ModaleDelete;
