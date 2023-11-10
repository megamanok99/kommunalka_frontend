import { useEffect, useState } from 'react';

const useSessionStorage = (name: any) => {
  const [value, setValue] = useState<string | null>();

  useEffect(() => {
    return setValue(sessionStorage?.getItem(name) && null);
  }, []);

  return value;
};

export default useSessionStorage;
