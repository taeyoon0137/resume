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
import { useRouter } from "next/navigation";

import { IsModalContext } from "@/contexts";
import { Icon, Text } from "@/elements";

import { colors } from "../../styles/variable/colors.stylex";
import { spaces } from "../../styles/variable/spaces.stylex";

import type { PageHeaderProps } from "./PageHeader.type";

/**
 * ### PageHeader
 *
 * 페이지의 상단에 표시되는 헤더입니다.
 *
 * @param props {@link PageHeaderProps}
 * @component
 */
const PageHeader = ({ title, below, style, ...props }: PageHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);
  const isModal = useContext(IsModalContext);
  const router = useRouter();

  // 페이지가 스크롤되어, 헤더가 고정되는지 확인합니다.
  useEffect(assignObserver, []);

  /**
   * 페이지가 스크롤되어, 헤더가 고정되는지 확인합니다.
   *
   * @returns - 클린업 함수
   */
  function assignObserver(): () => void {
    const observer = new IntersectionObserver(([e]) => setSticky(e.intersectionRatio < 1), { threshold: [1] });
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }

  /**
   * 이력서 메인 화면으로 이동합니다.
   * 모달 여부에 따라 라우팅 방식을 달리합니다.
   */
  function navigateHome(): void {
    if (isModal) {
      router.back();
    } else {
      router.replace("/", { scroll: false });
    }
  }

  return (
    <motion.header
      ref={headerRef}
      {...stylex.props(styles.symbolContainer, sticky && styles.symbolContainerOnSticky, style)}
      {...props}
    >
      <div {...stylex.props(styles.header)}>
        <Text kind="display-a2-bold" style={styles.title}>
          {title}
        </Text>
        <Icon name="xmark" size={32} onClick={navigateHome} {...stylex.props(styles.closeButton)} />
      </div>
      {below}
    </motion.header>
  );
};

const MOBILE = "@media (max-width: 640px)";
// const TABLET = "@media (min-width: 640px) and (max-width: 980px)";
const styles = stylex.create({
  symbolContainer: {
    position: "sticky",
    top: -1,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
    paddingBottom: 12,
  },
  title: {
    fontSize: {
      default: 32,
      [MOBILE]: 24,
    },
  },
  closeButton: {
    marginLeft: -4,
    marginRight: -4,
    width: {
      default: 32,
      [MOBILE]: 24,
    },
    height: {
      default: 32,
      [MOBILE]: 24,
    },
    color: colors.contentGrayA1,
    transition: "transform 200ms",
    cursor: "pointer",
  },
});

export default PageHeader;
