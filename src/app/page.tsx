/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

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
  return <Root.Page {...props} />;
};

export default RootPage;
