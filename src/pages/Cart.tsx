import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartState, ICartState } from '../recoil/cart';
import styles from './css/cart.module.css';

export const Cart = () => {
  const [cart] = useRecoilState<ICartState[]>(cartState);
  const nav = useNavigate();

  const totalPrice = useMemo(
    () => cart.reduce((sum: number, { price, cnt }) => sum + price * cnt, 0),
    [cart]
  );
  return (
    <div className={styles.cart}>
      <div>청구서</div>
      <ul>
        {cart?.length > 0
          ? cart.map(({ id, name, price, cnt }) => (
              <li key={id}>
                <div>{name}</div>
                <div>
                  x {cnt} ={price * cnt}
                </div>
              </li>
            ))
          : null}
      </ul>
      <div>총 금액: {totalPrice}</div>
      <button
        onClick={() => {
          if (confirm('정말 주문하시겠습니까?')) {
            alert(`주문이 완료되었습니다. 주문금액: ${totalPrice}`);
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
