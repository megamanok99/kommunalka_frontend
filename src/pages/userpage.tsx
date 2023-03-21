import Kommunalka from '@/ApiConnecor/Auth';
import useAxiosFetch from '@/customHook/useAxiosFetch';
import useFetchData from '@/customHook/userData';
import { Table, Card } from 'antd';
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
  const [user, setUser] = useState<[]>([]);
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
      dataIndex: 'updatedAt',
      title: 'Дата добавления',
      render: (name) => `${moment(name).format('LL')}`,
      // render: (name) => moment(name),
    },
  ];
  const { data } = useAxiosFetch(Kommunalka.getBills);
  useEffect(() => {
    setBills(data);

    Kommunalka.Authme().then((res) => {
      setUser(res.data);
    });
  }, [data]);

  return (
    <Card>
      <Table columns={columns} dataSource={bills} />
    </Card>
  );
}
