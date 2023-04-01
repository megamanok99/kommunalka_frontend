import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Gauge } from '@ant-design/plots';
import Kommunalka from '@/ApiConnecor/Auth';

export const DemoGauge = () => {
  const [data, setData] = useState(0);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    Kommunalka.getMeterGaugePlot()
      .then((json: any) => setData(json.data))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    percent: data,
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
  };
  return <Gauge {...config} />;
};
