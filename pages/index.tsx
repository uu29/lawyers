import exp from 'constants';
import React, { useState } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFDocument from '../components/PDFDocument';
import PrintController from '../components/PrintController';
import TextareaContent from '../components/textarea/TextareaContent';
import TimerController from '../components/TimerController';

export default function Home() {
  const [text, setText] = useState('');
  const [nowPage, setNowPage] = useState(0);
  const saveAsPDF = async () => {
    const blob = await pdf((
      <PDFDocument content={text} />
    )).toBlob();
    saveAs(blob, '제13회_변호사_시험_답안지');
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, scrollHeight, clientHeight } = e.target;
    console.log(value.length);
    setText(value);
    if (scrollHeight > clientHeight) {
      setNowPage(nowPage + 1);
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
        <TextareaContent onChange={onChange} />
      </Main>
      <Background />
    </>
  );
}

const COLS = 37;
export const ROWS_PER_PAGE = 30;
export const COLS_PER_ROW = COLS * 1.5;
export const MAX_LENGTH = ROWS_PER_PAGE * COLS;
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

const Title = styled.h1`
  padding: 3rem 6rem;
  position: relative;
  text-align: center;
  font-size: 32px;
  color: #1f5b8d;
  font-weight: 700;
  border-bottom: 2px solid #2E6DA2;
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
