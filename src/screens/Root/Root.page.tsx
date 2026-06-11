"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from "react";

import { useRouter } from "next/navigation";

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
  const router = useRouter();

  // 모달 저장 및 열기
  useEffect(redirectModal, []);

  /**
   * 모달로 렌더링하기 위해 루트로 이동한 경우,
   * 모달로 리다이렉트합니다.
   * 정적 프리렌더에 영향을 주지 않도록 useSearchParams 대신
   * 마운트 이후 window.location에서 파라미터를 읽습니다.
   */
  function redirectModal(): void {
    const params = new URLSearchParams(window.location.search);
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
