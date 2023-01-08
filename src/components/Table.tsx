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
  const [eachChk, setEachChk] = useState<Set<number>>(
    new Set(
      cart.reduce(
        (res: number[], { id, isChecked }) => (isChecked ? [...res, id] : res),
        []
      )
    )
  );
  const orderedHead = useMemo(
    () => Object.keys(cart[0]).filter((key) => key !== 'isChecked'),
    []
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum: number, { id, price, cnt }) =>
          eachChk.has(id) ? sum + price * cnt : sum,
        0
      ),
    [cart, eachChk]
  );

  const eachChangeCtl = (id: number) =>
    setEachChk((prevSet) => {
      const temp = new Set<number>([...prevSet]);
      temp.has(id) ? temp.delete(id) : temp.add(id);

      temp.size === cart.length && setHead(true);
      temp.size === 0 && setHead(false);
      return temp;
    });

  const allChangeCtl = (head: boolean) =>
    setEachChk(() => (head ? new Set() : new Set(cart.map(({ id }) => id))));

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
                  checked={eachChk.has(item.id)}
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
