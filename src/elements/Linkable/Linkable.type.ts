/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Props } from "@/types";

import type { LinkProps } from "next/link";

/**
 * ### Linkable 프로퍼티
 *
 * Linkable 컴포넌트 프로퍼티입니다.
 */
export interface LinkableProps
  extends Props<HTMLAnchorElement, keyof LinkProps>,
    Omit<LinkProps, "href">,
    Partial<Pick<LinkProps, "href">> {}
