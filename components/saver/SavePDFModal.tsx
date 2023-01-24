import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { modal } from '../lib/modal/ModalManager';
import PDFDocument from '../PDFDocument';

interface SavePDFModalProps {
  text: string;
}

function SavePDFModal({ text }: SavePDFModalProps) {
  const ref = useRef<null | HTMLInputElement>(null);
  const [fileName, setFileName] = useState(DEFAULT_FILENAME);

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  const saveAsPDF = async () => {
    const blob = await pdf((
      <PDFDocument content={text} />
    )).toBlob();
    saveAs(blob, fileName);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await saveAsPDF();
    modal.destroy();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
  };

  return (
    <SavePDFModalModalWrapper>
      저장할 파일명을 입력하세요.
      <Form onSubmit={onSubmit}>
        <InputText
          ref={ref}
          value={fileName}
          onChange={onChange}
        />
        <Button>
          저장
        </Button>
      </Form>
    </SavePDFModalModalWrapper>
  );
}

const DEFAULT_FILENAME = '제13회_변호사_시험_답안지';

const SavePDFModalModalWrapper = styled.div`
  text-align: center;
`;

const Form = styled.form`
  margin-top: 24px;
  display: flex;
  column-gap: 8px;
  height: 38px;
  font-size: 16px;
`;

const InputText = styled.input`
  flex: 1;
  display: block;
  padding: 8px;
  border: 1px solid #ababab;
  border-radius: 4px;
  text-align: center;
`;

const Button = styled.button`
  flex: 1;
  max-width: 80px;
  padding: 8px;
  background: #2E6DA2;
  color: #fff;
  border-radius: 4px;
`;

export default SavePDFModal;
