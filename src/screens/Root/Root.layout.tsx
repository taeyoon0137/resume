"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useMemo, useState } from "react";

import * as stylex from "@stylexjs/stylex";
import { AnimatePresence } from "framer-motion";

import { PageBackground } from "@/components";
import { content } from "@/contents";
import { IsModalOpenContext, ModalContext, ThemeContext } from "@/contexts";

import { colors, darkTheme, lightTheme } from "../../styles/variable/colors.stylex";

import type { RootLayoutProps } from "./Root.type";
import type { ResolvedThemeMode, ThemeMode } from "@/contexts";

const siteUrl = "https://resume.taeyoon.xyz";
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
      name: "taeyoon. – resume",
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
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [systemThemeMode, setSystemThemeMode] = useState<ResolvedThemeMode>("light");
  const isModalOpen = useMemo(getIsModalOpen, [modalList.length]);
  const resolvedThemeMode = themeMode === "system" ? systemThemeMode : themeMode;

  useEffect(scrollLock, [isModalOpen]);
  useEffect(observeSystemTheme, []);

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
   * 모달이 1개 이상 열려있는지 확인합니다.
   *
   * @returns 모달이 열려있는지 여부
   */
  function getIsModalOpen(): boolean {
    return modalList.length > 0;
  }

  /**
   * 테마 버튼을 눌렀을 때 다음 테마 상태로 변경합니다.
   */
  function toggleThemeMode(): void {
    setThemeMode(getNextThemeMode());
  }

  /**
   * 다음 테마 상태를 반환합니다.
   *
   * @returns 다음 테마 상태
   */
  function getNextThemeMode(): ThemeMode {
    if (themeMode === "system") {
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
      {...stylex.props(
        themeMode === "light" && lightTheme,
        themeMode === "dark" && darkTheme,
        resolvedThemeMode === "dark" ? styles.darkColorScheme : styles.lightColorScheme,
      )}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

        {/* 배경 렌더링 */}
        <PageBackground style={styles.background} />

        {/* 모달 상태 처리 */}
        <ModalContext.Provider value={setModalList}>
          {/* 테마 상태 처리 */}
          <ThemeContext.Provider value={themeContext}>
            {/* 페이지 처리 */}
            <IsModalOpenContext.Provider value={isModalOpen}>{children}</IsModalOpenContext.Provider>

            {/* 상위 페이지 처리 */}
            <AnimatePresence>{modal}</AnimatePresence>
          </ThemeContext.Provider>
        </ModalContext.Provider>
      </body>
    </html>
  );
};

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
