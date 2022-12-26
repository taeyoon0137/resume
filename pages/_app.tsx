/*
  Copyright 2022. Taeyoon Lee.
  All rights reserved
*/

import '../styles/initialize.css';

import type { AppProps } from 'next/app';

/**
 * ### 앱
 *
 * NEXT.js에서 전체 앱을 래핑하는 루트 컴포넌트입니다.
 *
 * @param props AppProps
 * @component
 */
const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
