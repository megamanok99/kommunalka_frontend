import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Liquid } from '@ant-design/plots';

export const LiquidPlot = ({ config, url }) => {
  const [data, setData] = useState(0);
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    url()
      .then((json) => setData(json.data))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  // const config = {
  //   percent: 0.65,
  //   shape: 'diamond',
  //   outline: {
  //     border: 4,
  //     distance: 8,
  //   },
  //   wave: {
  //     length: 128,
  //   },
  //   pattern: {
  //     type: 'line',
  //   },
  // };
  return <Liquid {...config} percent={data} />;
};
