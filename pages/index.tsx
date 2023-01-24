import React, { useState } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { modal } from '../components/lib/modal/ModalManager';
import PrintController from '../components/PrintController';
import SavePDFModal from '../components/saver/SavePDFModal';
import TextareaContent from '../components/textarea/TextareaContent';
import TimerController from '../components/TimerController';

export default function Home() {
  const [text, setText] = useState('');
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const onClickSave = () => {
    modal.pop(<SavePDFModal text={text} />);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>, onOverflow: (length: number) => void, page: number) => {
    const { value, scrollHeight, clientHeight } = e.target;
    setText(value);
    if (scrollHeight > clientHeight) {
      onOverflow(value.length);
      setNowPage(nowPage + 1);
      setTotalPage(totalPage + 1);
    } else {
      setNowPage(page);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, page: number) => {
    if (totalPage === 1
      || page === 1
      || e.key !== 'Backspace'
      || page !== totalPage
      || text) return;

    setNowPage(nowPage - 1);
    setTotalPage(totalPage - 1);
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
            <PrintController onClickSave={onClickSave} />
          </Controllers>
        </Title>
        {Array.from({ length: totalPage }).map((_, index) => (
          <TextareaContent
            key={index}
            onChange={onChange}
            onKeyDown={onKeyDown}
            isFocused={nowPage === index}
            page={index + 1}
          />
        ))}
      </Main>
      <div id="modal" />
      <Background />
    </>
  );
}

const COLS = 37;
export const ROWS_PER_PAGE = 30;
export const COLS_PER_ROW = COLS * 1.5;
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
`;

const Title = styled.h1`
  padding: 3rem 6rem;
  position: relative;
  text-align: center;
  font-size: 32px;
  color: #1f5b8d;
  font-weight: 700;
  border-bottom: 2px solid #2E6DA2;
  background: #fff;
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
