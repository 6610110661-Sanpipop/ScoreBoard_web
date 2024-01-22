import React from "react";
import { Button, Modal } from "antd";
import { useState } from "react";
import Tablescores from "./Tablescores";
function BtnUploadsc(props) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    props.funcPost();
    setOpen(false)
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        อัพโหลดคะแนน
      </Button>
      <Modal
        open={open}
        title="ตัวอย่างรายการ"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancle
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}>
            Comfirm
          </Button>,         
        ]}>
        <div><Tablescores data={props.data} /></div>
        
      </Modal>
    </div>
  );
}

export default BtnUploadsc;
