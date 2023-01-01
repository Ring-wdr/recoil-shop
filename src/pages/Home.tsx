import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { textState } from '../recoil/text';

export const Home = () => {
  const value = useRecoilValue(textState);
  const setValue = useSetRecoilState(textState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(() => `${e.target.value}`);

  return (
    <div>
      <div>value Test: {value}</div>
      <input onChange={changeValue} placeholder='input text' />
    </div>
  );
};
