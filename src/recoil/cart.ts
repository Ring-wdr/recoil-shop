import { atom } from 'recoil';
import { shopListArr } from '../data/shopList';

export interface ICartState {
  isChecked: false;
  id: number;
  name: string;
  cnt: number;
  price: number;
}

export const cartState = atom<ICartState[]>({
  key: 'cart', // unique ID (with respect to other atoms/selectors)
  default: shopListArr.map(([key, name, price]) => ({
    id: key,
    name,
    price,
    cnt: 0,
    isChecked: false,
  })), // default value (aka initial value)
});
