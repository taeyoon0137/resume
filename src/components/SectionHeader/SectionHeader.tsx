/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as stylex from "@stylexjs/stylex";

import { Text } from "@/elements";

import { spaces } from "../../styles/variable/spaces.stylex";

import type { SectionHeaderProps } from "./SectionHeader.type";

/**
 * ### SectionHeader
 *
 * 각 섹션의 제목을 나타내는 섹션 헤더 컴포넌트입니다.
 *
 * @param props {@link SectionHeaderProps}
 * @component
 */
const SectionHeader = ({ title, style, ...props }: SectionHeaderProps) => {
  return (
    <h2 {...stylex.props(styles.container, style)} {...props}>
      <Text kind="display-a3-bold">{title}</Text>
    </h2>
  );
};

const styles = stylex.create({
  container: {
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
    paddingTop: 16,
    paddingBottom: 8,
  },
});

export default SectionHeader;
