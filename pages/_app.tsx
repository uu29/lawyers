import '../styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { modal } from '../components/lib/modal/ModalManager';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    modal.insertModalContainer();
  }, []);

  return <Component {...pageProps} />;
}
