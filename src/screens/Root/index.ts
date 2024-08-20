/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import RootLayout from "./Root.layout";
import RootPage from "./Root.page";

/**
 * ### Root
 *
 * 이력서 메인 페이지입니다.
 */
export const Root = {
  /**
   * ### 페이지
   *
   * 페이지를 렌더링 할 수 있는 컴포넌트입니다.
   *
   * @param props {@link RootPageProps}
   * @page
   */
  Page: RootPage,

  /**
   * ### 레이아웃
   *
   * 페이지의 레이아웃을 정의하는 컴포넌트입니다.
   *
   * @param props {@link RootLayoutProps}
   * @layout
   */
  Layout: RootLayout,
};

export * from "./Root.type";
