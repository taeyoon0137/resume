"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from "@stylexjs/stylex";

import { PageFooter, PageHeader, PageSheet } from "@/components";
import { Separator } from "@/elements";

import type { LicensesPageProps } from "./Licenses.type";

/**
 * ### LicensesPage
 *
 * 자격증 목록 페이지의 루트 컴포넌트입니다.
 *
 * @param props {@link LicensesPageProps}
 * @page
 *
 * @deprecated 이 컴포넌트 대신 `Licenses.Page`를 사용하세요.
 */
const LicensesPage = (_props: LicensesPageProps) => {
  return (
    <PageSheet>
      <PageHeader title="자격증" />
      <div {...stylex.props(styles.scroll)}></div>
      <Separator />
      <PageFooter />
    </PageSheet>
  );
};

const styles = stylex.create({
  scroll: {
    flexGrow: 1,
  },
});

export default LicensesPage;
