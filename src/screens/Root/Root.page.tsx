"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from "react";

import { useSearchParams, useRouter } from "next/navigation";

import { PageFooter, PageSheet } from "@/components";
import { Separator } from "@/elements";

import { ResumeHeader, ResumeInfo, ResumeProjectList, ResumeSummary, ResumeTechStack } from "./components";

import type { RootPageProps } from "./Root.type";

/**
 * ### RootPage
 *
 * 이력서 페이지의 루트 컴포넌트입니다.
 *
 * @param props {@link RootPageProps}
 * @page
 *
 * @deprecated 이 컴포넌트 대신 `Root.Page`를 사용하세요.
 */
const RootPage = (_props: RootPageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 모달 저장 및 열기
  useEffect(redirectModal, []);

  /**
   * 모달로 렌더링하기 위해 루트로 이동한 경우,
   * 모달로 리다이렉트합니다.
   */
  function redirectModal(): void {
    const params = new URLSearchParams(searchParams);
    const modal = params.get("redirect");
    if (!modal) return;

    // 파라메터 삭제
    params.delete("redirect");

    // 모달로 이동
    const parameters = params.toString();
    router.replace("/", { scroll: false });
    setTimeout(() => router.push(`/${modal}?${parameters}`, { scroll: false }), 400);
  }

  return (
    <PageSheet>
      <ResumeHeader />
      <ResumeInfo />
      <ResumeTechStack />
      <Separator margin={24} />
      <ResumeSummary />
      <Separator />
      <ResumeProjectList />
      <Separator />
      <PageFooter />
    </PageSheet>
  );
};

export default RootPage;
