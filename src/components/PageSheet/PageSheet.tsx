"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext } from "react";

import stylex from "@stylexjs/stylex";

import { IsModalOpenContext } from "@/contexts";

import { colors } from "../../styles/variable/colors.stylex";

import type { PageSheetProps } from "./PageSheet.type";

/**
 * ### PageSheet
 *
 * 각 페이지를 렌더링 할 페이지 컴포넌트입니다.
 * dim 옵션을 켜면 해당 페이지를 딤 처리합니다.
 *
 * @param props {@link PageProps}
 * @component
 */
const PageSheet = ({ style, children, ...props }: PageSheetProps) => {
  const isModalOpen = useContext(IsModalOpenContext);

  return (
    <main aria-hidden={isModalOpen} {...stylex.props(styles.container, isModalOpen && styles.dim, style)} {...props}>
      {children}
    </main>
  );
};

const MOBILE = "@media (max-width: 640px)";
const TABLET = "@media (min-width: 640px) and (max-width: 980px)";
const styles = stylex.create({
  container: {
    marginTop: {
      default: "56px",
      [TABLET]: "20px",
      [MOBILE]: "12px",
    },
    marginBottom: {
      default: "56px",
      [TABLET]: "20px",
      [MOBILE]: "12px",
    },
    marginLeft: {
      default: "auto",
      [TABLET]: "20px",
      [MOBILE]: "12px",
    },
    marginRight: {
      default: "auto",
      [TABLET]: "20px",
      [MOBILE]: "12px",
    },
    maxWidth: 980,
    minHeight: {
      default: 1660,
      [MOBILE]: 0,
    },
    borderRadius: 12,
    backgroundColor: colors.backgroundSolidCommon,
    boxShadow: "0 4px 80px -20px rgba(0, 0, 0, 0.4)",
    transition: "transform 400ms, opacity 400ms",
    cursor: "default",
  },
  dim: {
    transform: "scale(0.9)",
    opacity: 0.64,
  },
});

export default PageSheet;
