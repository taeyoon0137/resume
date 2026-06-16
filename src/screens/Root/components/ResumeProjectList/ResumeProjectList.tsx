"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useId, useRef, useState } from "react";

import * as stylex from "@stylexjs/stylex";
import { m } from "framer-motion";
import Link from "next/link";

import { trackEvent } from "@/api";
import { ProjectItem, SectionHeader } from "@/components";
import { content } from "@/contents";
import { Icon, Separator, Tag, Text, TextInput } from "@/elements";
import { useLiveContent } from "@/hooks";

import { colors } from "../../../../styles/variable/colors.stylex";
import { spaces } from "../../../../styles/variable/spaces.stylex";

import type { HTMLMotionProps } from "framer-motion";

type ResumeProject = (typeof content.projects)[number];
type IndexedProject = {
  /**
   * ### 프로젝트
   *
   * 화면에 렌더링할 프로젝트 데이터입니다.
   */
  project: ResumeProject;

  /**
   * ### 기존 순서
   *
   * priority가 같을 때 유지할 기존 목록 순서입니다.
   */
  index: number;
};
type PriorityProject = IndexedProject & { project: ResumeProject & { priority: number } };

/**
 * ### 프로젝트 목록
 *
 * 이력서 프로젝트 목록 컴포넌트입니다.
 *
 * @component
 */
const ResumeProjectList = () => {
  const contentId = useId();
  const liveContent = useLiveContent();
  const sectionTitleRef = useRef<HTMLDivElement>(null);
  const [expand, setExpand] = useState(false);
  const [showPriorityOnly, setShowPriorityOnly] = useState(false);
  const priorityButtonLabel = "주요 프로젝트만 보기";
  const priorityProjects = getPriorityProjects();

  /**
   * 프로젝트를 펼치거나 닫습니다.
   */
  function toggleExpand(): void {
    trackEvent(expand ? "All Resume Hidden" : "All Resume Revealed");
    if (expand) setShowPriorityOnly(false);
    setExpand((prev) => !prev);
    scrollToSectionTitle();
  }

  /**
   * 주요 프로젝트 표시 상태를 변경합니다.
   */
  function togglePriorityOnly(): void {
    setExpand(true);
    setShowPriorityOnly((prev) => !prev);
    scrollToSectionTitle();
  }

  /**
   * 프로젝트 섹션 제목 위치로 스크롤합니다.
   * 목록 표시 상태가 바뀔 때 사용자가 목록의 시작점을 보도록 합니다.
   * 펼침 직후에는 문서 높이가 아직 작아 목표 위치가 클램프될 수 있으므로,
   * 높이 애니메이션(400ms)이 끝난 뒤 한 번 더 보정합니다.
   */
  function scrollToSectionTitle(): void {
    requestSectionTitleScroll();
    window.setTimeout(requestSectionTitleScroll, 450);
  }

  /**
   * 섹션 제목이 상단 고정 헤더 바로 아래에 오도록 스크롤을 요청합니다.
   * 제목이 overflow hidden 컨테이너 안에 있어 scrollIntoView가
   * window를 스크롤하지 않으므로, 위치를 계산해 직접 스크롤합니다.
   */
  function requestSectionTitleScroll(): void {
    const target = sectionTitleRef.current;
    if (!target) return;

    // 상단 고정 헤더에 가려지지 않도록 여백을 둡니다.
    const stickyOffset = window.matchMedia("(max-width: 640px)").matches ? 64 : 88;
    const top = target.getBoundingClientRect().top + window.scrollY - stickyOffset;
    const behavior: ScrollBehavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    window.scrollTo({ top: Math.max(top, 0), behavior });
  }

  /**
   * 프로젝트 아이템을 렌더링합니다.
   *
   * @param project 렌더링할 프로젝트입니다.
   * @returns 프로젝트 아이템
   */
  function renderProject(project: ResumeProject): React.ReactNode {
    return (
      <li key={project.title}>
        <ProjectItem
          title={project.title}
          role={project.role}
          organization={project.organization}
          techStacks={project.techStacks}
          summary={project.summary}
          period={project.period}
          duration={project.duration}
          thumbnail={project.thumbnail}
          link={project.link}
        />
      </li>
    );
  }

  /**
   * 주요 프로젝트 목록을 반환합니다.
   *
   * @returns priority가 있는 프로젝트 목록
   */
  function getPriorityProjects(): ResumeProject[] {
    return getIndexedProjects()
      .filter(hasPriorityProject)
      .sort(comparePriorityProject)
      .map(({ project }) => project);
  }

  /**
   * 화면에 표시되는 기존 순서를 포함한 프로젝트 목록을 반환합니다.
   *
   * @returns 기존 순서를 포함한 프로젝트 목록
   */
  function getIndexedProjects(): IndexedProject[] {
    return [...liveContent.projects, ...liveContent.sideProjects, ...liveContent.activities].map((project, index) => ({
      project,
      index,
    }));
  }

  /**
   * 프로젝트에 priority가 있는지 확인합니다.
   *
   * @param indexedProject 기존 순서를 포함한 프로젝트입니다.
   * @returns priority가 있는 프로젝트 여부
   */
  function hasPriorityProject(indexedProject: IndexedProject): indexedProject is PriorityProject {
    return typeof indexedProject.project.priority === "number";
  }

  /**
   * 주요 프로젝트의 정렬 순서를 비교합니다.
   *
   * @param a 비교할 첫 번째 프로젝트입니다.
   * @param b 비교할 두 번째 프로젝트입니다.
   * @returns 정렬 순서
   */
  function comparePriorityProject(a: PriorityProject, b: PriorityProject): number {
    return a.project.priority - b.project.priority || a.index - b.index;
  }

  /**
   * ### 애니메이션 설정
   *
   * 프로젝트 목록이 펼쳐지거나 닫히도록 하는 애니메이션을 설정합니다.
   */
  const animation: HTMLMotionProps<"div"> = {
    initial: { flexGrow: 1, height: 0 },
    animate: {
      flexGrow: expand ? 0 : 1,
      height: expand ? "auto" : 0,
      transition: {
        type: "tween",
        duration: 0.4,
        bounce: 0,
      },
    },
    exit: { flexGrow: 1, height: 0 },
  };

  return (
    <>
      <div {...stylex.props(styles.container, expand && styles.containerExpanded)}>
        <m.div id={contentId} {...animation} {...stylex.props(styles.ignoreCollapse)}>
          <section>
            <div ref={sectionTitleRef} {...stylex.props(styles.sectionHeader)}>
              <SectionHeader title="프로젝트" style={styles.sectionTitle} />
              <button
                type="button"
                onClick={togglePriorityOnly}
                aria-pressed={showPriorityOnly}
                aria-label={priorityButtonLabel}
                title={priorityButtonLabel}
                {...stylex.props(styles.priorityButton, showPriorityOnly && styles.priorityButtonSelected)}
              >
                <span {...stylex.props(styles.priorityButtonLabel)}>
                  <Tag label={priorityButtonLabel} kind={showPriorityOnly ? "primary" : "secondary"} pressable />
                </span>
                <span aria-hidden="true" {...stylex.props(styles.priorityButtonIcon)}>
                  <Icon
                    name="star"
                    size={18}
                    fill={showPriorityOnly ? colors.contentInvertA1 : colors.contentGrayA1}
                  />
                </span>
              </button>
            </div>
            <Link
              href={{ pathname: `/project`, query: { focus: true } }}
              aria-label="프로젝트 검색"
              {...stylex.props(styles.searchContainer)}
            >
              <TextInput placeholder="프로젝트나 기술 검색" mocking />
            </Link>
            <ul>{(showPriorityOnly ? priorityProjects : liveContent.projects).map(renderProject)}</ul>
            {showPriorityOnly && priorityProjects.length === 0 && (
              <div {...stylex.props(styles.empty)}>
                <Text color={colors.contentGrayA3}>표시할 주요 프로젝트가 없습니다.</Text>
              </div>
            )}
          </section>
          {!showPriorityOnly && (
            <>
              <Separator />
              <section>
                <SectionHeader title="사이드 프로젝트" />
                <ul>{liveContent.sideProjects.map(renderProject)}</ul>
              </section>
              <Separator />
              <section>
                <SectionHeader title="활동" />
                <ul>{liveContent.activities.map(renderProject)}</ul>
              </section>
            </>
          )}
        </m.div>
      </div>
      <button
        type="button"
        onClick={toggleExpand}
        aria-expanded={expand}
        aria-controls={contentId}
        {...stylex.props(styles.expandButton)}
      >
        <Text kind="body-a1-medium" color={colors.contentGrayA2}>
          {expand ? "줄이기" : "모두 보기"}
        </Text>
      </button>
    </>
  );
};

const MOBILE = "@media (max-width: 640px)";
// const TABLET = "@media (min-width: 640px) and (max-width: 980px)";
const styles = stylex.create({
  container: {
    "::after": {
      content: "''",
      display: "flex",
      position: "absolute",
      left: 0,
      bottom: 0,
      right: 0,
      height: 80,
      backgroundImage: `linear-gradient(0deg, ${colors.backgroundSolidCommon} 0%, ${colors.contentGrayA5} 100%)`,
    },
    position: "relative",
    flexGrow: 1,
    overflow: "hidden",
  },
  containerExpanded: {
    "::after": {
      height: 0,
    },
  },
  ignoreCollapse: {
    height: {
      default: 0,
      [MOBILE]: "auto !important",
    },
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: 12,
  },
  sectionTitle: {
    flexGrow: 1,
    paddingRight: 0,
  },
  priorityButton: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: spaces.paddingHorizontal,
    padding: 0,
    borderWidth: 0,
    borderRadius: 8,
    width: {
      default: "auto",
      [MOBILE]: 32,
    },
    height: {
      default: "auto",
      [MOBILE]: 32,
    },
    backgroundColor: {
      default: "transparent",
      [MOBILE]: colors.contentGrayA4,
    },
    cursor: "pointer",
  },
  priorityButtonSelected: {
    backgroundColor: {
      [MOBILE]: colors.contentGrayA1,
    },
  },
  priorityButtonLabel: {
    display: {
      default: "block",
      [MOBILE]: "none",
    },
  },
  priorityButtonIcon: {
    alignItems: "center",
    justifyContent: "center",
    display: {
      default: "none",
      [MOBILE]: "flex",
    },
  },
  searchContainer: {
    display: "flex",
    flexDirection: "column",
    marginLeft: spaces.paddingHorizontal,
    marginRight: spaces.paddingHorizontal,
    marginTop: 8,
    marginBottom: 12,
  },
  expandButton: {
    justifyContent: "center",
    alignItems: "center",
    display: {
      default: "flex",
      [MOBILE]: "none",
    },
    paddingTop: 8,
    paddingBottom: 12,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: colors.backgroundSolidCommon,
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationColor: colors.contentGrayA3,
    cursor: "pointer",
  },
  empty: {
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 32,
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
  },
});

export default ResumeProjectList;
