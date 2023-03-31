import Kommunalka from '@/ApiConnecor/Auth';
import useAxiosFetch from '@/customHook/useAxiosFetch';
import useFetchData from '@/customHook/userData';
import {
  Table,
  Card,
  Form,
  Input,
  Button,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Space,
  Tooltip,
  Popconfirm,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import {
  SaveOutlined,
  RollbackOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

import { useRouter } from 'next/router';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import download from 'downloadjs';
import { DataType, userModel } from '@/interface';
const { Title, Text } = Typography;

export default function Aboutme() {
  const router = useRouter();

  const [user, setUser] = useState<userModel>({});

  useEffect(() => {
    Kommunalka.Authme()
      .then((res) => {
        setUser(res.data);
        form.setFieldsValue({
          ...res.data,
        });
      })
      .catch(() => router.push('login'));
  }, []);

  const [form] = Form.useForm();

  const editBill = (obj: DataType, id: any) => {};
  const onFinish = (values: any) => {};
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card style={{ backgroundColor: '#E3EDF5', height: '100vh' }}>
      <Row
        style={{
          backgroundColor: '#0D2231',
          padding: '30px',
          height: '100%',
          // background: 'rgb(13,34,49)',
          background:
            'linear-gradient(63deg, rgba(13,34,49,1) 10%, rgba(17,90,120,1) 71%, rgba(47,134,170,1) 100%)',
        }}>
        <Col span={12}>
          <Form
            form={form}
            // initialValues={{
            //   hotWater: bills[bills.length - 1]?.hotWater,
            // }}
            name="registerBills"
            labelCol={{
              span: 8,
            }}
            labelWrap
            colon={false}
            labelAlign="left"
            // wrapperCol={{
            //   span: 16,
            // }}
            // style={{
            //   maxWidth: 600,
            // }}
            autoComplete={'on'}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}>
            <Form.Item
              label={<Text style={{ WebkitTextFillColor: '#ffffffe0' }}>Имя пользователя</Text>}
              name="fullName">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label={<Text style={{ WebkitTextFillColor: '#ffffffe0' }}>Горячая вода</Text>}
              name="ratioHot">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label={<Text style={{ WebkitTextFillColor: '#ffffffe0' }}>Холодная вода</Text>}
              name="ratioCold">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label={<Text style={{ WebkitTextFillColor: '#ffffffe0' }}>Электричество</Text>}
              name="ratioElec">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Отправить
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col span={12}>f</Col>
      </Row>
    </Card>
  );
}
