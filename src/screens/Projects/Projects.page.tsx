"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import stylex from "@stylexjs/stylex";
import * as hangul from "hangul-js";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { PageFooter, PageHeader, PageSheet, ProjectItem } from "@/components";
import { content } from "@/contents";
import { Separator, Text, TextInput } from "@/elements";

import { colors } from "../../styles/variable/colors.stylex";
import { spaces } from "../../styles/variable/spaces.stylex";

import type { ProjectsPageProps } from "./Projects.type";
import type { ChangeEvent } from "react";

/**
 * ### ProjectsPage
 *
 * 참여 프로젝트 목록 페이지의 루트 컴포넌트입니다.
 *
 * @param props {@link ProjectsPageProps}
 * @page
 *
 * @deprecated 이 컴포넌트 대신 `Projects.Page`를 사용하세요.
 */
const ProjectsPage = (_props: ProjectsPageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") ?? "");
  const projects = useMemo(getProjects, [keyword]);
  const subKeyword = useMemo(getSubKeyword, [keyword]);

  // 페이지가 로드되었을 때, 포커스 여부가 전달되면 검색창에 포커스를 줍니다.
  useEffect(initFocus, []);

  // URL에서 검색 파라미터를 수신합니다.
  useEffect(receiveSearchParam, [searchParams]);

  /**
   * 페이지가 로드되었을 때, search param에 focus가 있다면 검색창에 포커스를 줍니다.
   * 이후 해당 search param을 제거합니다.
   */
  function initFocus(): void {
    if (searchParams.has("focus")) {
      // 검색창에 포커스를 줍니다.
      inputRef.current?.focus();

      // focus 파라미터를 제거합니다.
      const params = new URLSearchParams(searchParams);
      params.delete("focus");

      // 변경된 파라미터를 사용해 URL을 업데이트
      // History를 남기지 않기 위해 replace를 사용합니다.
      router.replace(`?${params.toString()}`);
    }
  }

  /**
   * URL에서 검색 파라미터를 수신합니다.
   */
  function receiveSearchParam(): void {
    const keyword = searchParams.get("keyword");
    setKeyword(keyword ?? "");
  }

  /**
   * 프로젝트 목록을 반환합니다.
   * 검색 처리 또한 함께 수행합니다.
   *
   * @returns 프로젝트 목록
   */
  function getProjects() {
    return [...content.projects, ...content.sideProjects].filter((project) => {
      // 검색어가 없으면 모든 프로젝트를 반환합니다.
      if (!keyword) return true;

      // 검색어를 정제합니다.
      const cleanKeyword = cleanText(keyword);

      // 프로젝트 이름에서 검색
      if (cleanText(project.title).includes(cleanKeyword)) return true;

      // 조직에서 검색
      if (project.organization && cleanText(project.organization.name).includes(cleanKeyword)) return true;

      // 프로젝트 기술에서 검색
      if (project.techStacks?.some((techStack) => cleanText(techStack).includes(cleanKeyword))) return true;
    });
  }

  /**
   * 보조 검색 키워드를 반환합니다.
   *
   * @returns 보조 검색 키워드
   */
  function getSubKeyword(): string | undefined {
    // 검색어가 없으면 모든 아무것도 반환하지 않습니다.
    if (!keyword) return;

    // 검색어를 정제합니다.
    const cleanKeyword = cleanText(keyword);

    // 찾아볼 보조 검색어 목록입니다.
    const subKeywords = Object.entries({
      피그마: "Figma",
      리액트: "React",
      리액트네이티브: "React Native",
      로티: "Lottie",
    });

    // 보조 검색어를 찾습니다.
    const subKeyword = subKeywords.find(([key]) => cleanText(key).includes(cleanKeyword));

    // 보조 검색어가 1개라면 반환합니다.
    return subKeyword?.[1];
  }

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

  /**
   * 검색어가 변경되었을 때 호출되는 함수입니다.
   * 검색어를 URL에 반영합니다.
   * 결과는 URL을 통해 수신받아 이용합니다.
   *
   * @param event - 검색어 변경 이벤트
   */
  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>): void {
    // 검색어를 상태에 반영합니다.
    setKeyword(event.target.value);

    // 검색어를 URL에 반영합니다.
    const params = new URLSearchParams(searchParams);

    // 파라미터를 새로운 값으로 업데이트
    params.set("keyword", event.target.value);

    // 변경된 파라미터를 사용해 URL을 업데이트
    // History를 남기지 않기 위해 replace를 사용합니다.
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  /**
   * 검색어 입력창에서 엔터키를 눌렀을 때, 포커스를 해제합니다.
   *
   * @param event - 키보드 이벤트
   */
  function handleKeydown(event: React.KeyboardEvent<HTMLInputElement>): void {
    // 엔터키를 눌렀을 때, 포커스를 해제합니다.
    // 한글 조합 중일때는 생략합니다.
    if (event.key === "Enter" && !event.nativeEvent.isComposing) {
      inputRef.current?.blur();
    }
  }

  return (
    <Suspense fallback={<div></div>}>
      <PageSheet>
        <PageHeader
          title="프로젝트"
          below={
            <TextInput
              ref={inputRef}
              value={keyword}
              onChange={handleKeywordChange}
              onKeyDown={handleKeydown}
              placeholder={`${projects.length}개의 프로젝트`}
              style={styles.searchBar}
            />
          }
        />
        {subKeyword && (
          <Text color={colors.contentGrayA2} style={styles.subKeywordGuide}>
            혹시&nbsp;
            <Link
              href={{ pathname: "/project", query: { keyword: subKeyword } }}
              scroll={false}
              replace={true}
              {...stylex.props(styles.subKeyword)}
            >
              {subKeyword}
            </Link>
            를 검색하셨나요?
          </Text>
        )}

        <ul {...stylex.props(styles.scroll)}>
          {projects.map((project) => (
            <li key={project.title}>
              <ProjectItem
                title={project.title}
                role={project.role}
                organization={project.organization ?? { name: "개인 프로젝트" }}
                techStacks={project.techStacks}
                summary={project.summary}
                period={project.period}
                duration={project.duration}
                thumbnail={project.thumbnail}
                link={project.link}
              />
            </li>
          ))}
          {projects.length === 0 && (
            <div {...stylex.props(styles.empty)}>
              <Text color={colors.contentGrayA3}>검색 결과가 없습니다.</Text>
            </div>
          )}
        </ul>
        <Separator />
        <PageFooter />
      </PageSheet>
    </Suspense>
  );
};

const MOBILE = "@media (max-width: 640px)";
// const TABLET = "@media (min-width: 640px) and (max-width: 980px)";
const styles = stylex.create({
  searchBar: {
    display: "flex",
    flexDirection: "column",
    marginLeft: spaces.paddingHorizontal,
    marginRight: spaces.paddingHorizontal,
    marginTop: 8,
    marginBottom: 12,
  },
  subKeywordGuide: {
    marginLeft: spaces.paddingHorizontal,
    marginRight: spaces.paddingHorizontal,
    marginTop: 8,
    marginBottom: 12,
  },
  subKeyword: {
    textDecoration: {
      default: "none",
      ":hover": "underline",
    },
    textDecorationColor: colors.contentGrayA2,
    color: colors.contentGrayA1,
  },
  scroll: {
    flexGrow: 1,
  },
  empty: {
    alignItems: "center",
    paddingTop: {
      default: 32,
      [MOBILE]: 16,
    },
    paddingBottom: {
      default: 32,
      [MOBILE]: 16,
    },
    paddingLeft: spaces.paddingHorizontal,
    paddingRight: spaces.paddingHorizontal,
  },
});

export default ProjectsPage;
