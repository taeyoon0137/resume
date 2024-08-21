"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useState } from "react";

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
  const [redirectStore, setRedirectStore] = useState("");

  // 모달 저장 및 열기
  useEffect(redirectModal, []);
  useEffect(openModal, [redirectStore]);

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
    router.replace("/");
    setRedirectStore(`/${modal}?${params.toString()}`);
  }

  /**
   * 저장된 주소로 모달을 엽니다.
   * 이후 저장된 주소를 초기화합니다.
   */
  function openModal(): void {
    if (!redirectStore) return;

    // 정보를 삭제하기 전, 복사하여 저장합니다.
    const param = redirectStore;

    // 정보를 삭제합니다.
    setRedirectStore("");

    // 모달로 이동합니다.
    // 기존 파라메터를 정리할 수 있도록 딜레이를 줍니다.
    setTimeout(() => router.push(param, { scroll: false }), 200);
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
