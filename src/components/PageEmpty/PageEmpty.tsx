/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as stylex from "@stylexjs/stylex";
import Link from "next/link";

import { TaeyoonSymbol } from "@/assets";
import { Tag, Text } from "@/elements";

import type { PageEmptyProps } from "./PageEmpty.type";

/**
 * ### PageEmpty
 *
 * 시트 없이 그라디언트 배경 위에 안내 텍스트와 홈으로 돌아가기 버튼을
 * 표시하는 비어있는 상태 페이지입니다.
 * 404, 에러 페이지 등에서 공용으로 사용합니다.
 *
 * @param props {@link PageEmptyProps}
 * @component
 */
const PageEmpty = ({ title, description, homeLabel = "홈으로 돌아가기" }: PageEmptyProps) => {
  return (
    <main {...stylex.props(styles.container)}>
      <TaeyoonSymbol aria-hidden="true" {...stylex.props(styles.icon)} />
      <h1 {...stylex.props(styles.title)}>
        <Text kind="display-a2-bold" style={styles.titleText}>
          {title}
        </Text>
      </h1>
      {description && (
        <Text kind="body-a1-regular" style={styles.description}>
          {description}
        </Text>
      )}
      <Link href="/" {...stylex.props(styles.homeLink)}>
        <Tag label={homeLabel} pressable style={styles.homeTag} />
      </Link>
    </main>
  );
};

const MOBILE = "@media (max-width: 640px)";
const styles = stylex.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    minHeight: "100vh",
    paddingTop: 48,
    paddingBottom: 56,
    paddingLeft: 24,
    paddingRight: 24,
    textAlign: "center",
    textShadow: "0 4px 48px rgba(0, 0, 0, 0.08)",
  },
  icon: {
    width: 64,
    height: 64,
    marginBottom: 8,
    color: "#ffffff",
  },
  title: {
    margin: 0,
  },
  titleText: {
    color: "#ffffff",
    fontSize: {
      default: 40,
      [MOBILE]: 32,
    },
  },
  description: {
    color: "rgba(255, 255, 255, 0.78)",
    maxWidth: 420,
  },
  homeLink: {
    marginTop: 12,
  },
  homeTag: {
    color: "#ffffff",
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    backdropFilter: "blur(12px)",
  },
});

export default PageEmpty;
