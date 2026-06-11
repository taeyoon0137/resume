/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
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
