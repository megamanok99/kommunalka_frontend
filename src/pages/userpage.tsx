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
const { Title, Text } = Typography;
interface DataType {
  createDate?: Dayjs | null | undefined;
  edit?: any;
  _id?: string;
  hotWater: number;
  coldWater: number;
  electric: number;
  addPayment?: number[];
  user?: {
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
  __v?: number;
}

export default function Login() {
  const router = useRouter();
  // const locale = import('antd/es/date-picker/locale/ru_RU');
  const [bills, setBills] = useState<DataType[]>([]);
  const [user, setUser] = useState<any>([]);

  const [currentBill, setCurrentBill] = useState<DataType>({
    hotWater: 0,
    coldWater: 0,
    electric: 0,
  });

  const resetChanges = () => {
    setCurrentBill({ hotWater: 0, coldWater: 0, electric: 0 });
    console.log(`reseted`);
    setBills(
      bills.map((el: any) => {
        return {
          ...el,
          edit: false,
        };
      }),
    );
  };

  const editData = (record: any) => {
    setCurrentBill(record);
    setBills(
      bills.map((el: any) => {
        if (el._id === record._id) {
          return {
            ...el,
            edit: true,
          };
        }
        return {
          ...el,
          edit: false,
        };
      }),
    );
  };
  const onChange = (value: any) => {
    setCurrentBill({
      ...currentBill,
      coldWater: value,
    });
    console.log('changed', value);
    return value;
  };
  const columns: ColumnsType<DataType> = [
    {
      dataIndex: 'coldWater',
      title: 'Холодная вода, м³',
      render: (name, record) => {
        return (
          <>
            {record.edit ? (
              <InputNumber value={record.coldWater} onChange={onChange} />
            ) : (
              <p style={{ margin: 0 }}>{name}</p>
            )}
          </>
        );
      },
    },
    {
      dataIndex: 'hotWater',
      title: 'Горячая вода, м³',
      render: (name, record) => {
        return (
          <>
            {record.edit ? (
              <InputNumber
                value={currentBill?.hotWater}
                onChange={(val: any) => {
                  setCurrentBill({
                    ...currentBill,
                    hotWater: val,
                  });
                }}
              />
            ) : (
              <p style={{ margin: 0 }}>{name}</p>
            )}
          </>
        );
      },
    },
    {
      dataIndex: 'electric',
      title: 'Электричество, Кв/ч',

      render: (name, record) => {
        return (
          <>
            {record.edit ? (
              <InputNumber
                value={currentBill?.electric}
                onChange={(val: any) => {
                  setCurrentBill({
                    ...currentBill,
                    electric: val,
                  });
                }}
              />
            ) : (
              <p style={{ margin: 0 }}>{name}</p>
            )}
          </>
        );
      },
    },
    {
      dataIndex: 'createDate',
      title: 'Дата добавления ',

      render: (name, record) => {
        return (
          <>
            {record.edit ? (
              <DatePicker
                value={dayjs(currentBill?.createDate)}
                onChange={(e) => {
                  setCurrentBill({
                    ...currentBill,
                    createDate: e,
                  });
                }}
              />
            ) : (
              // <DatePicker locale={locale} disabled value={dayjs(name)} />

              <>{dayjs(name).format('DD.MM.YYYY')}</>
            )}
          </>
        );
      },
      // render: (name) => moment(name),
    },
    {
      dataIndex: 'id',
      title: 'К оплате, руб.',
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
        } else {
          return <>-</>;
        }
      },
    },
    {
      dataIndex: '_id',
      title: 'Действия',
      render: (id, record) => {
        return (
          <Space>
            {record.edit ? (
              <>
                <Tooltip title="Сохранить изменения">
                  <Button
                    onClick={() => {
                      editBill(currentBill, id);
                    }}
                    type="primary"
                    ghost
                    // style={{ backgroundColor: '#OD2231' }}
                    shape="circle">
                    <SaveOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="Отменить изменения">
                  <Button
                    style={{ color: '#297ea0', borderColor: '#297ea0' }}
                    onClick={() => resetChanges()}
                    type="primary"
                    shape="circle"
                    ghost>
                    <RollbackOutlined />
                  </Button>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Редактировать запись">
                <Button
                  style={{ color: '#297ea0', borderColor: '#297ea0' }}
                  onClick={async () => {
                    await resetChanges();
                    await editData(record);
                  }}
                  shape="circle"
                  ghost>
                  <EditOutlined style={{ color: '#297ea0' }} />
                </Button>
              </Tooltip>
            )}
            <Popconfirm
              title="Вы уверены, что хотите удалить данный справочник?"
              okText="Удалить"
              cancelText="Отмена"
              placement="left"
              onConfirm={() => {
                // GuidesApi.deleteItem(this.props.endpoint, id).then(() => this.getAllData());
              }}>
              <Tooltip title="Удалить запись">
                <Button
                  style={{ color: '#297ea0', borderColor: '#297ea0' }}
                  className="actionRedButton"
                  type="primary"
                  shape="circle"
                  ghost>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </Popconfirm>
          </Space>
        );
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

  let node: any;
  if (typeof window === 'object') {
    // Check if document is finally loaded
    document.addEventListener('DOMContentLoaded', function () {
      alert('Finished loading');

      node = document?.getElementById('my-node');
    });
  }
  if (process.browser) {
    document.addEventListener('DOMContentLoaded', function () {
      alert('Finished loading');
      node = document?.getElementById('my-node');
    });
  }

  useEffect(() => {
    setBills(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps

    console.log('updated');
    form.setFieldsValue({
      electric: data[data.length - 1]?.electric,
    });
    form.setFieldsValue({
      hotWater: data[data.length - 1]?.hotWater,
    });
    form.setFieldsValue({
      coldWater: data[data.length - 1]?.coldWater,
    });
    form.setFieldsValue({
      createDate: dayjs(),
    });
    Kommunalka.Authme()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => router.push('login'));
  }, [data]);

  console.log('data в USEEFFECT => ', data);

  const [form] = Form.useForm();

  // form.setFieldsValue({
  //   electric: data[data.length - 1]?.electric,
  // });

  const editBill = (obj: DataType, id: any) => {
    Kommunalka.updateBill(obj, id).then(() => {
      Kommunalka.getBills().then((res) => setBills(res.data));
    });
  };
  const onFinish = (values: any) => {
    Kommunalka.postBill(
      values.coldWater,
      values.createDate,
      values.electric,
      values.hotWater,
      values.addPayment,
    ).then(() => {
      Kommunalka.getBills().then((res) => setBills(res.data));
    });
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const renderForm = () => {
    return (
      <Form
        form={form}
        // initialValues={{
        //   hotWater: bills[bills.length - 1]?.hotWater,
        // }}
        name="registerBills"
        labelCol={{
          span: 8,
        }}
        style={{ height: '100%' }}
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
          label={<Text style={{ WebkitTextFillColor: '#ffffffe0' }}>Горячая вода</Text>}
          name="hotWater">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label={<Text style={{ WebkitTextFillColor: '#ffffffe0' }}>Холодная вода</Text>}
          name="coldWater">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={<Text style={{ WebkitTextFillColor: '#ffffffe0' }}>Электричество</Text>}
          name="electric">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label={<Text style={{ WebkitTextFillColor: '#ffffffe0' }}>Дата</Text>}
          name="createDate">
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const RendCard = () => {
    return (
      <Card
        id="my-node"
        style={{
          backgroundColor: '#0D2231',
          height: '100%',
          // background: 'rgb(13,34,49)',
          background:
            'linear-gradient(63deg, rgba(13,34,49,1) 10%, rgba(17,90,120,1) 71%, rgba(47,134,170,1) 100%)',
        }}>
        <Space direction="vertical">
          <Title style={{ color: 'white' }}>
            Горячая вода: {bills[bills.length - 1]?.hotWater} м³{' '}
          </Title>
          <Title style={{ color: 'white' }}>
            Холодная вода: {bills[bills.length - 1]?.coldWater} м³{' '}
          </Title>
          <Title style={{ color: 'white' }}>
            Электричество: {bills[bills.length - 1]?.electric} Кв/ч{' '}
          </Title>

          <Title style={{ color: 'white' }}>
            К оплате:{' '}
            {totalSumm(
              user.ratioElec,
              bills[bills.length - 2]?.electric,
              bills[bills.length - 1]?.electric,
            ) +
              totalSumm(
                user.ratioCold,
                bills[bills.length - 2]?.coldWater,
                bills[bills.length - 1]?.coldWater,
              ) +
              totalSumm(
                user.ratioHot,
                bills[bills.length - 2]?.hotWater,
                bills[bills.length - 1]?.hotWater,
              ) +
              summOfOtvod(
                user.avatarUrl,
                bills[bills.length - 1]?.hotWater - bills[bills.length - 2]?.hotWater,
                bills[bills.length - 1]?.coldWater - bills[bills.length - 2]?.coldWater,
              )}{' '}
            руб.
          </Title>
          <Text style={{ position: 'absolute', color: 'white', bottom: 50, right: 50 }}>
            Показания от: {`${dayjs(bills[bills.length - 1]?.createDate).format('DD.MM.YYYY')}`}
          </Text>
        </Space>
      </Card>
    );
  };

  // const form = Form.useFormInstance();

  console.log(bills);
  return (
    <Card style={{ backgroundColor: '#E3EDF5', height: '100vh' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Table columns={columns} dataSource={bills} />
        </Col>

        <Col span={8}>
          <Card style={{ backgroundColor: '#0D2231' }}> {renderForm()}</Card>
        </Col>
        <Col span={16}>
          <Tooltip title="Скачать показатели в формате PNG">
            <Button
              ghost
              style={{ position: 'absolute', right: 30, top: 10, zIndex: '1000' }}
              onClick={() => {
                if (document?.getElementById('my-node') as HTMLInputElement) {
                  htmlToImage
                    .toPng(document?.getElementById('my-node') as HTMLInputElement)
                    .then(function (dataUrl) {
                      var img = new Image();
                      img.src = dataUrl;
                      // document.body.appendChild(img);

                      download(dataUrl, 'my-node.png');
                    })
                    .catch(function (error) {
                      console.error('oops, something went wrong!', error);
                    });
                }
              }}>
              <CopyOutlined />
            </Button>
          </Tooltip>

          {RendCard()}
        </Col>
      </Row>
    </Card>
  );
}
