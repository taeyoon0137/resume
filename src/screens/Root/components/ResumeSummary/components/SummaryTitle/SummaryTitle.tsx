/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as stylex from "@stylexjs/stylex";

import { Text } from "@/elements";

import { colors } from "../../../../../../styles/variable/colors.stylex";

import type { SummaryTitleProps } from "./SummaryTitle.type";

/**
 * ### 요약 제목
 *
 * 요약 제목을 표시하는 컴포넌트입니다.
 *
 * @param props {@link SummaryTitleProps}
 * @component
 */
const SummaryTitle = ({ title }: SummaryTitleProps) => {
  return (
    <h2 {...stylex.props(styles.sectionTitle)}>
      <Text kind="body-a2-semibold" color={colors.contentGrayA2}>
        {title}
      </Text>
    </h2>
  );
};

const styles = stylex.create({
  sectionTitle: {
    marginBottom: 8,
  },
});

export default SummaryTitle;
