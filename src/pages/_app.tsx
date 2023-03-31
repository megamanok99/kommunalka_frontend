import '@/styles/globals.css';
import { Avatar, ConfigProvider, Space, theme, Typography } from 'antd';
import type { AppProps } from 'next/app';
import {
  AppstoreAddOutlined,
  LineChartOutlined,
  LoginOutlined,
  PoweroffOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import Kommunalka from '@/ApiConnecor/Auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

// import { Content, Footer, Header } from 'antd/es/layout/layout';
const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;
export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>({});
  const router = useRouter();
  useEffect(() => {
    Kommunalka.Authme()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {});
  }, []);

  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#54d46b',
          colorBgBase: '#f2f7fb',
          colorTextBase: '#0d2231',
        },

        // components: {
        //   Table: {
        //     colorBgContainer: '#70b6d2',

        //   },
        // },
      }}>
      <Layout>
        <Layout>
          <Header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link href={'/'}>
                <Title className="gradient-text">KOMMUNALKA</Title>
              </Link>

              <Space style={{ float: 'right' }}>
                <div>
                  <Text strong style={{ color: '#f2f7fb' }}>
                    {user?.fullName}
                  </Text>
                </div>

                {/* <AppNavigation />
                <BadgeBell /> */}
                {user._id ? (
                  <>
                    <Link href={'/userpage'}>
                      <Button
                        shape={'circle'}
                        size="large"
                        icon={<AppstoreAddOutlined />}
                        // onClick={this.props.exitUser}
                      ></Button>
                    </Link>

                    <Link href={'/dashboard'}>
                      <Button
                        shape={'circle'}
                        size="large"
                        icon={<LineChartOutlined />}
                        // onClick={this.props.exitUser}
                      ></Button>
                    </Link>

                    <Link href={'/aboutme'}>
                      <Button
                        shape={'circle'}
                        size="large"
                        icon={<UserOutlined />}
                        // onClick={this.props.exitUser}
                      ></Button>
                    </Link>
                    <Link href={'/'}>
                      <Button
                        shape={'circle'}
                        size="large"
                        icon={<PoweroffOutlined />}
                        onClick={() => {
                          sessionStorage.removeItem('token');
                        }}></Button>
                    </Link>
                  </>
                ) : (
                  <Link href={'/login'}>
                    <Button
                      shape={'circle'}
                      size="large"
                      icon={<LoginOutlined />}
                      // onClick={this.props.exitUser}
                    ></Button>
                  </Link>
                )}
              </Space>
            </div>
          </Header>

          <Content style={{}}>
            <Component {...pageProps} />
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}>
            Alex gorbunov ©2023 Created by Flareon
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
