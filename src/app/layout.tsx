/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import "../styles/css/globals.css";

import type { LayoutProps } from "@/types";
import type { Metadata } from "next";

/**
 * ### metadata 프로퍼티
 *
 * 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = {
  title: "taeyoon. – resume",
  description: "반갑습니다. Product Designer & FE Engineer(RN)로 활동 중인 이태윤입니다.",
};

/**
 * ### RootLayout
 *
 * 루트 레이아웃을 정의합니다.
 * 이 레이아웃은 모든 화면에 적용됩니다.
 *
 * @param props {LayoutProps}
 * @component
 */
const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="kr">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
