import styled from '@emotion/styled';

interface PrintControllerProps {
  onClickSave: () => void;
}

function PrintController({onClickSave}: PrintControllerProps){
  return (
    <div>
      <Button onClick={onClickSave}>저장</Button>
      <Button>인쇄</Button>
    </div>
  )
}

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 48px;
  margin: 0 2px;
  background: #edeff1;
  border-radius: 4px;
  font-size: 14px;
`;

export default PrintController;
