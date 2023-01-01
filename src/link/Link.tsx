import { lazy, LazyExoticComponent } from 'react';

const Home = lazy(() =>
  import('../pages/Home').then((module) => ({ default: module.Home }))
);
const Cart = lazy(() =>
  import('../pages/Cart').then((module) => ({ default: module.Cart }))
);
const ShopList = lazy(() =>
  import('../pages/ShopList').then((module) => ({ default: module.ShopList }))
);
const About = lazy(() =>
  import('../pages/About').then((module) => ({ default: module.About }))
);

export const RouteArr: [number, string, LazyExoticComponent<any>][] = [
  [1, '/', Home],
  [2, '/cart', Cart],
  [3, '/shoplist', ShopList],
  [4, '/about', About],
];
