import Kommunalka from '@/ApiConnecor/Auth';
import useFetchData from '@/customHook/userData';
import { Table, Card } from 'antd';
import { useEffect, useState } from 'react';

export default function Login() {
  const [bills, setBills] = useState([]);

  const columns = [
    {
      dataIndex: 'coldWater',
      title: 'холодная вода',
    },
  ];
  // useEffect(() => {
  //   Kommunalka.getBills().then((res) => {
  //     console.log('registered');
  //     // setBills(res.data);
  //   }, []);
  // });
  // Kommunalka.getBills().then((res) => {
  //   console.log('registered');
  //   setBills(res.data);
  // });
  const onFinish = (values: any) => {
    Kommunalka.Auth(values.password, values.username).then((res) => {
      sessionStorage.setItem('token', res.data.token);
    });
    console.log('Success:', values);
  };

  return (
    <Card>
      <Table columns={columns} dataSource={bills} />
    </Card>
  );
}
