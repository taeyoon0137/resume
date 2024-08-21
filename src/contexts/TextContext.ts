"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from "react";

/**
 * ### TextContext
 *
 * 텍스트 컴포넌트에서 텍스트를 렌더링할지 여부를 결정하는 컨텍스트입니다.
 */
export const TextContext = createContext<boolean>(false);
