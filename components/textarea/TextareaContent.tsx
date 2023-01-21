import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { DEFAULT_LINE_HEIGHT, ROWS_PER_PAGE, COLS_PER_ROW } from '../../pages';
import RowLine from './RowLine';

interface TextareaContentProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>,
             onOverflow: (length: number) => void,
             page: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>,
              page: number) => void;
  isFocused: boolean;
  page: number;
}

function TextareaContent({
  onChange, onKeyDown, isFocused, page,
}: TextareaContentProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [maxLength, setMaxLength] = useState(Number.MAX_SAFE_INTEGER);

  useEffect(() => {
    if (isFocused && ref?.current) {
      ref.current.focus();
    }
  }, [isFocused]);

  return (
    <TextareaContentWrapper>
      <TextareaContentInner>
        <Textarea
          ref={ref}
          onChange={(e) => onChange(e, setMaxLength, page)}
          onKeyDown={(e) => onKeyDown(e, page)}
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
      </TextareaContentInner>
    </TextareaContentWrapper>
  );
}

const TextareaContentWrapper = styled.div`
  padding: 60px 0;
  margin: 90px 0;
  background: #fff;
  
  &:first-of-type {
    padding-top: 0;
    margin-top: 0;
  }
`;

const TextareaContentInner = styled.div`
  position: relative;
`;

const Textarea = styled.textarea<{ lineHeight?: number }>`
  margin: auto;
  display: block;
  resize: none;
  padding-top: 3px;
  outline: 0;
  border: 0;
  background: transparent;
  line-height: ${({ lineHeight }) => (lineHeight ? `${lineHeight}px` : '31px')};
`;

export default TextareaContent;
