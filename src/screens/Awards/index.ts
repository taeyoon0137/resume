/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import AwardsPage from "./Awards.page";

/**
 * ### Awards
 *
 * 수상 내역 목록 페이지입니다.
 */
export const Awards = {
  /**
   * ### 페이지
   *
   * 페이지를 렌더링 할 수 있는 컴포넌트입니다.
   *
   * @param props {@link AwardsPageProps}
   * @page
   */
  Page: AwardsPage,
};

export * from "./Awards.type";
