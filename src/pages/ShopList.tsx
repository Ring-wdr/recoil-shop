import { useRecoilState } from "recoil";
import { shopListArr } from "../data/shopList";
import { cartState } from "../recoil/cart";
import styles from "./css/shoplist.module.css";

export const ShopList = () => {
  const [{ contents: cart }, setCart] = useRecoilState(cartState);

  /**
   * 포카 수량 변경 메서드
   * @param {number} addedId - 수량 추가되는 포카
   * @param {boolean} direction - (true: 추가, false: 감소)
   */
  const mutatePoca = (addedId: number, direction: boolean) => {
    setCart(({ headers, contents }) => ({
      headers,
      contents: contents.map((item) =>
        item.id !== addedId
          ? item
          : {
              ...item,
              cnt: direction
                ? item.cnt + 1
                : item.cnt !== 0
                ? item.cnt - 1
                : item.cnt,
              isChecked: direction || item.cnt !== 1,
            }
      ),
    }));
  };

  return (
    <div className={styles.shoplist}>
      {shopListArr.length > 0
        ? shopListArr.map(([key, category, name, price, src]) => (
            <div key={key} className={styles.shopitem}>
              <img src={src} width={287} height={450} alt={name} />
              <div className="name">이름: {name}</div>
              <div className="category">카테고리: {category}</div>
              <div className="price">가격: {price}</div>
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
