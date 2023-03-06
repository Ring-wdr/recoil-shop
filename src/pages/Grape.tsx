import { MouseEvent, useState } from "react";
import styles from "./css/grape.module.css";
import global from "./css/global.module.css";

const buttonArr = Array.from({ length: 9 }, (_, idx) => idx);

export const Grape = () => {
  const [adult, setAdult] = useState(0);
  const [youth, setYouth] = useState(0);
  const [remain, setRemain] = useState(
    Array<[number, boolean][]>(3).fill(
      Array.from({ length: 13 }, (_, idx) => [idx + 1, false])
    )
  );
  const occupiedCnt = remain.reduce(
    (result, row) => result + row.filter(([, occupy]) => occupy).length,
    0
  );
  const buttonDisabled = (occupy: boolean) =>
    adult + youth === 0 || (!occupy && occupiedCnt >= adult + youth);

  const calculatedAmount = (() => {
    let answer = 0;
    let temp = occupiedCnt;
    const firstConsider = Math.min(adult, occupiedCnt);
    answer += firstConsider * 10000;
    temp -= firstConsider;
    firstConsider >= 0 && (answer += temp * 7000);
    return answer;
  })();

  const onAdultClick = (e: MouseEvent<HTMLButtonElement>) => {
    const clickedValue = Number(e.currentTarget.value);
    clickedValue + youth >= occupiedCnt
      ? setAdult(clickedValue)
      : alert("선택된 좌석 수 보다 적은 인원을 선택할 수 없습니다");
  };
  const onYouthClick = (e: MouseEvent<HTMLButtonElement>) => {
    const clickedValue = Number(e.currentTarget.value);
    adult + clickedValue >= occupiedCnt
      ? setYouth(clickedValue)
      : alert("선택된 좌석 수 보다 적은 인원을 선택할 수 없습니다");
  };
  const onSeatOccupy = (row: number, currIdx: number) =>
    setRemain((prev) => [
      ...prev.slice(0, row),
      prev[row].map(([idx, occupy]) =>
        idx === currIdx ? [idx, !occupy] : [idx, occupy]
      ),
      ...prev.slice(row + 1),
    ]);

  return (
    <div className={global.container}>
      <table className={styles.many}>
        <tbody>
          <tr>
            <th>어른</th>
            <td>
              {buttonArr.map((num) => (
                <button
                  className={adult === num ? "toggle" : ""}
                  key={`adult${num}`}
                  onClick={onAdultClick}
                  value={num}
                >
                  {num}
                </button>
              ))}
            </td>
            <th>잔여좌석</th>
            <td>{39 - occupiedCnt}/39</td>
          </tr>
          <tr>
            <th>
              어린이/
              <br />
              청소년
            </th>
            <td>
              {buttonArr.map((num) => (
                <button
                  className={youth === num ? "toggle" : ""}
                  key={`child${num}`}
                  onClick={onYouthClick}
                  value={num}
                >
                  {num}
                </button>
              ))}
            </td>
            <th>총 금액:</th>
            <td>{calculatedAmount}원</td>
          </tr>
        </tbody>
      </table>
      좌석 선택
      <div className={styles.seats}>
        <div>A</div>
        <div>
          {remain[0].map(([num, occupy]) => (
            <button
              className={occupy ? styles.toggle : ""}
              key={`remain1${num}`}
              onClick={() => onSeatOccupy(0, num)}
              value={num}
              disabled={buttonDisabled(occupy)}
            >
              {num}
            </button>
          ))}
        </div>
        <div>B</div>
        <div>
          {remain[1].map(([num, occupy]) => (
            <button
              className={occupy ? styles.toggle : ""}
              key={`remain2${num}`}
              onClick={() => onSeatOccupy(1, num)}
              value={num}
              disabled={buttonDisabled(occupy)}
            >
              {num}
            </button>
          ))}
        </div>
        <div>C</div>
        <div>
          {remain[2].map(([num, occupy]) => (
            <button
              className={occupy ? styles.toggle : ""}
              key={`remain3${num}`}
              onClick={() => onSeatOccupy(2, num)}
              value={num}
              disabled={buttonDisabled(occupy)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
