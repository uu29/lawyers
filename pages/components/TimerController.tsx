import styled from "@emotion/styled";
import {useEffect, useRef, useState} from "react";
import Image from 'next/image';
import play from '../../public/play.png';
import pause from '../../public/pause.png';

function TimerController () {
  const savedCallback = useRef<() => void>();
  const timerRef = useRef<NodeJS.Timer>();
  const [isRunning, setIsRunning] = useState(false);

  const [{
    mm,
    ss,
    ms,
  }, setState] = useState({
    mm: 0,
    ss: 0,
    ms: 0
  });

  const callback = () => {
    let _ms = ms;
    let _ss = ss;
    let _mm = mm;

    _ms = _ms + 1;
    if (_ms >= 100) {
      _ss = _ss + 1;
      _ms = 0;
    }
    if (_ss >= 60) {
      _mm = _mm + 1;
      _ss = 0;
    }
    setState((prev) => ({
      ...prev,
      mm : _mm,
      ss: _ss,
      ms: _ms,
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
      timerRef.current = setInterval(intervalCallback, 10);
    }
    setIsRunning(!isRunning);
  }

  return (
    <PlayButton onClick={handleClick}>
      {isRunning ? <Image src={pause} alt='정지' width={10} height={10} /> : <Image src={play} alt='재생' width={10} height={10} />}
      <span>
        <Number>{format(mm)}</Number>
        :
        <Number>{format(ss)}</Number>
        :
        <Number>{format(ms)}</Number>
      </span>
    </PlayButton>
  );
}

const PlayButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  column-gap: 4px;
  height: 24px;
  margin: 0 2px;
  background: #edeff1;
  border-radius: 4px;
  font-size: 16px;
`;

const Number = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
`;

export default TimerController;
