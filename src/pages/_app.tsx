import '@/styles/globals.css';
import { ConfigProvider, theme } from 'antd';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        // algorithm: theme.darkAlgorithm,
        token: {
          // // colorPrimary: '#00b96b',
          colorPrimary: '#54D46B',
        },
        components: {
          Table: {
            colorTextHeading: '#E3EDF5',
            colorBgContainer: '#b4c2c6',
          },
        },
      }}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
