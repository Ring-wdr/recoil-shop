import { AgGridReact } from 'ag-grid-react';
import { createContext, useCallback, useMemo, useState } from 'react';
import {
  AgTableContextAction,
  AgTableContextState,
  AgTableProps,
} from 'types/AgTable';
import { TableHeaderProps } from 'types/TableHeader';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export const TblHeaderCxt = createContext<AgTableContextState>([]);
export const TblActionCxt = createContext<AgTableContextAction | null>(null);

export const AgTable = ({ rowData, children }: AgTableProps) => {
  const [column, setColumn] = useState<TableHeaderProps[]>([]);
  const columnChange = useCallback((newHeader: TableHeaderProps) => {
    setColumn((headers) =>
      headers.find((header) => header.field === newHeader.field)
        ? headers
        : [...headers, newHeader]
    );
  }, []);
  const columnDefs = useMemo(() => {
    const temp = [...column];
    temp.sort((a, b) => (a.order || 99) - (b.order || 0));
    return temp.map((header, idx) =>
      idx === 0
        ? { ...header, headerCheckboxSelection: true, checkboxSelection: true }
        : header
    );
  }, [column]);
  const defaultColDef = useMemo(
    () => ({
      // make columns resizable
      resizable: true,
    }),
    []
  );

  return (
    <TblHeaderCxt.Provider value={column}>
      <TblActionCxt.Provider value={columnChange}>
        <AgGridReact
          className='ag-theme-alpine'
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection='multiple'
        />
        {children}
      </TblActionCxt.Provider>
    </TblHeaderCxt.Provider>
  );
};
