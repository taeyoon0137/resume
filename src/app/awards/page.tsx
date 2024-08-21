"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import type { PageProps } from "@/types";

/**
 * ### 수상 내역 페이지
 *
 * 이력서 메인 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const AwardsPage = (_props: PageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(redirectRoot, []);

  /**
   * 모달로 렌더링 될 수 있도록, 루트로 이동 후 다시 렌더링합니다.
   */
  function redirectRoot(): void {
    const params = new URLSearchParams(searchParams);
    params.set("redirect", "awards");
    router.replace(`/?${params.toString()}`);
  }

  return null;
};

export default AwardsPage;
