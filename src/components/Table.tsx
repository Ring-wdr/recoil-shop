import { useId, useMemo, useState } from 'react';
import { ICartState } from '../recoil/cart';
import styles from './css/table.module.css';

interface TableProps {
  cart: ICartState[];
  children?: JSX.Element;
}

export const Table = ({ cart, children }: TableProps) => {
  const headerID = useId();
  const [head, setHead] = useState(false);
  const [eachChk, setEachChk] = useState<Map<number, boolean>>(
    new Map(cart.map(({ id, isChecked }) => [id, isChecked]))
  );
  const orderedHead = useMemo(
    () => Object.keys(cart[0]).filter((key) => key !== 'isChecked'),
    []
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum: number, { id, price, cnt }) =>
          eachChk.get(id) ? sum + price * cnt : sum,
        0
      ),
    [cart, eachChk]
  );

  const eachChangeCtl = (id: number) =>
    setEachChk((prevMap) => {
      const temp = new Map([...prevMap, [id, !prevMap.get(id)]]);
      const tempValues = [...temp.values()];
      tempValues.every((value) => value === true) && setHead(true);
      tempValues.every((value) => value === false) && setHead(false);
      return temp;
    });

  const allChangeCtl = (head: boolean) =>
    setEachChk(() => new Map(cart.map(({ id }) => [id, !head])));

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <>
              <input
                type='checkbox'
                id={headerID}
                checked={head}
                onChange={() => {
                  allChangeCtl(head);
                  setHead((prev) => !prev);
                }}
              />
              <label htmlFor={headerID} />
            </>
          </th>
          {orderedHead.map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => {
          const key = useId();
          return (
            <tr key={item.id}>
              <td>
                <input
                  type='checkbox'
                  id={key}
                  checked={eachChk.get(item.id)}
                  onChange={() => eachChangeCtl(item.id)}
                />
                <label htmlFor={key}></label>
              </td>
              {orderedHead.map((head) => (
                <td key={`${head}-${item.id}`}>
                  {item[head as keyof ICartState]}
                </td>
              ))}
            </tr>
          );
        })}
        <tr>
          <td colSpan={4}>Total</td>
          <td>{totalPrice}</td>
        </tr>
      </tbody>
    </table>
  );
};
