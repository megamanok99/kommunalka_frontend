import Kommunalka from '@/ApiConnecor/Auth';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    Kommunalka.Authme()
      .then((res) => {
        console.log('registered');
      })
      .catch((err) => message.error('нет Сессии'));
  });
  const router = useRouter();
  const onFinish = (values: any) => {
    Kommunalka.Auth(values.password, values.username)
      .then((res) => {
        sessionStorage.setItem('token', res.data.token);
        router.push('userpage');
        return message.success('Авторизация прошла успешно');
      })
      .catch((err) => {
        const error = err.response.data.map((el: any) => el.msg).toString();
        console.log(err.response.data);
        return message.error(error);
      });
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
      }}>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <Form.Item
          label="Почта"
          name="username"
          rules={[{ required: true, message: 'Поле необходимо к заполнению!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Поле необходимо к заполнению!' }]}>
          <Input.Password />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
