/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * 주어진 개월 수를 형식화하여 반환합니다.
 *
 * @param length - 개월 수
 * @returns 형식화된 개월 수
 */
export function formatMonthLength(length: number): string {
  const years = Math.floor(length / 12);
  const months = length % 12;

  if (years === 0) {
    return `${months}개월`;
  }

  if (months === 0) {
    return `${years}년`;
  }

  return `${years}년 ${months}개월`;
}
