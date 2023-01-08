import { atom } from 'recoil';
import { shopListArr } from '../data/shopList';

export interface ICartState {
  isChecked: boolean;
  category: number;
  id: number;
  name: string;
  cnt: number;
  price: number;
}

export const initState: ICartState[] = shopListArr.map(
  ([key, category, name, price]) => ({
    isChecked: false,
    category,
    id: key,
    name,
    price,
    cnt: 0,
  })
); // default value (aka initial value)

export type HeaderType = {
  order: number;
  origin: string;
  label: string;
};
const headers: HeaderType[] = [];

export const cartState = atom({
  key: 'cart', // unique ID (with respect to other atoms/selectors)
  default: { contents: initState, headers }, // default value (aka initial value)
});
