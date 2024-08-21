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
 * ### 리다이렉트
 *
 * 리다이렉트를 할 수 있는 컴포넌트입니다.
 *
 * @param props {@link LicensesRedirectProps}
 * @redirect
 *
 * @deprecated 이 컴포넌트 대신 `Licenses.Redirect`를 사용하세요.
 */
const LicensesRedirect = (_props: PageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(redirectRoot, []);

  /**
   * 모달로 렌더링 될 수 있도록, 루트로 이동 후 다시 렌더링합니다.
   */
  function redirectRoot(): void {
    const params = new URLSearchParams(searchParams);
    params.set("redirect", "licenses");
    router.replace(`/?${params.toString()}`, { scroll: false });
  }

  return <div></div>;
};

export default LicensesRedirect;
