/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from "@stylexjs/stylex";

import { content } from "@/contents";
import { Gradient } from "@/elements";

import type { PageBackgroundProps } from "./PageBackground.type";

/**
 * ### PageBackground
 *
 * 이력서 페이지의 배경 그라디언트를 렌더링합니다.
 *
 * @component
 */
const PageBackground = ({ style }: PageBackgroundProps) => {
  return (
    <div aria-hidden="true" {...stylex.props(styles.container, style)}>
      <Gradient colors={content.style.backgrounds} style={styles.gradient} />
      <div {...stylex.props(styles.blur)}></div>
    </div>
  );
};

const styles = stylex.create({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
  },
  gradient: {
    display: "block",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
  },
  blur: {
    position: "absolute",
    display: "block",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backdropFilter: "blur(200px)",
  },
});

export default PageBackground;
