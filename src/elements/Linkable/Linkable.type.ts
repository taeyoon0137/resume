/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
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
