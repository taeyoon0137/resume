"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from "react";

/**
 * ### TextContext
 *
 * 텍스트 컴포넌트에서 텍스트를 렌더링할지 여부를 결정하는 컨텍스트입니다.
 */
export const TextContext = createContext<boolean>(false);
