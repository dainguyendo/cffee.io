import { useState, useRef } from "react";

type Cycle = (i?: number) => void;

type CycleState<T> = [T, Cycle];

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function useCycle<T>(...items: T[]): CycleState<T> {
  const index = useRef(0);
  const [item, setItem] = useState(items[index.current]);

  return [
    item,
    (next?: number) => {
      index.current =
        typeof next !== "number"
          ? wrap(0, items.length, index.current + 1)
          : next;

      setItem(items[index.current]);
    },
  ];
}
