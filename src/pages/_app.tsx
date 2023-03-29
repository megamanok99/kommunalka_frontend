import '@/styles/globals.css';
import { ConfigProvider, theme } from 'antd';
import type { AppProps } from 'next/app';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import React from 'react';
// import { Content, Footer, Header } from 'antd/es/layout/layout';
const { Header, Content, Footer, Sider } = Layout;
export default function App({ Component, pageProps }: AppProps) {
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
        //     colorTextHeading: '#E3EDF5',
        //     colorBgContainer: '#b4c2c6',
        //   },
        // },
      }}>
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['4']}
            items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
              (icon, index) => ({
                key: String(index + 1),
                icon: React.createElement(icon),
                label: `nav ${index + 1}`,
              }),
            )}
          />
        </Sider>
        <Layout>
          <Header>
            <Button>test</Button>
          </Header>

          <Content
            style={{
              margin: '24px 16px 0',
            }}>
            <Component {...pageProps} />
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
