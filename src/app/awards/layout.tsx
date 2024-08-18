/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { LayoutProps } from "@/types";
import type { Metadata } from "next";

/**
 * ### metadata 프로퍼티
 *
 * 페이지의 메타데이터를 정의합니다.
 */
export const metadata: Metadata = {
  title: "taeyoon. – awards",
};

/**
 * ### AwardsLayout
 *
 * 레이아웃을 정의합니다.
 * 이 레이아웃은 모든 하위 화면에 적용됩니다.
 *
 * @param props {@link LayoutProps}
 * @component
 */
const AwardsLayout = ({ children }: LayoutProps) => {
  return children;
};

export default AwardsLayout;
