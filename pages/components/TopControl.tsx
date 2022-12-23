import styled from '@emotion/styled';

interface TopControlProps {
  onClickSave: () => void;
}

function TopControl({onClickSave}: TopControlProps){
  return (
    <TopControlBlock>
      <Button onClick={onClickSave}>저장</Button>
      <Button>인쇄</Button>
    </TopControlBlock>
  )
}

const TopControlBlock = styled.div`
  position: absolute;
  right: 0;
  top: 2.5rem;
`;

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

export default TopControl;
