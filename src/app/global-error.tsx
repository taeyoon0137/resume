"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../styles/css/globals.css";

/**
 * ### 글로벌 에러 페이지
 *
 * RootLayout 자체가 렌더링에 실패했을 때 표시되는 최후 fallback입니다.
 * Next 요구에 따라 자체 html과 body를 직접 렌더링합니다.
 * RootLayout과 동일한 그라디언트 배경을 인라인으로 적용하고,
 * 흰 글자와 홈으로 돌아가는 링크만 단순하게 표시합니다.
 *
 * @page
 */
const GlobalError = () => {
  return (
    <html lang="ko">
      <body style={bodyStyle}>
        <h1 style={titleStyle}>문제가 발생했어요</h1>
        <p style={descriptionStyle}>
          페이지를 표시하는 중 오류가 발생했어요. 새로고침 후에도 문제가 계속되면 잠시 후 다시 방문해 주세요.
        </p>
        {/* RootLayout이 실패한 최후 fallback이므로 next/link 대신 일반 anchor를 사용합니다. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/" style={buttonStyle}>
          홈으로 돌아가기
        </a>
      </body>
    </html>
  );
};

const bodyStyle: React.CSSProperties = {
  minHeight: "100vh",
  margin: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 12,
  padding: "48px 24px 56px",
  textAlign: "center",
  color: "#ffffff",
  backgroundColor: "#77E4C8",
  backgroundImage:
    "radial-gradient(circle at 16% 12%, #77E4C8 0%, transparent 34%)," +
    "radial-gradient(circle at 82% 18%, #36C2CE 0%, transparent 36%)," +
    "radial-gradient(circle at 28% 86%, #478CCF 0%, transparent 38%)," +
    "radial-gradient(circle at 86% 88%, #4535C1 0%, transparent 40%)",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, Pretendard, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  textShadow: "0 4px 48px rgba(0, 0, 0, 0.08)",
};

const titleStyle: React.CSSProperties = {
  fontSize: 40,
  fontWeight: 700,
  margin: 0,
};

const descriptionStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.6,
  maxWidth: 420,
  color: "rgba(255, 255, 255, 0.8)",
  margin: 0,
};

const buttonStyle: React.CSSProperties = {
  marginTop: 12,
  padding: "4px 12px",
  borderRadius: 8,
  backgroundColor: "rgba(255, 255, 255, 0.16)",
  color: "#ffffff",
  textDecoration: "none",
  fontSize: 15,
  fontWeight: 500,
  lineHeight: "160%",
};

export default GlobalError;
