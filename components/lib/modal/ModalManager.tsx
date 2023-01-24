import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';
import type { ILayerStyle } from './Modal';

export class ModalManager {
  private containerRef: HTMLElement | undefined;

  public insertModalContainer() {
    this.containerRef = document.getElementById('modal') as HTMLElement;
  }

  public pop(children: JSX.Element, xHidden?: boolean, layerStyle?: ILayerStyle, scroll?: boolean): void {
    if (typeof this.containerRef !== 'undefined') {
      ReactDOM.render(
        <Modal
          xHidden={xHidden}
          layerStyle={layerStyle}
          scroll={scroll}
        >
          {children}
        </Modal>,
        this.containerRef,
      );
    }
  }

  public destroy(): void {
    if (typeof this.containerRef !== 'undefined') ReactDOM.unmountComponentAtNode(this.containerRef);
  }
}

export const modal = new ModalManager();
