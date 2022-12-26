import Head from 'next/head'
import styled from '@emotion/styled';
import PrintController from "./components/PrintController";
import { Document, Page, Text, View, Font, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import {useState} from "react";
import TimerController from "./components/TimerController";

export default function Home() {
  const [text, setText] = useState('');
  const handleChange = (value: string) => setText(value);
  const saveAsPDF = async () => {
    const blob = await pdf((
      <PDFDocument
        content={text}
      />
    )).toBlob();
    saveAs(blob, '제13회_변호사_시험_답안지');
  }

  return (
    <>
      <Head>
        <title>제13회 변호사 시험 답안지</title>
        <meta name="description" content="제13회 변호사 시험 답안지입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
          <Content>
            <Textarea onChange={(e)=> handleChange(e.target.value)} />
          </Content>
        </Main>
      </Background>
    </>
  )
}

interface PDFDocumentProps {
  content: string;
}

const PDFDocument = ({content}: PDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.main}>
        <View style={styles.title}>
          <Text>제 13회 변호사 시험 답안지</Text>
        </View>
        <View style={styles.content}>
          <Text>{content}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

Font.register({
  family: 'SpoqaHanSans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansRegular.ttf' },
    { src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansBold.ttf', fontStyle: 'bold' },
    { src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf', fontStyle: 'light' },
  ]});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    columnGap: 8,
    backgroundColor: '#2E6DA2',
    minHeight: '100vh',
  },
  main: {
    margin: 'auto',
  },
  title: {
    padding: 16,
    textAlign: 'center',
    color: '#f3f3f3',
    fontWeight: 'bold',
    fontFamily: 'SpoqaHanSans',
    fontSize: 16,
  },
  content: {
    width: 600,
    padding: 16,
    backgroundColor: '#fff',
    fontFamily: 'SpoqaHanSans',
    fontSize: 14,
  }
});

const Background = styled.div`
  min-height: 100vh;
  background: #2E6DA2;
`;

const Main = styled.main`
  padding: 2.5rem 0;
`;

const Content = styled.div`
  margin: 0 4rem;
  background: #fff;
`;

const Title = styled.h1`
  padding: 2.5rem 0 1rem;
  margin: 0 4rem;
  position: relative;
  text-align: center;
  font-size: 32px;
  color: #1f5b8d;
  font-weight: 700;
  background: #fff;
`

const Textarea = styled.textarea`
  display: block;
  max-width: 1200px;
  margin: auto;
  padding: 1rem 4rem;
  resize: none;
  width: calc(100% - 4rem);
  min-height: 100vh;
  outline: 0;
  border: 0;
  line-height: 30px;
  background-attachment: local;
  background-image:
    linear-gradient(to right, white 1rem, transparent 1rem),
    linear-gradient(to left, white 1rem, transparent 1rem),
    repeating-linear-gradient(white 14px, white 42px, #2E6DA2 44px);
  box-sizing: content-box;
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
