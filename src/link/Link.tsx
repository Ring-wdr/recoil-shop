import { lazy, LazyExoticComponent } from "react";

const Home = lazy(() =>
  import("../pages/Home").then((module) => ({ default: module.Home }))
);
// const Cart = lazy(() =>
//   import('../pages/Cart').then((module) => ({ default: module.Cart }))
// );
const ShopList = lazy(() =>
  import("../pages/ShopList").then((module) => ({ default: module.ShopList }))
);
const About = lazy(() =>
  import("../pages/About").then((module) => ({ default: module.About }))
);
const TablePage = lazy(() =>
  import("../pages/TablePage").then((module) => ({ default: module.TablePage }))
);
const AGTable = lazy(() =>
  import("../pages/AG-grid").then((module) => ({ default: module.AgGrid }))
);
const Swipe = lazy(() =>
  import("../pages/Swipe").then((module) => ({ default: module.Swipe }))
);

export const RouteArr: [number, string, LazyExoticComponent<any>][] = [
  [1, "/", Home],
  [2, "/shoplist", ShopList],
  [3, "/swipe", Swipe],
  [4, "/table", TablePage],
  [5, "/about", About],
  [6, "/chart", AGTable],
];
