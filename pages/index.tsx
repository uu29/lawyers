import React, { useRef, useState } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFDocument from '../components/PDFDocument';
import PrintController from '../components/PrintController';
import RowLine from '../components/textarea/RowLine';
import TimerController from '../components/TimerController';

export default function Home() {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState('');
  const saveAsPDF = async () => {
    const blob = await pdf((
      <PDFDocument content={text} />
    )).toBlob();
    saveAs(blob, '제13회_변호사_시험_답안지');
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, scrollHeight, clientHeight } = e.target;
    setText(value);
    if (scrollHeight > clientHeight) {
      console.log('yes');
    } else {
      console.log('no');
    }
  };

  return (
    <>
      <Head>
        <title>제13회 변호사 시험 답안지</title>
        <meta
          name="description"
          content="제13회 변호사 시험 답안지입니다."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Main>
        <Title>
          제13회 변호사 시험 답안지
          <Controllers>
            <TimerController />
            <PrintController onClickSave={saveAsPDF} />
          </Controllers>
        </Title>
        <TextareaBlock>
          <Textarea
            ref={textRef}
            onChange={handleChange}
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
        </TextareaBlock>
      </Main>
      <Background />
    </>
  );
}

const ROWS_PER_PAGE = 30;
const COLS = 37 * 1.5;
export const DEFAULT_LINE_HEIGHT = 31;

const Background = styled.div`
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;
  background: #2E6DA2;
  width: 100%;
  height: 100%;
`;

const Main = styled.main`
  margin: 2.5rem auto;
  max-width: 1200px;
  background: #fff;
  height: 1140px;
`;

const TextareaBlock = styled.div`
  position: relative;
`;

const Title = styled.h1`
  padding: 3rem 6rem;
  position: relative;
  text-align: center;
  font-size: 32px;
  color: #1f5b8d;
  font-weight: 700;
  border-bottom: 2px solid #2E6DA2;
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

const Controllers = styled.div`
  position: absolute;
  right: 3rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;
