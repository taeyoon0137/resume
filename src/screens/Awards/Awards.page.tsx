"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageSheet, PageHeader } from "@/components";

import type { AwardsPageProps } from "./Awards.type";

/**
 * ### AwardsPage
 *
 * 수상 내역 목록 페이지의 루트 컴포넌트입니다.
 *
 * @param props {@link AwardsPageProps}
 * @page
 *
 * @deprecated 이 컴포넌트 대신 `Awards.Page`를 사용하세요.
 */
const AwardsPage = (_props: AwardsPageProps) => {
  return (
    <PageSheet>
    </PageSheet>
  );
};

export default AwardsPage;
