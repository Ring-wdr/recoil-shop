import { ColDef, ColGroupDef } from 'ag-grid-community';

interface ExtraProps {
  order?: number;
  field: string;
}
export type TableHeaderProps = (ColDef | ColGroupDef) & ExtraProps;
