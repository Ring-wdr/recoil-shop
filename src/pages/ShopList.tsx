import { useRecoilState } from 'recoil';
import { shopListArr } from '../data/shopList';
import { cartState, ICartState } from '../recoil/cart';
import styles from './css/shoplist.module.css';

export const ShopList = () => {
  const [cart, setCart] = useRecoilState<ICartState[]>(cartState);
  // const setCart = useSetRecoilState(cartState);

  /**
   * 포카 수량 변경 메서드
   * @param {number} addedId - 수량 추가되는 포카
   * @param {boolean} direction - (true: 추가, false: 감소)
   */
  const mutatePoca = (addedId: number, direction: boolean) => {
    setCart((oldCart) =>
      oldCart.map(({ id, name, cnt, price }) =>
        id !== addedId
          ? {
              id,
              name,
              cnt,
              price,
            }
          : {
              id,
              name,
              cnt: direction ? cnt + 1 : cnt !== 0 ? cnt - 1 : cnt,
              price,
            }
      )
    );
  };

  return (
    <div className={styles.shoplist}>
      {shopListArr.length > 0
        ? shopListArr.map(([key, name, price, src]) => (
            <div key={key} className={styles.shopitem}>
              <img src={src} width={287} height={450} alt={name} />
              <div className='name'>이름: {name}</div>
              <div className='price'>가격: {price}</div>
              <div className={styles.cnt}>
                <button onClick={() => mutatePoca(key, true)}>+</button>
                <div>{cart[key - 1]?.cnt}</div>
                <button onClick={() => mutatePoca(key, false)}>-</button>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};
