import axios, { AxiosResponse } from 'axios';
import { SetStateAction, useEffect, useState } from 'react';
interface DataType {
  _id: string;
  hotWater: number;
  coldWater: number;
  electric: number;
  addPayment: number[];
  user: {
    _id: string;
    fullName: string;
    email: string;
    hash: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const useAxiosFetch = (methodUrl: any) => {
  const [data, setData] = useState<DataType[]>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unmounted = false;
    const source = axios.CancelToken.source();

    methodUrl()
      .then((a: AxiosResponse) => {
        if (!unmounted) {
          setData(a.data);
          setLoading(false);
        }
      })
      .catch(function (e: { message: any | SetStateAction<null> }) {
        if (!unmounted) {
          setError(true);
          setErrorMessage(e.message);
          setLoading(false);
          if (axios.isCancel(e)) {
            console.log(`request cancelled:${e.message}`);
          } else {
            console.log('another error happened:' + e.message);
          }
        }
      });

    return function () {
      unmounted = true;
      source.cancel('Cancelling in cleanup');
    };
  }, [methodUrl]);

  return { data, loading, error, errorMessage };
};

export default useAxiosFetch;
