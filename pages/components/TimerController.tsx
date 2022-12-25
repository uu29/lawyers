import styled from "@emotion/styled";

function TimerController () {
  return <PlayButton>▶ 00:00</PlayButton>;
}

const PlayButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  margin: 0 2px;
  background: #edeff1;
  border-radius: 4px;
  font-size: 16px;
`;

export default TimerController;
