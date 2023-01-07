import { useState } from 'react';

const rows = [
  { id: 1, name: 'Row 1', checked: true },
  { id: 2, name: 'Row 2', checked: false },
  { id: 3, name: 'Row 3', checked: false },
];

type ObjType = {
  [index: string]: boolean;
};
export const Table = () => {
  const [head, setHead] = useState(false);
  const [eachChk, setEachChk] = useState<ObjType>(
    Object.fromEntries(rows.map(({ id, checked }) => [id, checked]))
  );

  const eachChangeCtl = (id: string) =>
    setEachChk((prevChk) => {
      const temp = prevChk?.val
        ? { ...prevChk, [id]: true }
        : { ...prevChk, [id]: !prevChk[id] };
      Object.keys(temp).length === rows.length &&
        Object.values(temp).every((value) => value === true) &&
        setHead(true);
      Object.keys(temp).length === rows.length &&
        Object.values(temp).every((value) => value === false) &&
        setHead(false);
      return temp;
    });

  const allChangeCtl = (head: boolean) =>
    setEachChk(() =>
      head ? {} : Object.fromEntries(rows.map(({ id }) => [id, !head]))
    );

  return (
    <table>
      <thead>
        <tr>
          <th>
            <input
              type='checkbox'
              checked={head}
              onChange={() => {
                allChangeCtl(head);
                setHead((prev) => !prev);
              }}
            />
          </th>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => {
          return (
            <tr key={row.id}>
              <td>
                <input
                  type='checkbox'
                  checked={eachChk?.[String(row.id)] === true}
                  onChange={() => {
                    eachChangeCtl(String(row.id));
                  }}
                />
              </td>
              <td>{row.id}</td>
              <td>{row.name}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
