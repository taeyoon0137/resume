/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as hangul from "hangul-js";

/**
 * 유연한 검색을 위해 텍스트를 정제합니다.
 * 한글/영문/숫자 외 문자를 제거하고 소문자로 바꾼 뒤,
 * 자모를 분리하여 중간 검색이 가능하도록 합니다.
 *
 * @param text 정제할 텍스트입니다.
 * @returns 정제된 텍스트입니다.
 */
export function cleanText(text: string): string {
  // 정규식: /[^가-힣a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ]/g
  // '가-힣' : 한글 음절
  // 'a-zA-Z' : 영어 대소문자
  // '0-9' : 숫자
  // 'ㄱ-ㅎㅏ-ㅣ' : 한글 자모
  // ^ : not (이외의 문자들)
  // g : 전역 검색
  return hangul.disassemble(text.replace(/[^가-힣a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ]/g, "").toLowerCase()).join("");
}
