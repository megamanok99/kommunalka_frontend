import Kommunalka from '@/ApiConnecor/Auth';
import useAxiosFetch from '@/customHook/useAxiosFetch';
import useFetchData from '@/customHook/userData';
import { Table, Card, Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface DataType {
  _id: string;
  hotWater: number;
  coldWater: number;
  electric: number;
  addPayment: number[];
  user: {
    _id: string;
    fullName: string;
    email: string;
    hash: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt?: string;
  updatedAt?: string | moment.Moment;
  __v: number;
}

export default function Login() {
  const [bills, setBills] = useState<DataType[]>([]);
  const [user, setUser] = useState<any>([]);
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'coldWater',
      title: 'холодная вода',
    },
    {
      dataIndex: 'hotWater',
      title: 'Горячая вода',
    },
    {
      dataIndex: 'electric',
      title: 'Электричество',
    },
    {
      dataIndex: 'createDate',
      title: 'Дата добавления',
      render: (name) => `${moment(name).format('LL')}`,
      // render: (name) => moment(name),
    },
    {
      dataIndex: '_id',
      title: 'К оплате',
      render: (val, obj, index) => {
        if (index > 0) {
          return (
            totalSumm(user.ratioElec, bills[index - 1].electric, bills[index].electric) +
            totalSumm(user.ratioCold, bills[index - 1].coldWater, bills[index].coldWater) +
            totalSumm(user.ratioHot, bills[index - 1].hotWater, bills[index].hotWater) +
            summOfOtvod(
              user.avatarUrl,
              bills[index].hotWater - bills[index - 1].hotWater,
              bills[index].coldWater - bills[index - 1].coldWater,
            )
          );
          //  (bills[index].electric - bills[index - 1].electric) * user.ratioElec;
        }
      },
    },
  ];
  const totalSumm = (kef: any, prev: any, next: any) => {
    return (next - prev) * kef;
  };
  const summOfOtvod = (kef: any, arr: any, arr2: any) => {
    return (arr + arr2) * kef;
  };
  const { data } = useAxiosFetch(Kommunalka.getBills);
  useEffect(() => {
    setBills(data);

    Kommunalka.Authme().then((res) => {
      setUser(res.data);
    });
  }, [data]);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card>
      <Table columns={columns} dataSource={bills} />
      <Form
        name="registerBills"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        autoComplete={'on'}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Горячая вода"
          name="hotWater"
          initialValue={bills[bills.length - 1]?.hotWater}>
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Холодная вода"
          name="coldWater"
          initialValue={bills[bills.length - 1]?.coldWater}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Электричество"
          name="electric"
          initialValue={bills[bills.length - 1]?.electric}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Дата внесения" name="createDate">
          <DatePicker />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
