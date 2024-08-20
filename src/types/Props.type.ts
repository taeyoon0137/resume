/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { StyleXStyles } from "@stylexjs/stylex";
import type { HTMLProps } from "react";

/**
 * ### 컴포넌트 프로퍼티
 *
 * 컴포넌트의 프로퍼티를 정의합니다.
 */
export type Props<T extends HTMLElement, O extends string = never> = Omit<HTMLProps<T>, "className" | "style" | O> & {
  /**
   * ### 스타일
   *
   * 컴포넌트의 스타일을 정의합니다.
   */
  style?: StyleXStyles;
};
