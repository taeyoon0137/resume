/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as stylex from "@stylexjs/stylex";

import { content } from "@/contents";

import PageBackgroundGradient from "./PageBackgroundGradient";

import type { PageBackgroundProps } from "./PageBackground.type";

/**
 * ### PageBackground
 *
 * 이력서 페이지의 배경 그라디언트를 렌더링합니다.
 *
 * @component
 */
const PageBackground = ({ style, ...props }: PageBackgroundProps) => {
  return (
    <div aria-hidden="true" {...stylex.props(styles.container(content.style.backgrounds), style)} {...props}>
      <PageBackgroundGradient colors={content.style.backgrounds} style={styles.gradient} />
      <div {...stylex.props(styles.blur)}></div>
    </div>
  );
};

const styles = stylex.create({
  container: (backgrounds: string[]) => ({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: backgrounds[0],
    backgroundImage: `
      radial-gradient(circle at 16% 12%, ${backgrounds[0]} 0%, transparent 34%),
      radial-gradient(circle at 82% 18%, ${backgrounds[1]} 0%, transparent 36%),
      radial-gradient(circle at 28% 86%, ${backgrounds[2]} 0%, transparent 38%),
      radial-gradient(circle at 86% 88%, ${backgrounds[3]} 0%, transparent 40%)
    `,
    zIndex: -1,
  }),
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
    backdropFilter: "blur(60px)",
  },
});

export default PageBackground;
