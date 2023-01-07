import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Table } from '../components/Table';
import { cartState, ICartState } from '../recoil/cart';
import styles from './css/tablepage.module.css';

export const TablePage = () => {
  const [cart] = useRecoilState<ICartState[]>(cartState);
  const nav = useNavigate();
  return (
    <div className={styles.page}>
      청구서
      <Table cart={cart} />
      <button
        onClick={() => {
          if (confirm('정말 주문하시겠습니까?')) {
            alert(`주문이 완료되었습니다.`);
            nav('/');
          } else {
            alert('주문이 취소되었습니다.');
          }
        }}
      >
        최종결제
      </button>
    </div>
  );
};
