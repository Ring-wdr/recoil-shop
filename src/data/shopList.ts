export type ShopListItem = [
  key: number,
  category: number, // [1: poca, 2: etc]
  name: string,
  price: number,
  imgsrc: string
];

export const shopListArr: ShopListItem[] = [
  [
    1,
    1,
    'KIMCHAEWON',
    10000,
    'https://sourcemusic.com/resources/main/937b1740-c642-4dde-b308-1e690b95fad3.jpg',
  ],
  [
    2,
    1,
    'SAKURA',
    10000,
    'https://sourcemusic.com/resources/main/435b49e6-5350-4894-9ab1-12e1aa6bc819.jpg',
  ],
  [
    3,
    1,
    'JENIFERHUH',
    10000,
    'https://sourcemusic.com/resources/main/6053acd7-ddd2-4f72-95aa-4e69a5d5fca7.jpg',
  ],
  [
    4,
    1,
    'KAZUHA',
    10000,
    'https://sourcemusic.com/resources/main/8497496b-b9ad-4610-9a15-69f2e73eea39.jpg',
  ],
  [
    5,
    1,
    'HONGENCHAE',
    10000,
    'https://sourcemusic.com/resources/main/13b3a899-2871-47a4-a22a-35b12169cb73.jpg',
  ],
];
