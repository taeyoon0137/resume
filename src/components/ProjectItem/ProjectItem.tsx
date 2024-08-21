"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react";

import stylex from "@stylexjs/stylex";
import { m, AnimatePresence } from "framer-motion";
import * as hangul from "hangul-js";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Icon, Linkable, Tag, Text } from "@/elements";

import { colors } from "../../styles/variable/colors.stylex";
import { spaces } from "../../styles/variable/spaces.stylex";

import type { ProjectItemProps } from "./ProjectItem.type";

/**
 * ### ProjectItem
 *
 * 각 프로젝트 요소를 표현하는 컴포넌트입니다.
 *
 * @param props {@link ProjectItemProps}
 * @component
 */
const ProjectItem = ({
  title,
  role,
  organization,
  techStacks,
  details,
  summary,
  period,
  duration,
  thumbnail,
  link,
}: ProjectItemProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [expand, _setExpand] = useState(false);

  /**
   * 유연한 검색을 위해, 텍스트를 정제합니다.
   * 또한 자모를 분리하여, 중간 검색이 가능하도록 합니다.
   *
   * @param text - 정제할 텍스트
   * @returns 정제된 텍스트
   */
  function cleanText(text: string): string {
    // 정규식: /[^가-힣a-zA-Z0-9]/g
    // '가-힣' : 한글
    // 'a-zA-Z' : 영어 대소문자
    // '0-9' : 숫자
    // ^ : not (이외의 문자들)
    // g : 전역 검색
    return hangul.disassemble(text.replace(/[^가-힣a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ]/g, "").toLowerCase()).join("");
  }

  return (
    <article {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.info)}>
        <h4>
          <Text kind="title-a2-bold" style={[styles.title, !!link && styles.titleLink]}>
            <Linkable href={link} target="_blank">
              {title}
              {link && (
                <span {...stylex.props(styles.titleLink)}>
                  &nbsp;
                  <Icon name="link" size={20} fill={colors.contentGrayA3} />
                </span>
              )}
            </Linkable>
          </Text>
        </h4>
        {role && (
          <Text color={colors.contentGrayA2} style={styles.role}>
            {role}
            {organization && (
              <>
                &nbsp;
                <Linkable
                  href={organization.link}
                  target="_blank"
                  style={[styles.orgLink, !!organization.link && styles.orgLinkable]}
                >
                  <Text>@{organization.name}</Text>
                </Linkable>
              </>
            )}
          </Text>
        )}
        {techStacks && (
          <ul {...stylex.props(styles.techStack)}>
            {techStacks.map((techStack) => (
              <li key={techStack}>
                <Link
                  href={{
                    pathname: `/project`,
                    query: { keyword: techStack },
                  }}
                  replace={pathname === "/project"}
                  scroll={false}
                >
                  <Tag
                    label={techStack}
                    kind={
                      searchParams.get("keyword") &&
                      cleanText(techStack).includes(cleanText(searchParams.get("keyword") ?? "갉"))
                        ? "primary"
                        : "secondary"
                    }
                    pressable
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
        <AnimatePresence>
          {expand
            ? details && <></>
            : summary && (
                <m.ul {...stylex.props(styles.summary)}>
                  {summary.map((row) => (
                    <li key={row} {...stylex.props(styles.summaryItem)}>
                      <Text kind="body-a2-regular" color={colors.contentGrayA2}>
                        {row}
                      </Text>
                    </li>
                  ))}
                </m.ul>
              )}
        </AnimatePresence>
        {period && (
          <Text kind="body-a2-regular" color={colors.contentGrayA2} style={styles.period}>
            {period}
            {duration && (
              <>
                <div {...stylex.props(styles.durationSeparator)}></div>
                {duration}
              </>
            )}
          </Text>
        )}
      </div>
      {thumbnail && (
        <figure {...stylex.props(styles.thumbnail)}>
          <Image src={thumbnail} alt={title} fill />
        </figure>
      )}
    </article>
  );
};

const MOBILE = "@media (max-width: 640px)";
const TABLET = "@media (min-width: 640px) and (max-width: 980px)";
const styles = stylex.create({
  container: {
    flexDirection: {
      default: "row",
      [MOBILE]: "column-reverse",
    },
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
    paddingTop: 12,
    paddingBottom: 32,
    columnGap: 40,
    rowGap: 16,
  },
  info: {
    flexGrow: 1,
    flexBasis: 0,
    paddingTop: 2,
    paddingBottom: 2,
  },
  title: {
    marginBottom: 6,
  },
  titleLink: {
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationColor: colors.contentGrayA3,
  },
  role: {
    marginTop: 2,
  },
  orgLink: {
    display: "inline",
  },
  orgLinkable: {
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationColor: colors.contentGrayA3,
  },
  techStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  summary: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  summaryItem: {
    "::before": {
      content: "'•'",
      display: "flex",
      marginLeft: 6,
      marginRight: 6,
      color: colors.contentGrayA2,

      // "body-a2-regular"
      fontSize: 15,
      fontWeight: 400,
      letterSpacing: 0.02,
      lineHeight: "160%",
    },

    flexDirection: "row",
  },
  period: {
    marginTop: 8,
  },
  durationSeparator: {
    display: "inline-block",
    marginLeft: 8,
    marginRight: 8,
    width: 1,
    height: 10,
    backgroundColor: colors.lineSeparatorStroke,
  },
  thumbnail: {
    position: "relative",
    width: {
      default: 240,
      [TABLET]: 200,
      [MOBILE]: "auto",
    },
    alignSelf: {
      default: "flex-start",
      [MOBILE]: "auto",
    },
    aspectRatio: "16 / 9",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.lineOutline,
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default ProjectItem;
