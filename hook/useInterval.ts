import {useEffect, useRef} from "react";
import {clearInterval} from "timers";

interface UseIntervalProps {
  callback: () => void;
  delay: number | null;
}

  const useInterval = ({callback, delay}: UseIntervalProps) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay === null) return;

    const callbackFunc = () => {
      if (!savedCallback.current) return;
      savedCallback.current();
    }

    const timerId = setInterval(callbackFunc, delay);
    return () => clearInterval(timerId);
  }, [delay]);

}

export default useInterval;
