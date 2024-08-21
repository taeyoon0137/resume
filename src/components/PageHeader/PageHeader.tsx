"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef, useState } from "react";

import stylex from "@stylexjs/stylex";
import { motion } from "framer-motion";
import Link from "next/link";

import { Symbol } from "@/assets";

import { colors } from "../../styles/variable/colors.stylex";
import { spaces } from "../../styles/variable/spaces.stylex";

const PageHeader = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);

  useEffect(assignObserver, []);

  function assignObserver(): () => void {
    const observer = new IntersectionObserver(([e]) => setSticky(e.intersectionRatio < 1), { threshold: [1] });
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }

  return (
    <motion.header
      ref={headerRef}
      {...stylex.props(styles.symbolContainerSticky, styles.symbolContainer, sticky && styles.symbolContainerOnSticky)}
    >
      <Link href="/">
        <Symbol {...stylex.props(styles.symbol, sticky && styles.symbolSticky)} />
      </Link>
    </motion.header>
  );
};

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
    marginLeft: -8,
    marginRight: -8,
    width: 52,
    height: 52,
    color: colors.contentGrayA1,
    transition: "transform 200ms",
  },
  symbolSticky: {
    transform: "scale(0.88)",
  },
});

export default PageHeader;
