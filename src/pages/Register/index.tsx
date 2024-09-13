/*
 * @Author: 何欣 hexing@qq.com
 * @Date: 2024-09-12 15:54:18
 * @LastEditors: 何欣 hexing@qq.com
 * @LastEditTime: 2024-09-12 16:14:28
 * @FilePath: /nest学习/book-management-system-frontend/src/page/register/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Form, Input, message } from "antd";
import './index.css'
import { register } from "../../interfaces";

interface RegisterUser {
  username: string;
  password: string;
  password2: string;
}
const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },

}
const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
}
const onFinish = async (values: RegisterUser) => {
  console.log("Success:", values);
  if (values.password !== values.password2) {
    message.error("两次输入的密码不一致");
  }
  try {
    const res = await register(values.username, values.password)
    if (res.status === 201 || res.status === 200) {
      message.success("注册成功");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  } catch (e: any) {
    message.error(e.response.data.message);
  }
};

export function Register() {
  return <div id="register-container">
    <h1>图书管理系统</h1>
    <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item label="确认密码" name="password2" rules={[{ required: true, message: '请再次输入密码' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item {...layout2}>
        <div className="link">
          <a href="/login">已有账号，去登录</a>
        </div>
      </Form.Item>
      <Form.Item {...layout2}>
        <Button className="btn" type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  </div>;

}