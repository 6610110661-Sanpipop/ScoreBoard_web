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
          sessionStorage.setItem('IDuser',response.data.user.id)//4.setidของuserที่ลอกอินเข้ามา
          const email = response.data.user.email
          const username = response.data.user.username

          const token = response.data.jwt
          axios.defaults.headers.common = { Authorization: `bearer ${token}` };//ฟีเจอของaxios เซตเฮดเดอให้มันได้เลย แล้วต่อไปในแอพของเราทั้งหมดแอพจะให้เฮดเดอนี้เสมอ (ฟังชันบันทึกโทเคน) 2.setaxiosheader
          sessionStorage.setItem('jwt',token)

          const getrole = await axios.get("/api/users/me?populate=role")
          const role = getrole.data.role.name
          console.log('get role',"'",role,"'")

          if (role === 'Student') {
            const numericValue = email.match(/\d+/); // ใช้ Regex เพื่อดึงค่าตัวเลข
            const std_id = numericValue[0]; // ได้ค่าเป็น "6610110661"
            console.log('this is student user',std_id); 
            sessionStorage.setItem('stdID', std_id);//1.setstdID
            sessionStorage.setItem('role',role)//5. setrole
            sessionStorage.setItem('username',username)
          } else {
            console.log("You are teacher");
            sessionStorage.setItem('role',role)
            sessionStorage.setItem('username',username)
          }
          
          props.onLoginSuccess(); // ใช้งานฟังชันพรอพ onlogin success
        } catch (err) {
          console.log(err);
          setErrMsg(err.message);
        } finally {
          setIsLoading(false);
        }
      };

    return (
      <div className="login-box" >
        
        <h2 className="titleLG">Welcome To ScoreBoard</h2>
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