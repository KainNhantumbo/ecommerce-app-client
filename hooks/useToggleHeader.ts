'use client';

import { useEffect, useState } from 'react';
import { useInnerWindowSize } from './useInnerWindowSize';

export const useToggleHeader = (breakpoint: number) => {
  const windowInnerSize = useInnerWindowSize();
  const [isBreakPoint, setIsBreakPoint] = useState<boolean>(false);

  useEffect((): void => {
    windowInnerSize.width > breakpoint
      ? setIsBreakPoint(true)
      : setIsBreakPoint(false);
  }, [windowInnerSize]);

  return {
    isBreakPoint,
    onToggleReveal: () => setIsBreakPoint((current) => !current)
  };
};
