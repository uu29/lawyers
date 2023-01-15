import React from 'react';
import styled from '@emotion/styled';
import { DEFAULT_LINE_HEIGHT, ROWS_PER_PAGE, COLS } from '../../pages';
import RowLine from './RowLine';

interface TextareaContentProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>)=> void;
}

function TextareaContent({ onChange }: TextareaContentProps) {
  return (
    <TextareaContentBlock>
      <Textarea
        onChange={onChange}
        lineHeight={DEFAULT_LINE_HEIGHT}
        rows={ROWS_PER_PAGE}
        cols={COLS}
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
