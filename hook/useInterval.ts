import { clearInterval } from 'timers';
import { useEffect, useRef } from 'react';

interface UseIntervalProps {
  callback: () => void;
  delay: number | null;
}

const useInterval = ({ callback, delay }: UseIntervalProps) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay === null) return;

    const callbackFunc = () => {
      if (!savedCallback.current) return;
      savedCallback.current();
    };

    const timerId = setInterval(callbackFunc, delay);

    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(timerId);
    };
  }, [delay]);
};

export default useInterval;
