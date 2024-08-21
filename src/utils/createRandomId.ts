/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ### 소스 문자열
 *
 * 무작위 ID를 생성하기 위한 소스 문자열입니다.
 */
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/**
 * 무작위 ID를 생성합니다.
 *
 * @param length - 생성할 ID의 길이입니다.
 * @returns 무작위 ID입니다.
 */
export function createRandomId(length: number = 20): string {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
