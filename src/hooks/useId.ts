/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useRef } from "react";

import { createRandomId } from "@/utils";

/**
 * 리렌더 시에도 변경되지 않는 고유 ID를 생성합니다.
 *
 * @param length - 생성할 ID의 길이입니다.
 * @returns 생성된 고유 ID입니다.
 */
export function useId(length?: number): string {
  return useRef(createRandomId(length)).current;
}
