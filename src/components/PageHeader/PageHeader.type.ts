/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from "@/types";
import type { HTMLMotionProps } from "framer-motion";

export interface PageHeaderProps extends Props<HTMLHeadingElement, "children" | "title" | keyof HTMLMotionProps<"h2">> {
  /**
   * ### 페이지 제목
   *
   * 페이지의 제목을 나타냅니다.
   */
  title: string;

  /**
   * ### 하단 액세서리
   *
   * 페이지 제목 아래에 추가적인 내용을 표시합니다.
   */
  below?: React.ReactNode;
}
