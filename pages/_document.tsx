/*
  Copyright 2022. Taeyoon Lee.
  All rights reserved
*/

import { Head, Html, Main, NextScript } from 'next/document';

/**
 * ### 도큐먼트
 *
 * NEXT.js에서 각 페이지를 래핑하는 루트 컴포넌트입니다.
 *
 * @component
 */
const Document = () => {
  return (
    <Html lang='en'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
