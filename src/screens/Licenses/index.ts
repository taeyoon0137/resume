/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import LicensesPage from "./Licenses.page";
import LicensesRedirect from "./Licenses.redirect";

/**
 * ### Licenses
 *
 * 자격증 목록 페이지입니다.
 */
export const Licenses = {
  /**
   * ### 페이지
   *
   * 페이지를 렌더링 할 수 있는 컴포넌트입니다.
   *
   * @param props {@link LicensesPageProps}
   * @page
   */
  Page: LicensesPage,

  /**
   * ### 리다이렉트
   *
   * 리다이렉트를 할 수 있는 컴포넌트입니다.
   *
   * @param props {@link LicensesRedirectProps}
   * @redirect
   */
  Redirect: LicensesRedirect,
};

export * from "./Licenses.type";
