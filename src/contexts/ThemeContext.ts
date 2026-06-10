/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from "react";

export type ThemeMode = "system" | "light" | "dark";
export type ResolvedThemeMode = "light" | "dark";

export type ThemeContextValue = {
  /**
   * ### 테마 설정
   *
   * 사용자가 선택한 테마 설정입니다.
   */
  themeMode: ThemeMode;

  /**
   * ### 실제 테마
   *
   * 시스템 설정까지 반영한 실제 표시 테마입니다.
   */
  resolvedThemeMode: ResolvedThemeMode;

  /**
   * ### 테마 변경 함수
   *
   * 사용자가 테마 버튼을 눌렀을 때 다음 테마 상태로 변경합니다.
   */
  toggleThemeMode: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  themeMode: "system",
  resolvedThemeMode: "light",
  toggleThemeMode() {},
});
