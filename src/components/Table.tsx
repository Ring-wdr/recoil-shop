import { useId, useMemo, useState } from 'react';
import { HeaderType, ICartState } from '../recoil/cart';
import styles from './css/table.module.css';

interface TableProps {
  contents: ICartState[];
  headers: HeaderType[];
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Table = ({ contents, headers, children, onClick }: TableProps) => {
  const headerID = useId();
  const [head, setHead] = useState(false);
  const [eachChk, setEachChk] = useState(
    new Set(
      contents.reduce(
        (res: number[], { id, isChecked }) => (isChecked ? [...res, id] : res),
        []
      )
    )
  );

  const totalPrice = useMemo(
    () =>
      contents.reduce(
        (sum: number, { id, price, cnt }) =>
          eachChk.has(id) ? sum + price * cnt : sum,
        0
      ),
    [contents, eachChk]
  );

  const eachChangeCtl = (id: number) =>
    setEachChk((prevSet) => {
      const temp = new Set([...prevSet]);
      temp.has(id) ? temp.delete(id) : temp.add(id);

      temp.size === contents.length && setHead(true);
      temp.size === 0 && setHead(false);
      return temp;
    });

  const allChangeCtl = (head: boolean) =>
    setEachChk(() =>
      head ? new Set() : new Set(contents.map(({ id }) => id))
    );

  return (
    <div>
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
            {headers
              .filter(({ origin }) => origin !== 'isChecked')
              .map(({ origin, label }) => (
                <th key={`${origin}${label}`}>{label}</th>
              ))}
          </tr>
          {children}
        </thead>
        <tbody>
          {contents.map((item) => {
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
                {headers
                  .filter(({ origin }) => origin !== 'isChecked')
                  .map(({ origin }) => (
                    <td key={`${origin}-${item.id}`}>
                      {item[origin as keyof ICartState]}
                    </td>
                  ))}
              </tr>
            );
          })}
          <tr>
            <td colSpan={headers.length - 1}>Total</td>
            <td>{totalPrice}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => onClick && onClick()}>최종결제</button>
    </div>
  );
};
