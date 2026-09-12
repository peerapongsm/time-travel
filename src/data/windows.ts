import type { Window } from "../domain";

export const windows: Window[] = [
  { start: -2999, end: -2000 },
  { start: -1999, end: -1000 },
  { start: -999, end: -500 },
  { start: -499, end: 0 },
  { start: 1, end: 249 },
  { start: 250, end: 499 },
  { start: 500, end: 749 },
  { start: 750, end: 999 },
  { start: 1000, end: 1099 },
  { start: 1100, end: 1199 },
  { start: 1200, end: 1299 },
  { start: 1300, end: 1399 },
  { start: 1400, end: 1499 },
  { start: 1500, end: 1549 },
  { start: 1550, end: 1599 },
  { start: 1600, end: 1649 },
  { start: 1650, end: 1699 },
  { start: 1700, end: 1749 },
  { start: 1750, end: 1799 },
  ...Array.from({ length: 15 }, (_, index) => {
    const start = 1800 + index * 10;
    return { start, end: start + 9 };
  }),
  ...Array.from({ length: 10 }, (_, index) => {
    const start = 1950 + index * 5;
    return { start, end: start + 4 };
  }),
  ...Array.from({ length: 8 }, (_, index) => {
    const start = 2000 + index * 2;
    return { start, end: start + 1 };
  }),
  ...Array.from({ length: 11 }, (_, index) => ({ start: 2016 + index, end: 2016 + index }))
];
