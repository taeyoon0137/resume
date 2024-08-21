/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { z } from "zod";

// #region 스타일 타입 정의
/**
 * ### 컨텐츠 스타일
 *
 * 컨텐츠의 스타일을 설정합니다.
 *
 * @zod
 */
export const ContentStyle = z.object({
  backgrounds: z.string().array().optional(),
});
export type ContentStyle = z.infer<typeof ContentStyle>;
// #endregion 스타일 타입 정의

// #region 연락처 타입 정의
/**
 * ### 연락처 종류
 *
 * 연락처로 사용할 수 있는 종류를 정의합니다.
 *
 * @zod
 */
export const ContactDataType = z.enum(["phone", "email", "web", "github"]);
export type ContactDataType = z.infer<typeof ContactDataType>;

/**
 * ### 연락처 데이터
 *
 * 연락처를 저장할 수 있는 데이터입니다.
 *
 * @zod
 */
export const ContentContact = z.object({
  type: ContactDataType,
  value: z.string(),
});
export type ContentContact = z.infer<typeof ContentContact>;
// #endregion 연락처 타입 정의

// #region 직장 타입 정의
/**
 * ### 직무 및 직함
 *
 * 회사 내에서 담당했던 직무 및 직함, 그 기간을 설정합니다.
 *
 * @param array - 배열 타입 여부
 *
 * @zod
 */
export const ContentJob = z.object({
  roles: z.string().array(),
  startYear: z.number(),
  startMonth: z.number().min(1).max(12),
  still: z.boolean().optional(),
  endYear: z.number().optional(),
  endMonth: z.number().min(1).max(12).optional(),
});
export type ContentJob = z.infer<typeof ContentJob>;

/**
 * ### 회사 정보
 *
 * 근무했던 회사 정보를 기록합니다.
 *
 * @param array - 배열 타입 여부
 *
 * @zod
 */
export const ContentCompany = z.object({
  company: z.string(),
  jobs: ContentJob.array(),
  handle: z.string().optional(),
  link: z.string().optional(),
});
export type ContentCompany = z.infer<typeof ContentCompany>;
// #endregion 직장 타입 정의

// #region 학력 타입 정의
/**
 * ### 학력 정보
 *
 * 학력 정보를 기록합니다.
 *
 * @zod
 */
export const ContentSchool = z.object({
  school: z.string(),
  major: z.string(),
  startYear: z.number(),
  still: z.boolean().optional(),
  endYear: z.number().optional(),
});
export type ContentSchool = z.infer<typeof ContentSchool>;
// #endregion 학력 타입 정의

// #region 수상 내역 타입 정의
/**
 * ### 수상 내역
 *
 * 수상 내역을 기록합니다.
 *
 * @zod
 */
export const ContentAward = z.object({
  award: z.string(),
  prize: z.string(),
  organization: z.string(),
  issueYear: z.number(),
  issueMonth: z.number().min(1).max(12),
  link: z.string().optional(),
  pin: z.boolean().optional(),
});
export type ContentAward = z.infer<typeof ContentAward>;
// #endregion 수상 내역 타입 정의

// #region 자격증 타입 정의
/**
 * ### 자격증 정보
 *
 * 자격증 정보를 기록합니다.
 *
 * @zod
 */
export const ContentLicense = z.object({
  license: z.string(),
  organization: z.string(),
  issueYear: z.number(),
  issueMonth: z.number().min(1).max(12),
  pin: z.boolean().optional(),
});
export type ContentLicense = z.infer<typeof ContentLicense>;
// #endregion 자격증 타입 정의

// #region 프로젝트 타입 정의
/**
 * ### 프로젝트 정보
 *
 * 프로젝트 정보를 기록합니다.
 *
 * @zod
 */
export const ContentProject = z.object({
  project: z.string(),
  rootProject: z.string().optional(),
  link: z.string().url().optional(),
  thumbnail: z.union([z.any(), z.object({ url: z.string().url() })]).optional(),
  roles: z.string().array().optional(),
  organization: z.string().optional(),
  techStacks: z.string().array().optional(),
  content: z
    .object({
      summary: z.string().array().optional(),
      details: z.string().optional(),
    })
    .optional(),
  member: z.number().optional(),
  startYear: z.number(),
  startMonth: z.number().min(1).max(12),
  still: z.boolean().optional(),
  endYear: z.number().optional(),
  endMonth: z.number().min(1).max(12).optional(),
  duration: z.number().optional(),
});
export type ContentProject = z.infer<typeof ContentProject>;
// #endregion 프로젝트 타입 정의

// #region 전체 이력서 데이터 타입 정의
/**
 * ### 이력서 콘텐츠 데이터
 *
 * 이력서에 사용되는 데이터를 정의합니다.
 *
 * @param array - 배열 타입 여부
 *
 * @zod
 */
export const ContentData = z.object({
  name: z.string(),
  memo: z.string().optional(),
  copyright: z.string(),
  contacts: ContentContact.array().array(),
  techStacks: z.string().array().array(),
  companies: ContentCompany.array(),
  schools: ContentSchool.array(),
  awards: ContentAward.array(),
  licenses: ContentLicense.array(),
  projects: ContentProject.array(),
  sideProjects: ContentProject.array(),
  activities: ContentProject.array(),
  style: ContentStyle.optional(),
});
export type ContentData = z.infer<typeof ContentData>;
// #endregion 전체 이력서 데이터 타입 정의
