import Head from 'next/head'
import styled from '@emotion/styled';

export default function Home() {
  return (
    <>
      <Head>
        <title>제 13회 변호사 시험 답안지</title>
        <meta name="description" content="제 13회 변호사 시험 답안지입니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Title>제 13회 변호사 시험 답안지</Title>
        <Content>
          <Textarea />
        </Content>
      </Main>
    </>
  )
}

const Main = styled.main`
  min-height: 100vh;
  background: #2E6DA2;
`;

const Content = styled.div`
  max-width: 600px;
  padding: 0 1rem;
  margin: auto;
  background: #fff;
`;

const Title = styled.h1`
  padding: 2.5rem 0 1rem;
  text-align: center;
  font-size: 24px;
  color: #f3f3f3;
  font-weight: 500;
`

const Textarea = styled.textarea`
  padding: 1rem;
  resize: none;
  width: 100%;
  min-height: 100vh;
  outline: 0;
  border: 0;
  line-height: 31px;
  background-attachment: local;
  background-image:
    linear-gradient(to right, white 1rem, transparent 1rem),
    linear-gradient(to left, white 1rem, transparent 1rem),
    repeating-linear-gradient(white 14px, white 42px, #2E6DA2 44px);
`;
