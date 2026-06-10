"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useEffect, useRef, useState } from "react";

import * as stylex from "@stylexjs/stylex";
import { motion } from "framer-motion";

import { TaeyoonSymbol } from "@/assets";
import { IsModalOpenContext, ThemeContext } from "@/contexts";
import { Icon } from "@/elements";

import { colors } from "../../../../styles/variable/colors.stylex";
import { spaces } from "../../../../styles/variable/spaces.stylex";

/**
 * ### 이력서 헤더
 *
 * 페이지 상단 이력서 홈의 헤더입니다.
 *
 * @component
 */
const ResumeHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);
  const isModalOpen = useContext(IsModalOpenContext);
  const theme = useContext(ThemeContext);

  useEffect(assignObserver, []);

  function assignObserver(): () => void {
    const observer = new IntersectionObserver(([e]) => setSticky(e.intersectionRatio < 1), { threshold: [1] });
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }

  /**
   * 테마 버튼의 접근성 레이블을 반환합니다.
   *
   * @returns 테마 버튼 레이블
   */
  function getThemeButtonLabel(): string {
    if (theme.themeMode === "system") return `테마: 시스템 (${theme.resolvedThemeMode === "dark" ? "다크" : "라이트"})`;
    if (theme.themeMode === "dark") return "테마: 다크";
    return "테마: 라이트";
  }

  return (
    <motion.header
      ref={headerRef}
      layout
      {...stylex.props(
        !isModalOpen && styles.symbolContainerSticky,
        styles.symbolContainer,
        !isModalOpen && sticky && styles.symbolContainerOnSticky,
      )}
    >
      <TaeyoonSymbol {...stylex.props(styles.symbol, sticky && styles.symbolSticky)} />
      <button
        type="button"
        onClick={theme.toggleThemeMode}
        aria-label={getThemeButtonLabel()}
        title={getThemeButtonLabel()}
        aria-pressed={theme.themeMode !== "system"}
        {...stylex.props(styles.themeButton)}
      >
        <Icon name="moon" size={20} fill={colors.contentGrayA1} />
      </button>
    </motion.header>
  );
};

const MOBILE = "@media (max-width: 640px)";
const TABLET = "@media (min-width: 640px) and (max-width: 980px)";
const styles = stylex.create({
  symbolContainerSticky: {
    position: "sticky",
    top: -1,
  },
  symbolContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
    paddingBottom: 12,
    marginTop: `calc(${spaces.paddingVertical} - 12px)`,

    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,

    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "transparent",
    transition: "border-bottom-color 200ms",

    backgroundColor: colors.backgroundSolidCommon,

    zIndex: 2,
  },
  symbolContainerOnSticky: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomColor: colors.lineSeparatorStroke,
  },
  symbol: {
    marginLeft: {
      default: -8,
      [TABLET]: -6,
      [MOBILE]: -4,
    },
    marginRight: {
      default: -8,
      [TABLET]: -6,
      [MOBILE]: -4,
    },
    width: {
      default: 52,
      [TABLET]: 40,
      [MOBILE]: 32,
    },
    height: {
      default: 52,
      [TABLET]: 40,
      [MOBILE]: 32,
    },
    color: colors.contentGrayA1,
    transition: "transform 200ms",
  },
  symbolSticky: {
    transform: "scale(0.88)",
  },
  themeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: {
      default: 40,
      [TABLET]: 36,
      [MOBILE]: 32,
    },
    height: {
      default: 40,
      [TABLET]: 36,
      [MOBILE]: 32,
    },
    borderWidth: 0,
    borderRadius: 8,
    color: colors.contentGrayA1,
    backgroundColor: {
      default: colors.contentGrayA4,
      ":hover": colors.contentGrayA3,
      ":active": colors.contentGrayA4,
    },
    transition: "background-color 200ms",
    cursor: "pointer",
  },
});

export default ResumeHeader;
