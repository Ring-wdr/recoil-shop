import { atom } from 'recoil';
import { shopListArr } from '../data/shopList';

export interface ICartState {
  isChecked: boolean;
  id: number;
  name: string;
  cnt: number;
  price: number;
}

export const cartState = atom<ICartState[]>({
  key: 'cart', // unique ID (with respect to other atoms/selectors)
  default: shopListArr.map(([key, name, price]) => ({
    isChecked: false,
    id: key,
    name,
    price,
    cnt: 0,
  })), // default value (aka initial value)
});
