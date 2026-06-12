"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useEffect, useRef } from "react";

import * as stylex from "@stylexjs/stylex";

import { flushAnalytics, initAmplitude, trackEvent } from "@/api";
import { Text } from "@/elements";

import { colors } from "../../styles/variable/colors.stylex";

import type { PortfolioDownloadProps } from "./Portfolio.type";

const PORTFOLIO_FILE_PATH = "/download/portfolio/20260610";
const HOME_PATH = "/";
const REDIRECT_DELAY_MS = 1200;

/**
 * ### PortfolioDownload
 *
 * 포트폴리오 다운로드 화면입니다.
 * 다운로드 이벤트를 기록하고 파일 다운로드를 시작한 뒤 메인 페이지로 이동합니다.
 *
 * @param props {@link PortfolioDownloadProps}
 * @page
 */
const PortfolioDownload = (_props: PortfolioDownloadProps) => {
  const startedRef = useRef(false);

  useEffect(startDownloadFlow, []);

  /**
   * 다운로드 이벤트 기록, 파일 다운로드, 메인 페이지 이동을 순서대로 시작합니다.
   * StrictMode의 effect 중복 실행에도 한 번만 동작하도록 막습니다.
   */
  function startDownloadFlow(): void {
    if (startedRef.current) return;
    startedRef.current = true;

    // 이 effect는 분석을 초기화하는 루트 레이아웃의 effect보다 먼저 실행되므로,
    // 이벤트가 유실되지 않도록 직접 초기화합니다. 중복 초기화는 내부에서 차단됩니다.
    initAmplitude();
    trackEvent("File Downloaded", { URL: `${window.location.origin}${PORTFOLIO_FILE_PATH}` });
    flushAnalytics();

    // 파일 응답이 attachment라 페이지를 벗어나지 않고 다운로드만 시작됩니다.
    window.location.assign(PORTFOLIO_FILE_PATH);

    window.setTimeout(() => {
      window.location.replace(HOME_PATH);
    }, REDIRECT_DELAY_MS);
  }

  return (
    <main {...stylex.props(styles.container)}>
      <Text kind="body-a1-regular">포트폴리오 다운로드를 시작합니다.</Text>

      <div {...stylex.props(styles.links)}>
        <a href={PORTFOLIO_FILE_PATH} rel="nofollow" {...stylex.props(styles.link)}>
          <Text kind="body-a2-regular" color={colors.contentGrayA2}>
            다운로드가 시작되지 않으면 다시 시도하세요.
          </Text>
        </a>
        <a href={HOME_PATH} {...stylex.props(styles.link)}>
          <Text kind="body-a2-regular" color={colors.contentGrayA2}>
            resume.taeyoon.xyz
          </Text>
        </a>
      </div>
    </main>
  );
};

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    minHeight: "100dvh",
    padding: 20,
  },
  links: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  link: {
    textDecorationColor: colors.contentGrayA3,
  },
});

export default PortfolioDownload;
