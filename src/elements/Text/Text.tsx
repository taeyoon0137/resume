"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext } from "react";

import stylex from "@stylexjs/stylex";

import { TextContext } from "@/contexts";

import { colors } from "../../styles/variable/colors.stylex";

import type { TextProps } from "./Text.type";
import type { StyleXVar } from "@stylexjs/stylex/lib/StyleXTypes";

/**
 * ### Text
 *
 * 텍스트 컴포넌트입니다.
 * span 태그를 통해 텍스트 스타일만을 지정합니다.
 *
 * @param props {@link TextProps}
 * @component
 */
const Text = ({ kind, color, style, children, ...props }: TextProps) => {
  const textContext = useContext(TextContext);

  // 텍스트 컨텍스트가 존재할 경우
  // 텍스트 컨텍스트의 값에 따라 텍스트 컬러를 변경합니다.
  if (textContext) {
    return (
      <span {...stylex.props(styles.typo(color), kind && styles[kind], style)} {...props}>
        {children}
      </span>
    );
  }

  return (
    <span
      {...stylex.props(styles.typo(color ?? colors.contentGrayA1), styles[kind ?? "body-a1-regular"], style)}
      {...props}
    >
      <TextContext.Provider value={true}>{children}</TextContext.Provider>
    </span>
  );
};

const styles = stylex.create({
  typo: (color?: StyleXVar<string>) => ({
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    color: color,
  }),
  "super-a1-bold": {
    fontSize: 80,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "super-a1-medium": {
    fontSize: 80,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "super-a2-bold": {
    fontSize: 64,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "super-a2-medium": {
    fontSize: 64,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "display-a1-bold": {
    fontSize: 56,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "display-a1-medium": {
    fontSize: 56,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "display-a2-bold": {
    fontSize: 40,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "display-a2-medium": {
    fontSize: 40,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "display-a3-bold": {
    fontSize: 32,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "display-a3-medium": {
    fontSize: 32,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "title-a1-bold": {
    fontSize: 28,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "title-a1-medium": {
    fontSize: 28,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "title-a2-bold": {
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "title-a2-medium": {
    fontSize: 24,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "120%",
  },
  "heading-a1-bold": {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "132%",
  },
  "heading-a1-medium": {
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "132%",
  },
  "heading-a2-bold": {
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "132%",
  },
  "heading-a2-medium": {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "132%",
  },
  "heading-a3-bold": {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "132%",
  },
  "heading-a3-medium": {
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: 0,
    lineHeight: "132%",
  },
  "body-a0-semibold": {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a0-medium": {
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a0-regular": {
    fontSize: 20,
    fontWeight: 400,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a1-semibold": {
    fontSize: 17,
    fontWeight: 600,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a1-medium": {
    fontSize: 17,
    fontWeight: 500,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a1-regular": {
    fontSize: 17,
    fontWeight: 400,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a2-semibold": {
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a2-medium": {
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a2-regular": {
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a3-semibold": {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a3-medium": {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "body-a3-regular": {
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: 0.02,
    lineHeight: "160%",
  },
  "caption-a1-bold": {
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.012,
    lineHeight: "140%",
  },
  "caption-a1-medium": {
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 0.012,
    lineHeight: "140%",
  },
  "caption-a2-bold": {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 0.012,
    lineHeight: "140%",
  },
  "caption-a2-medium": {
    fontSize: 10,
    fontWeight: 500,
    letterSpacing: 0.012,
    lineHeight: "140%",
  },
  "caption-a3-bold": {
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 0.012,
    lineHeight: "140%",
  },
  "caption-a3-medium": {
    fontSize: 8,
    fontWeight: 500,
    letterSpacing: 0.012,
    lineHeight: "140%",
  },
});

export default Text;
