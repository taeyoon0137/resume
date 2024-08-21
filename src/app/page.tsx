"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Root } from "@/screens";

import type { PageProps } from "@/types";

/**
 * ### 루트 페이지
 *
 * 이력서 메인 페이지입니다.
 * 이력서를 렌더링합니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const RootPage = ({ ...props }: PageProps) => {
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
    router.push(`/${modal}?${params.toString()}`);
  }

  return <Root.Page {...props} />;
};

export default RootPage;
