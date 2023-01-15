import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import {
  DEFAULT_LINE_HEIGHT, ROWS_PER_PAGE, COLS_PER_ROW,
} from '../../pages';
import RowLine from './RowLine';

interface TextareaContentProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>, onOverflow: (length: number) => void) => void;
  isFocused: boolean;
}

function TextareaContent({ onChange, isFocused }: TextareaContentProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [maxLength, setMaxLength] = useState(Number.MAX_SAFE_INTEGER);

  useEffect(() => {
    if (isFocused && ref?.current) {
      ref.current.focus();
    }
  }, [isFocused]);

  return (
    <TextareaContentBlock>
      <Textarea
        ref={ref}
        onChange={(e) => onChange(e, setMaxLength)}
        lineHeight={DEFAULT_LINE_HEIGHT}
        rows={ROWS_PER_PAGE}
        cols={COLS_PER_ROW}
        maxLength={maxLength}
      />
      {Array.from({ length: ROWS_PER_PAGE }).map((_, index) => (
        <RowLine
          lineNumber={index + 1}
          key={index}
        />
      ))}
      <RowLine lineNumber={1} />
    </TextareaContentBlock>
  );
}

const TextareaContentBlock = styled.div`
  position: relative;
`;

const Textarea = styled.textarea<{ lineHeight?: number }>`
  display: block;
  resize: none;
  margin: auto;
  padding-top: 3px;
  outline: 0;
  border: 0;
  background: transparent;
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : '31px')};
  //overflow: hidden;
`;

export default TextareaContent;
