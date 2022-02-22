import React from "react";
import type { EffectCallback } from "react";

export const useEffectOnce = (effect: EffectCallback) => {
  React.useEffect(effect, []);
};
