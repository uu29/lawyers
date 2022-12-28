import {
  Document, Font, Page, StyleSheet, Text, View,
} from '@react-pdf/renderer';

interface PDFDocumentProps {
  content: string;
}

function PDFDocument({ content }: PDFDocumentProps) {
  return (
    <Document>
      <Page
        size="A4"
        style={styles.page}
      >
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
}

Font.register({
  family: 'SpoqaHanSans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansRegular.ttf' },
    { src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansBold.ttf', fontStyle: 'bold' },
    { src: 'https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf', fontStyle: 'light' },
  ],
});

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
  },
});

export default PDFDocument;
