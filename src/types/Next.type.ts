/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ### Layout 프로퍼티
 *
 * 레이아웃의 프로퍼티를 정의합니다.
 */
export interface LayoutProps extends React.PropsWithChildren {}

/**
 * ### Page 프로퍼티
 *
 * 페이지의 프로퍼티를 정의합니다.
 * slug 설정에 따라 다른 프로퍼티를 정의할 수 있습니다.
 */
export type PageProps<T extends string | never = never> = T extends never
  ? {}
  : T extends `[...${infer R}]`
    ? { [key in R]?: string[] }
    : T extends `...${infer R}`
      ? { [key in R]: string[] }
      : { [key in T]: string };
