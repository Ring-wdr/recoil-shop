import { useEffect, useState } from 'react';
import axios from 'axios';

export const useAxios = <T,>(url: string) => {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    const ctl = new AbortController();
    const { signal } = ctl;
    (async () => {
      const { data: res } = await axios.get<T[]>(url, { signal });
      setData(res);
    })();
    return () => {
      data.length === 0 && ctl.abort();
    };
  }, []);

  return data;
};
