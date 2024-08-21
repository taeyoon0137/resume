/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { LayoutProps, PageProps } from "@/types";

/**
 * ### RootLayoutProps
 *
 * 루트 페이지 레이아웃의 프로퍼티 타입을 정의합니다.
 */
export type RootLayoutProps = LayoutProps<["@modal"]>;

/**
 * ### RootPageProps
 *
 * 루트 페이지의 프로퍼티 타입을 정의합니다.
 */
export type RootPageProps = PageProps;

/**
 * ### RootErrorProps
 *
 * 루트 오류 페이지의 프로퍼티 타입을 정의합니다.
 */
export type RootErrorProps = PageProps;
