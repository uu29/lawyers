import styled from "@emotion/styled";
import {useEffect, useRef, useState} from "react";
import Image from 'next/image';

function TimerController () {
  const savedCallback = useRef<() => void>();
  const timerRef = useRef<NodeJS.Timer>();
  const [isRunning, setIsRunning] = useState(false);

  const [{hh, mm, ss}, setState] = useState({
    hh: 0,
    mm: 0,
    ss: 0,
  });

  const callback = () => {
    let _ss = ss;
    let _mm = mm;
    let _hh = hh;

    _ss = _ss + 1;

    if (_ss >= 60) {
      _mm = _mm + 1;
      _ss = 0;
    }

    if (_mm >= 60) {
      _hh = _hh + 1;
      _mm = 0;
    }
    setState((prev) => ({
      ...prev,
      hh : _hh,
      mm : _mm,
      ss: _ss,
    }));
  }

  useEffect(() => {
    savedCallback.current = callback;
  });

  const intervalCallback = () => {
    if (!savedCallback.current) return;
    savedCallback.current();
  }

  // 1 => 01
  const format = (num: number) => {
    return (num + '').length === 1 ? '0' + num : num + '';
  }

  const handleClick = () => {
    if (!isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(intervalCallback, 1000);
    }
    setIsRunning(!isRunning);
  }

  return (
    <PlayButton onClick={handleClick} isRunning={!isRunning}>
      {!isRunning ? <Image src="/pause.png" alt='정지' width={10} height={10} /> : <Image src="/play.png" alt='재생' width={10} height={10} />}
      <span>
        <Number>{format(hh)}</Number>
        :
        <Number>{format(mm)}</Number>
        :
        <Number>{format(ss)}</Number>
      </span>
    </PlayButton>
  );
}

const PlayButton = styled.button<{ isRunning: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 4px;
  height: 24px;
  background: #edeff1;
  border-radius: 4px;
  font-size: 16px;
  ${({isRunning}) => isRunning && 'color: #E7231E'};
`;

const Number = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
`;

export default TimerController;
