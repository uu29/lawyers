import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { modal } from './ModalManager';

export interface ILayerStyle {
  border?: string;
  minWidth?: string;
  overflowY?: string;
  height?: string;
}

export interface IModalProps {
  children: JSX.Element;
  xHidden?: boolean;
  layerStyle?: ILayerStyle;
  scroll?: boolean;
}

function Modal({
  children, xHidden, layerStyle, scroll,
}: IModalProps) {
  const destroy = () => {
    modal.destroy();
  };

  return (
    <Wrapper>
      <Layer
        layerStyle={layerStyle}
        scroll={scroll}
      >
        {scroll ? (
          <>
            <ScrollLayout>
              <Cont>{children}</Cont>
            </ScrollLayout>
            {!xHidden && (
              <CloseBtnInner
                type="button"
                onClick={destroy}
              />
            )}
          </>
        ) : (
          <>
            <Cont>{children}</Cont>
            {!xHidden && (
              <CloseBtnInner
                type="button"
                onClick={destroy}
              />
            )}
          </>
        )}
      </Layer>
      {!xHidden && (
        <CloseBtnOuter
          type="button"
          onClick={destroy}
        />
      )}
      <Overlay onClick={destroy} />
    </Wrapper>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
    perspective: -30px;
  }
  
  100% {
    opacity: 1;
    perspective: 30px;
  }
`;

const ScrollLayout = styled.div<{ layerStyle?: ILayerStyle }>`
  width: 100%;
  height: 70vh;
  overflow-y: auto;
  padding: 28px 30px;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background: #ffffff;
    border-radius: 2em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #f0f0f0;
    border-radius: 2em;

    &:hover {
      background-color: #e7e5e5;
    }
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 25, 28, 0.3);
`;

const Layer = styled.div<{ layerStyle?: ILayerStyle; scroll?: boolean }>`
  position: absolute;
  z-index: 9999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: ${({ layerStyle }) => (layerStyle?.minWidth ? layerStyle.minWidth : '460px;')};
  padding: 40px;
  border: ${({ layerStyle }) => (layerStyle?.border ? layerStyle.border : '1px solid rgba(172, 192, 199, 0.08)')};
  border-radius: 8px;
  box-shadow: 2px 2px 12px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
  perspective-origin: center;
  animation: ${fadeIn} 0.25s 1 linear alternate;
`;

const Cont = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
`;

const CloseBtnInner = styled.button`
  position: absolute;
  right: 4px;
  top: 4px;
  width: 20px;
  height: 20px;
  background: url(/close.svg) no-repeat center;
  background-size: contain;
`;

const CloseBtnOuter = styled.button`
  display: none;
  width: 50px;
  height: 50px;
  //background: rgba(25, 25, 28, 0.35) url(/images/btn_x_small_white.svg) no-repeat center;
  //background-size: 24px;
`;

export default React.memo(Modal);
