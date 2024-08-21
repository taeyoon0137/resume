/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from "@stylexjs/stylex";

import { colors } from "../../styles/variable/colors.stylex";
import { spaces } from "../../styles/variable/spaces.stylex";

import type { SeparatorProps } from "./Separator.type";

const Separator = ({ margin, style, ...props }: SeparatorProps) => {
  return <hr {...stylex.props(styles.separator(margin), style)} {...props} />;
};

const styles = stylex.create({
  separator: (margin?: number) => ({
    marginTop: margin ?? 20,
    marginBottom: margin ?? 20,
    marginLeft: spaces.paddingHorizontal,
    marginRight: spaces.paddingHorizontal,

    height: 0,

    borderTopWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderRightWidth: 0,

    borderTopStyle: "solid",
    borderTopColor: colors.lineSeparatorStroke,
  }),
});

export default Separator;
