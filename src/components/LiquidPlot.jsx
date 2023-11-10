import { useEffect, useState } from 'react';

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
  return;
};
