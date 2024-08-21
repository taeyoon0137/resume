/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from "@/types";
import type { StyleXVar } from "@stylexjs/stylex/lib/StyleXTypes";

/**
 * ### Text 프로퍼티
 *
 * Text 컴포넌트에 사용되는 프로퍼티입니다.
 */
export interface TextProps extends Props<HTMLSpanElement> {
  /**
   * ### 텍스트 종류
   *
   * 텍스트 스타일 종류를 설정합니다.
   *
   * @default "body-a1-regular"
   */
  kind?: TextKind;

  /**
   * ### 텍스트 색상
   *
   * 텍스트 색상을 설정합니다.
   *
   * @default colors.contentGrayA1
   */
  color?: StyleXVar<string>;
}

/**
 * ### 텍스트 종류
 *
 * 텍스트 스타일 종류를 정의합니다.
 */
export type TextKind =
  | "super-a1-bold"
  | "super-a1-medium"
  | "super-a2-bold"
  | "super-a2-medium"
  | "display-a1-bold"
  | "display-a1-medium"
  | "display-a2-bold"
  | "display-a2-medium"
  | "display-a3-bold"
  | "display-a3-medium"
  | "title-a1-bold"
  | "title-a1-medium"
  | "title-a2-bold"
  | "title-a2-medium"
  | "heading-a1-bold"
  | "heading-a1-medium"
  | "heading-a2-bold"
  | "heading-a2-medium"
  | "heading-a3-bold"
  | "heading-a3-medium"
  | "body-a0-semibold"
  | "body-a0-medium"
  | "body-a0-regular"
  | "body-a1-semibold"
  | "body-a1-medium"
  | "body-a1-regular"
  | "body-a2-semibold"
  | "body-a2-medium"
  | "body-a2-regular"
  | "body-a3-semibold"
  | "body-a3-medium"
  | "body-a3-regular"
  | "caption-a1-bold"
  | "caption-a1-medium"
  | "caption-a2-bold"
  | "caption-a2-medium"
  | "caption-a3-bold"
  | "caption-a3-medium";
