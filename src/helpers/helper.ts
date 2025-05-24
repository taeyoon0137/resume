/**
 * Copyright 2025 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * ### Helper
 *
 * 개발 과정에서 이용되는 갖가지 변수/상수 메소드를 모아둔 클래스입니다.
 *
 * @class
 */
class Helper {
  /**
   * ### 현재 날짜
   *
   * 현재 날짜를 저장하는 변수입니다.
   */
  private $date = new Date();

  /**
   * ### 현재 날짜
   *
   * 현재 날짜 인스턴스입니다.
   */
  readonly date = this.$date;

  /**
   * ### 현재 년도
   *
   * 현재 년도입니다.
   */
  readonly year = this.$date.getFullYear();

  /**
   * ### 현재 월
   *
   * 현재 월입니다.
   */
  readonly month = this.$date.getMonth() + 1;

  /**
   * ### 현재 일
   *
   * 현재 일입니다.
   */
  readonly day = this.$date.getDate();
}

/**
 * ### Helper 인스턴스
 *
 * Helper 클래스의 인스턴스를 생성합니다.
 * 싱글톤 패턴으로 생성합니다.
 *
 * @constant
 */
export const helper = new Helper();
