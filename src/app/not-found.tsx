"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Root } from "@/screens";

import type { PageProps } from "@/types";

/**
 * ### 오류 페이지
 *
 * 이력서 내에서 적절한 페이지를 찾지 못했을 때 표시되는
 * 오류 페이지입니다.
 *
 * @param props {@link PageProps}
 * @page
 */
const RootPage = ({ ...props }: PageProps) => {
  return <Root.Error {...props} />;
};

export default RootPage;
