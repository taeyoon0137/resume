/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PageSheet } from "@/components";

import type { RootErrorProps } from "./Root.type";

/**
 * ### RootError
 *
 * 이력서 페이지의 루트 컴포넌트입니다.
 *
 * @param props {@link RootErrorProps}
 * @page
 *
 * @deprecated 이 컴포넌트 대신 `Root.Page`를 사용하세요.
 */
const RootError = (_props: RootErrorProps) => {
  return <PageSheet></PageSheet>;
};

export default RootError;
