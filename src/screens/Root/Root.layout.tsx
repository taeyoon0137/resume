"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useCallback, useEffect, useMemo, useState } from "react";

import * as stylex from "@stylexjs/stylex";
import { AnimatePresence, domAnimation, LazyMotion } from "framer-motion";

import { GoogleTag, initAmplitude, trackEvent } from "@/api";
import { PageBackground } from "@/components";
import { content } from "@/contents";
import { IsModalOpenContext, ModalContext, ThemeContext } from "@/contexts";
import { siteTitle, siteUrl } from "@/utils";

import { colors, darkTheme, lightTheme } from "../../styles/variable/colors.stylex";

import type { RootLayoutProps } from "./Root.type";
import type { ResolvedThemeMode, ThemeMode } from "@/contexts";

const THEME_STORAGE_KEY = "theme-mode";
const profilePageId = `${siteUrl}/#profile`;
const personId = `${siteUrl}/#person`;
const flatContacts = content.contacts.flat();
const email = flatContacts.find((contact) => contact.type === "email")?.value;
const sameAs = flatContacts
  .filter((contact) => contact.type === "web" || contact.type === "github")
  .map((contact) => contact.link);
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@id": personId,
      "@type": "Person",
      email,
      jobTitle: content.job.roles,
      name: content.info.name,
      sameAs,
      url: siteUrl,
      worksFor: {
        "@type": "Organization",
        name: content.job.company,
        url: content.job.link,
      },
    },
    {
      "@id": profilePageId,
      "@type": "ProfilePage",
      about: {
        "@id": personId,
      },
      inLanguage: "ko-KR",
      mainEntity: {
        "@id": personId,
      },
      name: siteTitle,
      url: siteUrl,
    },
  ],
}).replace(/</g, "\\u003c");

/**
 * ### RootLayout
 *
 * 루트 레이아웃입니다.
 * 상단에 추가 페이지를 열어 렌더링 할 수 있습니다.
 *
 * @param props {@link RootLayoutProps}
 * @layout
 */
const RootLayout = ({ modal, children }: RootLayoutProps) => {
  const [modalList, setModalList] = useState<string[]>([]);
  const [themeMode, setThemeMode] = useState<ThemeMode>(getInitialThemeMode);
  const [systemThemeMode, setSystemThemeMode] = useState<ResolvedThemeMode>("light");
  const isModalOpen = useMemo(getIsModalOpen, [modalList.length]);
  const resolvedThemeMode = themeMode === "system" ? systemThemeMode : themeMode;
  // themeMode가 바뀔 때만 새로 만들어 context 값의 불필요한 재생성을 막습니다.
  const toggleThemeMode = useCallback(handleToggleThemeMode, [themeMode]);

  useEffect(scrollLock, [isModalOpen]);
  useEffect(observeSystemTheme, []);
  useEffect(initAmplitude, []);
  useEffect(assignClickAnalyticsListener, []);

  /**
   * 시스템 테마 변경을 감지합니다.
   *
   * @returns 클린업 함수
   */
  function observeSystemTheme(): () => void {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    function syncSystemThemeMode(): void {
      setSystemThemeMode(mediaQueryList.matches ? "dark" : "light");
    }

    syncSystemThemeMode();
    mediaQueryList.addEventListener("change", syncSystemThemeMode);

    return () => mediaQueryList.removeEventListener("change", syncSystemThemeMode);
  }

  /**
   * 모달이 열렸을 때, body 스크롤을 차단합니다.
   *
   * @returns 클린업 함수
   */
  function scrollLock(): () => void {
    const body = document.body;

    if (isModalOpen) {
      body.style.overflow = "hidden";
    }

    return () => {
      body.style.overflow = "";
    };
  }

  /**
   * 링크와 버튼 클릭 분석 이벤트 리스너를 등록합니다.
   *
   * @returns 클린업 함수
   */
  function assignClickAnalyticsListener(): () => void {
    function handleClick(event: MouseEvent): void {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const clickableElement = target.closest("a[href], button");

      if (clickableElement instanceof HTMLAnchorElement) {
        trackEvent("Link Clicked", {
          URL: clickableElement.href,
          Text: getElementLabel(clickableElement) || clickableElement.href,
        });
        return;
      }

      if (clickableElement instanceof HTMLButtonElement) {
        trackEvent("Button Clicked", {
          Text: getButtonLabel(clickableElement),
        });
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }

  /**
   * 모달이 1개 이상 열려있는지 확인합니다.
   *
   * @returns 모달이 열려있는지 여부
   */
  function getIsModalOpen(): boolean {
    return modalList.length > 0;
  }

  /**
   * 테마 버튼을 눌렀을 때 다음 테마 상태로 변경합니다.
   * 새로고침 후에도 유지되도록 변경된 테마를 저장합니다.
   */
  function handleToggleThemeMode(): void {
    const nextThemeMode = getNextThemeMode(themeMode);

    setThemeMode(nextThemeMode);
    storeThemeMode(nextThemeMode);
  }

  /**
   * 테마 설정을 localStorage에 저장합니다.
   * 시스템 테마는 기본값이므로 저장된 값을 제거합니다.
   *
   * @param mode 저장할 테마 설정
   */
  function storeThemeMode(mode: ThemeMode): void {
    try {
      if (mode === "system") {
        window.localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        window.localStorage.setItem(THEME_STORAGE_KEY, mode);
      }
    } catch {
      // 저장이 차단된 환경에서는 현재 세션에서만 테마를 유지합니다.
    }
  }

  /**
   * 다음 테마 상태를 반환합니다.
   *
   * @param currentThemeMode 현재 테마 상태입니다.
   * @returns 다음 테마 상태
   */
  function getNextThemeMode(currentThemeMode: ThemeMode): ThemeMode {
    if (currentThemeMode === "system") {
      const currentSystemThemeMode = getCurrentSystemThemeMode();

      return currentSystemThemeMode === "dark" ? "light" : "dark";
    }

    return "system";
  }

  /**
   * 클릭 시점의 시스템 테마를 반환합니다.
   *
   * @returns 시스템 테마
   */
  function getCurrentSystemThemeMode(): ResolvedThemeMode {
    if (typeof window === "undefined") return systemThemeMode;

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  const themeContext = useMemo(
    () => ({
      themeMode,
      resolvedThemeMode,
      toggleThemeMode,
    }),
    [themeMode, resolvedThemeMode, toggleThemeMode],
  );

  return (
    <html
      lang="ko"
      data-theme={themeMode}
      // 저장된 테마를 첫 페인트 전에 스크립트로 적용하므로,
      // 서버가 그린 system 기준 속성과의 차이는 무시합니다.
      suppressHydrationWarning
      {...stylex.props(
        themeMode === "light" && lightTheme,
        themeMode === "dark" && darkTheme,
        resolvedThemeMode === "dark" ? styles.darkColorScheme : styles.lightColorScheme,
      )}
    >
      <body>
        {/* Pretendard 폰트 CDN 연결을 미리 수립해 폰트 요청 체인을 단축합니다. */}
        {/* 폰트 파일은 CORS로 요청되므로 crossOrigin을 지정합니다. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

        {/* 저장된 테마를 첫 페인트 전에 적용 */}
        <script dangerouslySetInnerHTML={{ __html: createThemeInitializerScript() }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

        {/* 방문 분석 (프로덕션 전용) */}
        <GoogleTag />

        {/* 배경 렌더링 */}
        <PageBackground style={styles.background} />

        {/* 모달 상태 처리 */}
        <ModalContext.Provider value={setModalList}>
          {/* 테마 상태 처리 */}
          <ThemeContext.Provider value={themeContext}>
            <LazyMotion features={domAnimation} strict>
              {/* 페이지 처리 */}
              <IsModalOpenContext.Provider value={isModalOpen}>{children}</IsModalOpenContext.Provider>

              {/* 상위 페이지 처리 */}
              <AnimatePresence>{modal}</AnimatePresence>
            </LazyMotion>
          </ThemeContext.Provider>
        </ModalContext.Provider>
      </body>
    </html>
  );
};

/**
 * 첫 렌더에 사용할 테마 설정을 반환합니다.
 * 서버에서는 기본값(system)을 사용하고,
 * 클라이언트에서는 저장된 테마 설정을 읽습니다.
 *
 * @returns 초기 테마 설정
 */
function getInitialThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system";

  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

/**
 * 저장된 테마를 첫 페인트 전에 적용하는 인라인 스크립트를 생성합니다.
 * 서버 HTML은 system 테마 기준으로 렌더링되므로,
 * 저장된 테마가 있다면 hydration 전에 클래스와 속성을 맞춰
 * 테마가 번쩍이며 바뀌는 현상을 막습니다.
 *
 * @returns 인라인 스크립트 문자열
 */
function createThemeInitializerScript(): string {
  const classNames = JSON.stringify({
    light: stylex.props(lightTheme).className ?? "",
    dark: stylex.props(darkTheme).className ?? "",
    lightScheme: stylex.props(styles.lightColorScheme).className ?? "",
    darkScheme: stylex.props(styles.darkColorScheme).className ?? "",
  });

  return `(function () {
  try {
    var mode = localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    if (mode !== "light" && mode !== "dark") return;

    var classNames = ${classNames};
    var html = document.documentElement;
    var update = function (action, names) {
      names.split(" ").forEach(function (name) {
        if (name) html.classList[action](name);
      });
    };

    html.dataset.theme = mode;
    update("remove", classNames.lightScheme);
    update("remove", classNames.darkScheme);
    update("add", mode === "light" ? classNames.light : classNames.dark);
    update("add", mode === "light" ? classNames.lightScheme : classNames.darkScheme);
  } catch (error) {}
})();`;
}

/**
 * 요소의 분석 이벤트용 표시 텍스트를 반환합니다.
 *
 * @param element 텍스트를 추출할 요소입니다.
 * @returns 분석 이벤트에 사용할 표시 텍스트입니다.
 */
function getElementLabel(element: HTMLElement): string {
  return getFirstText(element.getAttribute("aria-label"), element.getAttribute("title"), element.textContent);
}

/**
 * 버튼의 분석 이벤트용 표시 텍스트를 반환합니다.
 *
 * @param button 텍스트를 추출할 버튼입니다.
 * @returns 분석 이벤트에 사용할 버튼 표시 텍스트입니다.
 */
function getButtonLabel(button: HTMLButtonElement): string {
  return getFirstText(
    button.getAttribute("aria-label"),
    button.getAttribute("title"),
    button.textContent,
    button.value,
    button.name,
    button.type,
  );
}

/**
 * 첫 번째로 비어 있지 않은 텍스트를 반환합니다.
 *
 * @param values 후보 텍스트 목록입니다.
 * @returns 공백이 정리된 첫 번째 텍스트입니다.
 */
function getFirstText(...values: Array<string | null | undefined>): string {
  for (const value of values) {
    const text = value?.replace(/\s+/g, " ").trim();

    if (text) return text;
  }

  return "";
}

const styles = stylex.create({
  lightColorScheme: {
    colorScheme: "light",
  },
  darkColorScheme: {
    colorScheme: "dark",
  },
  background: {
    position: "fixed",
    display: "block",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
  },
  warningContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  warning: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 4,
    width: "100%",
    maxWidth: 360,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.lineOutline,
    borderRadius: 16,
    backgroundColor: colors.backgroundSolidCommon,
    boxShadow: `0 4px 20px 0px ${colors.lineSeparatorFill}`,
  },
});

export default RootLayout;
