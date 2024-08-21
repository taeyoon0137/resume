"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useEffect, useRef, useState } from "react";

import stylex from "@stylexjs/stylex";
import { motion } from "framer-motion";

import { Symbol } from "@/assets";
import { IsModalOpenContext } from "@/contexts";

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

  useEffect(assignObserver, []);

  function assignObserver(): () => void {
    const observer = new IntersectionObserver(([e]) => setSticky(e.intersectionRatio < 1), { threshold: [1] });
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
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
      <Symbol {...stylex.props(styles.symbol, sticky && styles.symbolSticky)} />
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
});

export default ResumeHeader;
