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
export type LayoutProps<T extends string[] = string[], K = T[number]> = React.PropsWithChildren<
  DynamicRoutingProps<T, K> & ParallelRoutingProps<T, K>
> & {};

/**
 * ### Page 프로퍼티
 *
 * 페이지의 프로퍼티를 정의합니다.
 */
export type PageProps<T extends string[] = string[], K = T[number]> = DynamicRoutingProps<T, K> & {};

/**
 * ### DynamicPage 프로퍼티
 *
 * slug 설정에 따라 다른 프로퍼티를 정의할 수 있습니다.
 */
export type DynamicRoutingProps<T extends string[] = string[], K = T[number]> = T extends never
  ? {}
  : K extends `${string}[[...${infer R}]]${string}`
    ? { [key in R]?: string[] }
    : K extends `${string}[...${infer R}]${string}`
      ? { [key in R]: string[] }
      : K extends `${string}[${infer R}]${string}`
        ? { [key in R]: string }
        : {};

/**
 * ### ParallelRouting 프로퍼티
 *
 * 병렬 라우팅을 위한 프로퍼티를 정의합니다.
 */
export type ParallelRoutingProps<T extends string[] = string[], K = T[number]> = T extends never
  ? {}
  : K extends `@${infer R}`
    ? { [key in R]: React.ReactNode }
    : {};
