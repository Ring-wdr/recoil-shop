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
const TablePage = lazy(() =>
  import('../pages/TablePage').then((module) => ({ default: module.TablePage }))
);

export const RouteArr: [number, string, LazyExoticComponent<any>][] = [
  [1, '/', Home],
  [2, '/shoplist', ShopList],
  [3, '/cart', Cart],
  [4, '/table', TablePage],
  [5, '/about', About],
];
