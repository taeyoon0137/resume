/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylex from "@stylexjs/stylex";
import Link from "next/link";

import { content } from "@/contents";
import { Tag } from "@/elements";

import { spaces } from "../../../../styles/variable/spaces.stylex";

import type { ResumeTechStackProps } from "./ResumeTechStack.type";

/**
 * ### 테크 스택
 *
 * 이력서 내 테크 스택을 보여주는 컴포넌트입니다.
 *
 * @param _props {@link ResumeTechStackProps}
 * @component
 */
const ResumeTechStack = (_props: ResumeTechStackProps) => {
  return (
    <ul {...stylex.props(styles.container)}>
      {content.techStacks.map((techStack) => (
        <li key={techStack}>
          <Link
            href={{
              pathname: `/project`,
              query: { keyword: techStack },
            }}
            scroll={false}
          >
            <Tag label={techStack} pressable />
          </Link>
        </li>
      ))}
    </ul>
  );
};

const styles = stylex.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
    paddingTop: 12,
    paddingBottom: 20,
    columnGap: 6,
    rowGap: 8,
  },
});

export default ResumeTechStack;
