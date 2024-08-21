/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Suspense } from "react";

import { Awards } from "@/screens";

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
  return (
    <Suspense fallback={<div></div>}>
      <Awards.Redirect />
    </Suspense>
  );
};

export default AwardsPage;
