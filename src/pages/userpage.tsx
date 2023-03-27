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
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { SaveOutlined, RollbackOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

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
      title: 'холодная вода',
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
      title: 'Горячая вода',
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
      title: 'Электричество',

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
      title: 'Дата добавления',

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

              <>{dayjs(name).format('YYYY/MM/DD')}</>
            )}
          </>
        );
      },
      // render: (name) => moment(name),
    },
    {
      dataIndex: 'id',
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
                    size="small"
                    style={{ backgroundColor: '#OD2231' }}
                    shape="circle"
                    ghost>
                    <SaveOutlined />
                  </Button>
                </Tooltip>
                <Tooltip title="Отменить изменения">
                  <Button
                    style={{ padding: 0 }}
                    onClick={() => resetChanges()}
                    type="primary"
                    size="small"
                    shape="circle"
                    ghost>
                    <RollbackOutlined />
                  </Button>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Редактировать запись">
                <Button
                  style={{ color: '#0D2231', borderColor: '#0D2231' }}
                  onClick={async () => {
                    await resetChanges();
                    await editData(record);
                  }}
                  shape="circle"
                  ghost>
                  <EditOutlined style={{ color: '#0D2231' }} />
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
                  className="actionRedButton"
                  type="primary"
                  size="small"
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

  useEffect(() => {
    setBills(data);
    console.log('updated');
    Kommunalka.Authme().then((res) => {
      setUser(res.data);
    });
  }, [data]);

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
        // labelCol={{
        //   span: 8,
        // }}
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
          label="Горячая вода"
          name="hotWater"
          style={{ WebkitTextFillColor: '#ffffffe0' }}
          // initialValue={bills[bills.length - 1]?.hotWater}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Холодная вода"
          name="coldWater"
          style={{ WebkitTextFillColor: '#ffffffe0' }}
          // initialValue={bills[bills.length - 1]?.coldWater}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="Электричество"
          style={{ WebkitTextFillColor: '#ffffffe0' }}
          name="electric"
          // initialValue={bills[bills.length - 1]?.electric}
        >
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          style={{ WebkitTextFillColor: '#ffffffe0' }}
          label="Дата внесения"
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

  const form = Form.useFormInstance();
  console.log(bills);
  return (
    <Card style={{ backgroundColor: '#E3EDF5', height: '100vh' }}>
      <Row>
        <Col span={24}>
          <Table columns={columns} dataSource={bills} />
        </Col>

        <Col span={8}>
          <Card style={{ backgroundColor: '#0D2231' }}> {renderForm()}</Card>
        </Col>
      </Row>
    </Card>
  );
}
