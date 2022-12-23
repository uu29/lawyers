import Head from 'next/head'
import styled from '@emotion/styled';
import TopControl from "./components/TopControl";
import { Document, Page, Text, View, Font, StyleSheet, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import {useState} from "react";

export default function Home() {
  const [text, setText] = useState('');
  const handleChange = (value: string) => setText(value);
  const saveAsPDF = async () => {
    const blob = await pdf((
      <PDFDocument
        content={text}
      />
    )).toBlob();
    saveAs(blob, '제_13회_변호사_시험_답안지');
  }

  return (
    <>
      <Head>
        <title>제 13회 변호사 시험 답안지</title>
        <meta name="description" content="제 13회 변호사 시험 답안지입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background>
        <Main>
          <Title>제 13회 변호사 시험 답안지</Title>
          <TopControl onClickSave={saveAsPDF} />
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
  margin: auto;
  max-width: 600px;
  position: relative;
`;

const Content = styled.div`
  padding: 0 1rem;
  background: #fff;
`;

const Title = styled.h1`
  padding: 2.5rem 0 1rem;
  text-align: center;
  font-size: 24px;
  color: #f3f3f3;
  font-weight: 600;
`

const Textarea = styled.textarea`
  padding: 1rem;
  resize: none;
  width: 100%;
  min-height: 100vh;
  outline: 0;
  border: 0;
  line-height: 30px;
  background-attachment: local;
  background-image:
    linear-gradient(to right, white 1rem, transparent 1rem),
    linear-gradient(to left, white 1rem, transparent 1rem),
    repeating-linear-gradient(white 14px, white 42px, #2E6DA2 44px);
`;
