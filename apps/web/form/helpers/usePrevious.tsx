import React from "react";

export function usePrevious<T>(state: T): T | undefined {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = state;
  });

  return ref.current;
}
