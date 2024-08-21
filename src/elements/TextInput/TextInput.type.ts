/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Props } from "@/types";

/**
 * ### TextInput 프로퍼티
 *
 * TextInput 컴포넌트에 대한 프로퍼티입니다.
 */
export interface TextInputProps extends Props<HTMLInputElement, "children" | "type"> {
  /**
   * ### 가상 컴포넌트 여부
   *
   * 실제로 텍스트 인풋으로의 기능은 수행하지 않으나,
   * 디자인적 허용을 위해 가상 컴포넌트로 이용할 수 있습니다.
   *
   * 포커스 즉시 포커스를 해제합니다.
   */
  mocking?: boolean;
}
