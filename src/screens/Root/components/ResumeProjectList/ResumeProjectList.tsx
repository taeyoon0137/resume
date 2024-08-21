"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useState } from "react";

import stylex from "@stylexjs/stylex";
import { domAnimation, HTMLMotionProps, LazyMotion, m } from "framer-motion";
import Link from "next/link";

import { ProjectItem, SectionHeader } from "@/components";
import { content } from "@/contents";
import { Separator, Text, TextInput } from "@/elements";

import { colors } from "../../../../styles/variable/colors.stylex";
import { spaces } from "../../../../styles/variable/spaces.stylex";

/**
 * ### 프로젝트 목록
 *
 * 이력서 프로젝트 목록 컴포넌트입니다.
 *
 * @component
 */
const ResumeProjectList = () => {
  const [expand, setExpand] = useState(false);

  /**
   * 프로젝트를 펼치거나 닫습니다.
   */
  function toggleExpand() {
    setExpand((prev) => !prev);
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
    <LazyMotion features={domAnimation} strict>
      <div aria-expanded={expand} {...stylex.props(styles.container(expand))}>
        <m.div {...animation}>
          <section>
            <SectionHeader title="프로젝트" />
            <Link href={{ pathname: `/projects`, query: { focus: true } }} {...stylex.props(styles.searchContainer)}>
              <TextInput placeholder="프로젝트 이름이나 기술로 검색해보세요" mocking />
            </Link>
            <ul>
              {content.projects.map((project) => (
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
              ))}
            </ul>
          </section>
          <Separator />
          <section>
            <SectionHeader title="사이드 프로젝트" />
            <ul>
              {content.sideProjects.map((project) => (
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
              ))}
            </ul>
          </section>
          <Separator />
          <section>
            <SectionHeader title="활동" />
            <ul>
              {content.activities.map((project) => (
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
              ))}
            </ul>
          </section>
        </m.div>
      </div>
      <button onClick={toggleExpand} {...stylex.props(styles.expandButton)}>
        <Text kind="body-a1-medium" color={colors.contentGrayA2}>
          {expand ? "줄이기" : "모두 보기"}
        </Text>
      </button>
    </LazyMotion>
  );
};

const styles = stylex.create({
  container: (expand: boolean) => ({
    "::after": {
      content: "''",
      display: "flex",
      position: "absolute",
      left: 0,
      bottom: 0,
      right: 0,
      height: expand ? 0 : 80,
      background: `linear-gradient(0deg, ${colors.backgroundSolidCommon} 0%, ${colors.contentGrayA5} 100%)`,
    },
    position: "relative",
    flexGrow: 1,
    overflow: "hidden",
  }),
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
});

export default ResumeProjectList;
