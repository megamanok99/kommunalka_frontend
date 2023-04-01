import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import Kommunalka from '@/ApiConnecor/Auth';

export const DemoLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    Kommunalka.getMultipleLinePlot()
      .then((json: any) => setData(json.data))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    data,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    yAxis: {
      label: {
        formatter: (v: any) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    // legend: {
    //   position: 'top',
    // },
    smooth: true,
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return <Line {...config} />;
};
