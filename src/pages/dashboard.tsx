import Kommunalka from '@/ApiConnecor/Auth';
import { Card, Form, Typography } from 'antd';
import { useEffect, useState } from 'react';

import { DataType, userModel } from '@/interface';
import { useRouter } from 'next/router';
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
      {/* <Row
        gutter={[32, 32]}
        style={{
          backgroundColor: '#ffffff',
          padding: '30px',
          height: '100%',
          // background: 'rgb(13,34,49)',
          // background:
          //   'linear-gradient(63deg, rgba(13,34,49,1) 10%, rgba(17,90,120,1) 71%, rgba(47,134,170,1) 100%)',
        }}>
        <Col span={12}>
          <Title>Динамика расхода</Title>
          <DemoLine />
        </Col>

        <Col span={12}>
          <Title>Отношение суммы крайней оплаты к среднему показателю</Title>
          <DemoGauge />
        </Col>

        <Col span={8}>
          <Title>Перерасход горячей воды к среднему значению</Title>
          <LiquidPlot
            config={{
              type: 'meter',
              theme: {
                styleSheet: {
                  brandColor: '#FAAD14',
                },
              },
              innerRadius: 0.75,
              range: {
                ticks: [0, 1 / 3, 2 / 3, 1],
                color: ['#F4664A', '#FAAD14', '#30BF78'],
              },
              indicator: {
                pointer: {
                  style: {
                    stroke: '#D0D0D0',
                  },
                },
                pin: {
                  style: {
                    stroke: '#D0D0D0',
                  },
                },
              },
              statistic: {
                content: {
                  style: {
                    fontSize: '36px',
                    lineHeight: '36px',
                  },
                },
              },
            }}
            url={Kommunalka.getLiquidHot}
          />
        </Col>
        <Col span={8}>
          <Title>Перерасход холодной воды к среднему значению</Title>
          <LiquidPlot
            config={{
              type: 'meter',
              innerRadius: 0.75,
              range: {
                ticks: [0, 1 / 3, 2 / 3, 1],
                color: ['#F4664A', '#FAAD14', '#30BF78'],
              },
              indicator: {
                pointer: {
                  style: {
                    stroke: '#D0D0D0',
                  },
                },
                pin: {
                  style: {
                    stroke: '#D0D0D0',
                  },
                },
              },
              statistic: {
                content: {
                  style: {
                    fontSize: '36px',
                    lineHeight: '36px',
                  },
                },
              },
            }}
            url={Kommunalka.getLiquidCold}
          />
        </Col>
        <Col span={8}>
          <Title>Перерасход электричества к среднему значению</Title>
          <LiquidPlot
            config={{
              type: 'meter',
              theme: {
                styleSheet: {
                  brandColor: '#51cd70',
                },
              },
              shape: 'diamond',
              innerRadius: 0.75,
              range: {
                ticks: [0, 1 / 3, 2 / 3, 1],
                color: ['#F4664A', '#FAAD14', '#30BF78'],
              },
              indicator: {
                pointer: {
                  style: {
                    stroke: '#D0D0D0',
                  },
                },
                pin: {
                  style: {
                    stroke: '#D0D0D0',
                  },
                },
              },
              statistic: {
                content: {
                  style: {
                    fontSize: '36px',
                    lineHeight: '36px',
                    stroke: 'red',
                  },
                },
              },
            }}
            url={Kommunalka.getLiquidElectric}
          />
        </Col>
      </Row> */}
    </Card>
  );
}
