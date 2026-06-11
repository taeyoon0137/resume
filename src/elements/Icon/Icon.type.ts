/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from "@/types";
import type { StyleXVar } from "@stylexjs/stylex/lib/types/StyleXTypes";

/**
 * ### IconProps
 *
 * 아이콘 컴포넌트에 사용되는 속성입니다.
 */
export interface IconProps extends Props<HTMLElement> {
  /**
   * ### 아이콘 이름
   *
   * 아이콘의 이름을 지정합니다.
   */
  name: IconName;

  /**
   * ### 아이콘 색상
   *
   * 아이콘의 색상을 지정합니다.
   *
   * @default colors.contentGrayA1
   */
  fill?: StyleXVar<string>;

  /**
   * ### 아이콘 크기
   *
   * 아이콘의 크기를 지정합니다.
   *
   * @default 24
   */
  size?: number;
}

/**
 * ### 아이콘 이름
 *
 * 사용 가능한 아이콘 이름 목록입니다.
 */
export type IconName =
  | "chevron.left"
  | "envelope.fill"
  | "github"
  | "globe"
  | "link"
  | "moon"
  | "phone.fill"
  | "star"
  | "xmark";
