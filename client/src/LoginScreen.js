import { useState } from "react";
import axios from "axios";
import { Button, Form, Input, Alert } from "antd";

const URL_AUTH = "/api/auth/local";

function LoginScreen(props){
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const handleLogin = async (formData) => {
        try {
          setIsLoading(true);
          setErrMsg(null);
          const response = await axios.post(URL_AUTH, {...formData});   
          console.log('afterlogin',response)      
          const token = response.data.jwt
          axios.defaults.headers.common = { Authorization: `bearer ${token}` };//ฟีเจอของaxios เซตเฮดเดอให้มันได้เลย แล้วต่อไปในแอพของเราทั้งหมดแอพจะให้เฮดเดอนี้เสมอ (ฟังชันบันทึกโทเคน)
          props.onLoginSuccess(); // ใช้งานฟังชันพรอพ onlogin success
        } catch (err) {
          console.log(err);
          setErrMsg(err.message);
        } finally {
          setIsLoading(false);
        }
      };

    return (
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
      );
}

export default LoginScreen;