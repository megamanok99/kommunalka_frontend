import { useState, useEffect } from 'react';

const useSessionStorage = (name: any) => {
  const [value, setValue] = useState();

  useEffect(() => {
    return setValue(sessionStorage?.getItem(name) && null);
  }, []);

  return value;
};

export default useSessionStorage;
