import styled from '@emotion/styled';

interface PrintControllerProps {
  onClickSave: () => void;
}

function PrintController({onClickSave}: PrintControllerProps){
  return (
    <PrintControllerBlock>
      <Button onClick={onClickSave}>저장</Button>
      <Button>인쇄</Button>
    </PrintControllerBlock>
  )
}

const PrintControllerBlock = styled.div`
  display: flex;
  column-gap: 4px;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 48px;
  background: #edeff1;
  border-radius: 4px;
  font-size: 14px;
`;

export default PrintController;
