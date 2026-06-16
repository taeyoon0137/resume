"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as stylex from "@stylexjs/stylex";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon, Linkable, Tag, Text } from "@/elements";
import { cleanText } from "@/utils";

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
  summary,
  period,
  duration,
  thumbnail,
  link,
  searchKeyword,
}: ProjectItemProps) => {
  const pathname = usePathname();

  /**
   * 기술 스택 목록을 렌더링합니다.
   * 검색어가 포함된 기술 스택은 강조합니다.
   *
   * @param techStack - 기술 스택
   * @returns 기술 스택 태그
   */
  function renderTechStack(techStack: string): React.ReactNode {
    const isSearched = searchKeyword && cleanText(techStack).includes(cleanText(searchKeyword));

    return (
      <li key={techStack}>
        <Link
          href={{ pathname: `/project`, query: { keyword: techStack } }}
          replace={pathname === "/project"}
          scroll={false}
          prefetch={false}
        >
          <Tag label={techStack} kind={isSearched ? "primary" : "secondary"} pressable />
        </Link>
      </li>
    );
  }

  /**
   * 요약 내용을 렌더링합니다.
   *
   * @param summary - 요약 내용
   * @returns 요약 내용
   */
  function renderSummary(summary: string): React.ReactNode {
    return (
      <li key={summary} {...stylex.props(styles.summaryItem)}>
        <Text kind="body-a2-regular" color={colors.contentGrayA2}>
          {summary}
        </Text>
      </li>
    );
  }

  return (
    <article {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.info)}>
        {/* 제목 */}
        <h3>
          <Text kind="title-a2-bold" style={[styles.title, !!link && styles.titleLink]}>
            <Linkable href={link} target="_blank">
              {title}
              {link && (
                <span {...stylex.props(styles.titleLink, styles.titleLinkIcon)}>
                  <Icon name="link" size={20} fill={colors.contentGrayA3} />
                </span>
              )}
            </Linkable>
          </Text>
        </h3>

        {/* 직책 및 소속 */}
        {role && (
          <Text color={colors.contentGrayA2} style={styles.role}>
            {role}
            {organization && (
              <>
                {" "}
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

        {/* 기술 스택 */}
        {techStacks && <ul {...stylex.props(styles.techStack)}>{techStacks.map(renderTechStack)}</ul>}

        {/* 요약 내용 */}
        {summary && <ul {...stylex.props(styles.summary)}>{summary.map(renderSummary)}</ul>}

        {/* 기간 */}
        {period && (
          <Text kind="body-a2-regular" color={colors.contentGrayA2} style={styles.period}>
            {period}
            {duration && (
              <>
                <span {...stylex.props(styles.durationSeparator)}></span>
                {duration}
              </>
            )}
          </Text>
        )}
      </div>

      {/* 썸네일 */}
      {thumbnail && (
        <figure {...stylex.props(styles.thumbnail)}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 980px) 200px, 240px"
            {...stylex.props(styles.thumbnailImage)}
          />
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
  titleLinkIcon: {
    display: "inline-flex",
    marginLeft: 4,
    verticalAlign: "middle",
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
  thumbnailImage: {
    objectFit: "cover",
  },
});

export default ProjectItem;
