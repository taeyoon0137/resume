/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageSheet } from "@/components";

import type { ActivitiesPageProps } from "./Activities.type";

/**
 * ### ActivitiesPage
 *
 * 활동 내역 목록 페이지의 루트 컴포넌트입니다.
 *
 * @param props {@link ActivitiesPageProps}
 * @page
 *
 * @deprecated 이 컴포넌트 대신 `Activities.Page`를 사용하세요.
 */
const ActivitiesPage = (_props: ActivitiesPageProps) => {
  return <PageSheet></PageSheet>;
};

export default ActivitiesPage;
