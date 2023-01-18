import { ReactNode } from 'react';
import { TableHeaderProps } from './TableHeader';

export interface AgTableProps {
  rowData: Array<Any>;
  children: ReactNode;
}

export type AgTableContextState = TableHeaderProps[] | null;
export type AgTableContextAction = (newHeader: TableHeaderProps) => void;
