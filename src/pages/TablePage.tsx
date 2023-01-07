import { Table } from '../components/Table';
import styles from './css/tablepage.module.css';

export const TablePage = () => {
  return (
    <div className={styles.page}>
      <Table />
    </div>
  );
};
