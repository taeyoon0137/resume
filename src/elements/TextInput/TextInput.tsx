"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { forwardRef, useImperativeHandle, useRef } from "react";

import stylex from "@stylexjs/stylex";

import { colors } from "../../styles/variable/colors.stylex";

import type { TextInputProps } from "./TextInput.type";

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({ mocking, onFocus, style, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 외부 ref 전달
  useImperativeHandle(ref, () => inputRef.current!);

  /**
   * 인풋이 포커스 되었을 떄의 동작을 처리합니다.
   *
   * @param event - 포커스 이벤트
   */
  function handleFocus(event: React.FocusEvent<HTMLInputElement>): void {
    if (mocking && inputRef.current) inputRef.current.blur();
    onFocus?.(event);
  }

  return (
    <input
      ref={inputRef}
      type="text"
      onFocus={handleFocus}
      {...stylex.props(styles.input, mocking && styles.mocking, style)}
      {...props}
    />
  );
});

const styles = stylex.create({
  input: {
    "::placeholder": {
      color: colors.contentGrayA3,
    },

    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 0.5,
    borderRadius: 14,
    borderColor: colors.lineOutline,
    backgroundColor: colors.backgroundSolidElevate,

    // "body-a1-regular"
    fontSize: 17,
    fontWeight: 400,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  mocking: {
    cursor: "pointer",
  },
});

export default TextInput;
