import { lazy, LazyExoticComponent } from "react";

const Home = lazy(() =>
  import("../pages/Home").then(({ Home }) => ({ default: Home }))
);
const ShopList = lazy(() =>
  import("../pages/ShopList").then(({ ShopList }) => ({ default: ShopList }))
);
const About = lazy(() =>
  import("../pages/About").then(({ About }) => ({ default: About }))
);
const TablePage = lazy(() =>
  import("../pages/TablePage").then(({ TablePage }) => ({ default: TablePage }))
);
const Swipe = lazy(() =>
  import("../pages/Swipe").then(({ Swipe }) => ({ default: Swipe }))
);
const Grape = lazy(() =>
  import("../pages/Grape").then(({ Grape }) => ({ default: Grape }))
);
const Drag = lazy(() =>
  import("../pages/Drag").then(({ Drag }) => ({ default: Drag }))
);

export const RouteArr: [number, string, LazyExoticComponent<any>][] = [
  [1, "/", Home],
  [2, "/shoplist", ShopList],
  [3, "/swipe", Swipe],
  [4, "/table", TablePage],
  [5, "/about", About],
  [6, "/grape", Grape],
  [7, "/drag", Drag],
];
