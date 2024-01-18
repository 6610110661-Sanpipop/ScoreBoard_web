import { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Alert } from "antd";
import './LoginScreen.css'


const URL_AUTH = "/api/auth/local";

function LoginScreen(props){
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const handleLogin = async (formData) => {
        try {//สร้างตัวแปรที่ต้องใช้ก่อนจะลอกอินเข้าหน้าหลัก
          setIsLoading(true);
          setErrMsg(null);
          const response = await axios.post(URL_AUTH, {...formData});   
          console.log('afterlogin',response )  
          
          const email = response.data.user.email
          const numericValue = email.match(/\d+/); // ใช้ Regex เพื่อดึงค่าตัวเลข
          if (numericValue) {
            const std_id = numericValue[0]; // ได้ค่าเป็น "6610110661"
            console.log('this is student user',std_id); 
            localStorage.setItem('stdID', std_id);//1.setstdID
            props.onSetRole('Student')
          } else {
            console.log("No numeric value found in the email. so this is teacher");
            props.onSetRole('Admin')
          }
          
          const token = response.data.jwt
          axios.defaults.headers.common = { Authorization: `bearer ${token}` };//ฟีเจอของaxios เซตเฮดเดอให้มันได้เลย แล้วต่อไปในแอพของเราทั้งหมดแอพจะให้เฮดเดอนี้เสมอ (ฟังชันบันทึกโทเคน) 2.setaxiosheader
          props.onLoginSuccess(); // ใช้งานฟังชันพรอพ onlogin success
        } catch (err) {
          console.log(err);
          setErrMsg(err.message);
        } finally {
          setIsLoading(false);
        }
      };

    return (
      <div className="login-box">
        <Form onFinish={handleLogin} autoComplete="off">
          {errMsg && (
            <Form.Item>
              <Alert message={errMsg} type="error" />
            </Form.Item>
          )}
          <Form.Item label="Username" name="identifier" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
    
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
    
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
           
        </Form>
      </div>
      );
}

export default LoginScreen;