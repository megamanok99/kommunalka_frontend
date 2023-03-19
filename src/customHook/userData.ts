import { useEffect, useState } from 'react';

function useFetchData(method: any) {
  const [data, setData] = useState([]);

  useEffect(() => {
    method.then((data: []) => setData(data)).catch((err: any) => console.log(`Error: ${err}`));
  }, [method]);

  return { data };
}

export default useFetchData;
