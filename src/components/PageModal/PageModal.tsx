"use client";

/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useContext, useId, useLayoutEffect } from "react";

import stylex from "@stylexjs/stylex";
import { cubicBezier, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { ModalContext } from "@/contexts";

import type { PageModalProps } from "./PageModal.type";
import type { AnimationProps } from "framer-motion";

/**
 * ### PageModal
 *
 * 각 페이지를 겹쳐서 모달 형태로 열어주는 컴포넌트입니다.
 *
 * @param props {@link PageModalProps}
 * @component
 */
const PageModal = ({ children }: PageModalProps) => {
  const modalId = useId();
  const setModal = useContext(ModalContext);
  const router = useRouter();

  // 모달이 렌더링 될 때, 그 소식을 다른 컴포넌트에 전파합니다.
  useLayoutEffect(updateModal, []);

  /**
   * 해당 모달이 렌더링 될 때, 모달의 렌더링 내역을 저장합니다.
   *
   * @returns 모달이 렌더링 해제 될 떄, 모달의 렌더링 내역을 제거합니다.
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
   * 백드롭 클릭 시 동작을 정의합니다.
   */
  function handleBackdropClick(): void {
    router.back();
  }

  return (
    <motion.div key={modalId} {...transition} {...stylex.props(styles.modal)}>
      <div onClick={handleBackdropClick} {...stylex.props(styles.backdrop)} />
      {children}
    </motion.div>
  );
};

/**
 * ### 트랜지션
 *
 * 화면 전환 애니메이션을 설정합니다.
 */
const transition: AnimationProps = {
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
      ease: cubicBezier(0, 0.6, 1 - 0.6, 1),
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
    overflow: "scroll",
    cursor: "pointer",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export default PageModal;
