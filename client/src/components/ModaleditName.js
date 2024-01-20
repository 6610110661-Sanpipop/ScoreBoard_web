import React from "react";
import { Button, Modal, Form, Input } from "antd";
import { useState, useEffect } from "react";

function ModaleditName(props) {
  const [newName_an, setNewname_an] = useState("");
  //modal
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  
  const handleCancel = () => {
    setOpen(false);
  };

  const getnewName = (event) => {
    setNewname_an(event.target.value)   
  };
  const handleOk = (event) => {
    event.preventDefault() //ไม่ให้จอรีเฟรช
    const itemData = {
        newName : newName_an,
        id : props.idclicked
    }
    console.log('itemdatacreated',itemData)
    props.onnewName(itemData)//ส่งกลับไปที่ announcepage
    setNewname_an('')//ดึงข้อมูลมาแล้วก็เคลียค่าstateทิ้ง
  };
  
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        open={open}
        title="Enter new name"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <form>
          <div>
            <input
              type="text"
              placeholder="กรอกชื่อประกาศใหม่"
              onChange={getnewName}
              value={newName_an}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default ModaleditName;
