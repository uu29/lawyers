import styled from '@emotion/styled';
import { DEFAULT_LINE_HEIGHT } from '../../pages';

interface RowLineProps {
  lineNumber: number;
  lineHeight?: number;
}

function RowLine({ lineNumber, lineHeight = DEFAULT_LINE_HEIGHT }: RowLineProps) {
  const posY = getPositionY({ lineNumber, lineHeight });

  return (
    <>
      {isMultipleOfFive(lineNumber) && (
        <DividerLeft
          posY={posY}
          lineHeight={lineHeight}
        >
          {lineNumber}
        </DividerLeft>
      )}
      <StyledRowLine posY={posY} />
      {isMultipleOfFive(lineNumber) && (
        <DividerRight
          posY={posY}
          lineHeight={lineHeight}
        >
          {lineNumber}
        </DividerRight>
      )}
    </>
  );
}

const isMultipleOfFive = (number: number) => number % 5 === 0;

const getPositionY = ({ lineNumber, lineHeight = DEFAULT_LINE_HEIGHT }: RowLineProps) => lineNumber * lineHeight;

const Divider = styled.div<{ posY: number; lineHeight: number }>`
  margin-top: ${({ lineHeight }) => `${-lineHeight / 2}px`};
  position: absolute;
  top: ${({ posY }) => `${posY}px`};
  transform: translateY(-40%);
  color: #2E6DA2;
  font-size: 12px;
`;

const DividerLeft = styled(Divider)`
  left: 5px;
`;

const DividerRight = styled(Divider)`
  right: 5px;
`;

const StyledRowLine = styled.div<{ posY: number }>`
  position: absolute;
  top: ${({ posY }) => `${posY}px`};
  left: 0;
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #2E6DA2;
`;

export default RowLine;
