/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useMemo } from "react";

import stylex from "@stylexjs/stylex";

import { icon } from "@/assets";

import { colors } from "../../styles/variable/colors.stylex";

import type { IconProps } from "./Icon.type";
import type { StyleXVar } from "@stylexjs/stylex/lib/StyleXTypes";

/**
 * ### Icon
 *
 * 아이콘 컴포넌트입니다.
 *
 * @param props {@link IconProps}
 * @component
 */
const Icon = ({ name, fill = colors.contentGrayA1, size = 24, style, ...props }: IconProps) => {
  const IconComponent = useMemo(getIcon, [name]);

  /**
   * 해당 이름의 아이콘을 가져옵니다.
   *
   * @returns 아이콘 컴포넌트
   */
  function getIcon() {
    return icon[name.replace(".", "_") as keyof typeof icon];
  }

  return <IconComponent {...stylex.props(styles.size(size), styles.fill(fill), style)} {...props} />;
};

const styles = stylex.create({
  size: (size: number) => ({
    width: size,
    height: size,
  }),
  fill: (fill: StyleXVar<string>) => ({
    color: fill,
  }),
});

export default Icon;
