"use client";

/**
 * Copyright 2026 Taeyoon Lee. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Suspense, useContext, useEffect, useId, useLayoutEffect, useRef } from "react";

import * as stylex from "@stylexjs/stylex";
import { m } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

import { IsModalContext, ModalContext, ModalTitleIdContext } from "@/contexts";

import type { PageModalProps } from "./PageModal.type";
import type { MotionProps } from "framer-motion";

/**
 * ### PageModal
 *
 * 각 페이지를 겹쳐서 모달 형태로 열어주는 컴포넌트입니다.
 *
 * @param props {@link PageModalProps}
 * @component
 */
const PageModal = ({ children }: PageModalProps) => {
  return (
    <Suspense fallback={null}>
      <PageModalInner>{children}</PageModalInner>
    </Suspense>
  );
};

const PageModalInner = ({ children }: PageModalProps) => {
  const modalId = useId();
  const titleId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const setModal = useContext(ModalContext);
  const searchParams = useSearchParams();
  const router = useRouter();

  // 모달이 렌더링 될 때, 그 소식을 다른 컴포넌트에 전파합니다.
  useLayoutEffect(updateModal, []);

  // 파라메터가 변경되는 경우, 최상단으로 스크롤합니다.
  useEffect(scrollToTop, [searchParams]);

  // ESC 키로 모달을 닫을 수 있도록 합니다.
  useEffect(assignEscapeKey, []);

  // 모달 안에서 Tab 포커스를 가두고, 닫힐 때 트리거 요소로 포커스를 복귀합니다.
  useLayoutEffect(manageFocus, []);

  /**
   * 해당 모달이 렌더링 될 때, 모달의 렌더링 내역을 저장합니다.
   *
   * @returns 모달이 렌더링 해제 될 때, 모달의 렌더링 내역을 제거합니다.
   */
  function updateModal(): () => void {
    addModal();
    return removeModal;
  }

  /**
   * 모달을 추가합니다.
   */
  function addModal(): void {
    setModal((prev) => [...prev, modalId]);
  }

  /**
   * 모달을 제거합니다.
   */
  function removeModal(): void {
    setModal((prev) => prev.filter((id) => id !== modalId));
  }

  /**
   * 최상단으로 스크롤합니다.
   */
  function scrollToTop(): void {
    scrollRef.current?.scrollTo(0, 0);
  }

  /**
   * ESC 키 입력을 감지하여 모달을 닫습니다.
   *
   * @returns 클린업 함수
   */
  function assignEscapeKey(): () => void {
    function handleKeydown(event: KeyboardEvent): void {
      if (event.key === "Escape") router.back();
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }

  /**
   * 모달의 포커스 흐름을 제어합니다.
   * 모달이 열릴 때 직전에 포커스되어 있던 요소를 기억해 두고,
   * 모달 내부 첫 포커스 가능 요소로 포커스를 이동합니다.
   * 모달이 열려있는 동안 Tab/Shift+Tab은 모달 안에서만 순환하며,
   * 모달이 닫힐 때 이전 포커스 요소로 복귀합니다.
   *
   * @returns 클린업 함수
   */
  function manageFocus(): () => void {
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const container = scrollRef.current;

    if (container) {
      const firstFocusable = getFocusableElements(container)[0];
      firstFocusable?.focus({ preventScroll: true });
    }

    function handleKeydown(event: KeyboardEvent): void {
      if (event.key !== "Tab" || !container) return;

      const focusables = getFocusableElements(container);
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !container.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }

  /**
   * 백드롭 클릭 시 동작을 정의합니다.
   */
  function handleBackdropClick(): void {
    router.back();
  }

  return (
    <IsModalContext.Provider value={true}>
      <ModalTitleIdContext.Provider value={titleId}>
        <m.div
          key={modalId}
          ref={scrollRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          {...transition}
          {...stylex.props(styles.modal)}
        >
          <button
            type="button"
            onClick={handleBackdropClick}
            aria-label="닫기"
            tabIndex={-1}
            {...stylex.props(styles.backdrop)}
          />
          {children}
        </m.div>
      </ModalTitleIdContext.Provider>
    </IsModalContext.Provider>
  );
};

/**
 * 컨테이너 내부의 포커스 가능 요소들을 반환합니다.
 * 비활성 요소나 tabIndex가 -1인 요소는 제외합니다.
 *
 * @param container 검색 대상 컨테이너
 * @returns 포커스 가능 요소 배열
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = [
    "a[href]",
    "area[href]",
    "button:not([disabled])",
    "input:not([disabled]):not([type='hidden'])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1,
  );
}

/**
 * ### 트랜지션
 *
 * 화면 전환 애니메이션을 설정합니다.
 */
const transition: MotionProps = {
  initial: {
    y: "100vh",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      bounce: 0,
      delay: 0.2,
      duration: 0.2,
      ease: [0, 0.6, 0.4, 1],
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const styles = stylex.create({
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "block",
    overflow: "auto",
    cursor: "pointer",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    cursor: "pointer",
    zIndex: -1,
  },
});

export default PageModal;
