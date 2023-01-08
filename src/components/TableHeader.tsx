import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../recoil/cart';

interface TableHeaderProps {
  order: number;
  originName: string;
  label: string;
}

export const TableHeader = ({ order, originName, label }: TableHeaderProps) => {
  const [, setHeader] = useRecoilState(cartState);
  useEffect(() => {
    setHeader(({ contents, headers }) => ({
      contents,
      headers: headers.find(({ origin }) => origin === originName)
        ? [...headers].sort((a, b) => a.order - b.order)
        : [...headers, { order, label, origin: originName }].sort(
            (a, b) => a.order - b.order
          ),
    }));
  }, []);
  return <></>;
};
