import { useContext, useEffect } from 'react';
import { TableHeaderProps } from 'types/TableHeader';
import { TblActionCxt } from './AgTable';

export const AgTableHeader = (props: TableHeaderProps) => {
  const cxt = useContext(TblActionCxt);
  useEffect(() => {
    cxt && cxt(props);
  }, []);
  return <></>;
};
