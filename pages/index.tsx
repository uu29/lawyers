import { useState } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import PDFDocument from '../components/PDFDocument';
import PrintController from '../components/PrintController';
import TimerController from '../components/TimerController';

export default function Home() {
  const [text, setText] = useState('');
  const handleChange = (value: string) => setText(value);
  const saveAsPDF = async () => {
    const blob = await pdf((
      <PDFDocument content={text} />
    )).toBlob();
    saveAs(blob, '제13회_변호사_시험_답안지');
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
      <Background>
        <Main>
          <Title>
            제13회 변호사 시험 답안지
            <Controllers>
              <TimerController />
              <PrintController onClickSave={saveAsPDF} />
            </Controllers>
          </Title>
          <TextareaBackground>
            <Textarea onChange={(e) => handleChange(e.target.value)} />
          </TextareaBackground>
        </Main>
      </Background>
    </>
  );
}

const Background = styled.div`
  min-height: 100vh;
  background: #2E6DA2;
`;

const Main = styled.main`
  padding: 2.5rem 0;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h1`
  padding: 3rem 6rem 2rem;
  position: relative;
  text-align: center;
  font-size: 32px;
  color: #1f5b8d;
  font-weight: 700;
  background: #fff;
`;

const TextareaBackground = styled.div`
  padding: 1rem 6rem;
  line-height: 30px;
  background-attachment: local;
  background-image:
          linear-gradient(to right, white 0, transparent 0),
          linear-gradient(to left, white 0, transparent 0),
          repeating-linear-gradient(white 14px, white 42px, #2E6DA2 44px);
`;

const Textarea = styled.textarea`
  display: block;
  resize: none;
  width: 100%;
  min-height: 100vh;
  outline: 0;
  border: 0;
  background: transparent;
  line-height: 30px;
`;

const Controllers = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  row-gap: 4px;
  margin: 2rem 4rem 0;
`;
