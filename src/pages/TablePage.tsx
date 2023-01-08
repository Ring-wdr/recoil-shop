import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Table } from '../components/Table';
import { TableHeader } from '../components/TableHeader';
import { cartState } from '../recoil/cart';
import styles from './css/tablepage.module.css';

export const TablePage = () => {
  const [{ contents, headers }] = useRecoilState(cartState);
  const nav = useNavigate();
  const orderFn = () => {
    if (confirm('정말 주문하시겠습니까?')) {
      alert(`주문이 완료되었습니다.`);
      nav('/');
    } else {
      alert('주문이 취소되었습니다.');
    }
  };
  return (
    <div className={styles.page}>
      청구서
      <Table contents={contents} headers={headers} onClick={orderFn}>
        <TableHeader order={1} originName='isChecked' label='체크' />
        <TableHeader order={2} originName='name' label='이름' />
        <TableHeader order={3} originName='cnt' label='수량' />
        <TableHeader order={4} originName='price' label='가격' />
      </Table>
    </div>
  );
};
