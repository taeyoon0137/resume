/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from "@stylexjs/stylex";
import Link from "next/link";

import { Text } from "@/elements";

import { colors } from "../../../../../../styles/variable/colors.stylex";

import type { SummaryMoreProps } from "./SummaryMore.type";

const SummaryMore = ({ label, href }: SummaryMoreProps) => {
  return (
    <Link href={href} scroll={false} {...stylex.props(styles.moreButton)}>
      <Text kind="body-a2-medium" color={colors.contentGrayA2}>
        {label}
      </Text>
    </Link>
  );
};

const styles = stylex.create({
  moreButton: {
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationColor: colors.contentGrayA3,
  },
});

export default SummaryMore;
