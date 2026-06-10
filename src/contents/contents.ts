/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import { formatMonthLength } from "@/utils";

import { contentData } from "./content.data";

import type {
  ContentAward,
  ContentCompany,
  ContentContact,
  ContentData,
  ContentLicense,
  ContentProject,
  ContentSchool,
  ContentStyle,
} from "./contents.type";

/**
 * ### 컨텐츠
 *
 * 컴포넌트에 사용되는 텍스트, 이미지 등의 컨텐츠를 정의합니다.
 */
export const content = createContent(contentData);

/**
 * 원본 콘텐츠를 이력서 렌더링을 위한 형태로 가공하여 반환합니다.
 * 이 데이터를 기반으로 이력서를 생성합니다.
 *
 * @param data {@link ContentData}
 * @returns 가공된 컨텐츠
 */
function createContent(data: ContentData) {
  const info = getInfo(data);
  const job = getJob(data.companies);
  const contacts = getContacts(data.contacts);
  const techStacks = getTechStacks(data.techStacks);
  const companies = getCompanies(data.companies);
  const schools = getSchools(data.schools);
  const awards = getAwards(data.awards);
  const licenses = getLicenses(data.licenses);
  const projects = getProjects(data.projects);
  const sideProjects = getProjects(data.sideProjects);
  const activities = getProjects(data.activities);
  const style = getStyle(data.style);

  return {
    info,
    job,
    contacts,
    techStacks,
    companies,
    schools,
    awards,
    licenses,
    projects,
    sideProjects,
    activities,
    style,
  };
}

/**
 * 시작월과 종료월을 모두 포함한 재직 개월 수를 반환합니다.
 *
 * @param startYear 시작 연도입니다.
 * @param startMonth 시작 월입니다.
 * @param endYear 종료 연도입니다.
 * @param endMonth 종료 월입니다.
 * @returns 재직 개월 수입니다.
 */
function getJobMonthLength(startYear: number, startMonth: number, endYear: number, endMonth: number) {
  return getMonthDifference(startYear, startMonth, endYear, endMonth) + 1;
}

/**
 * 시작월부터 종료월까지 경과한 프로젝트 개월 수를 반환합니다.
 * 같은 월에 시작하고 종료한 프로젝트도 최소 1개월로 계산합니다.
 *
 * @param startYear 시작 연도입니다.
 * @param startMonth 시작 월입니다.
 * @param endYear 종료 연도입니다.
 * @param endMonth 종료 월입니다.
 * @returns 프로젝트 개월 수입니다.
 */
function getProjectMonthLength(startYear: number, startMonth: number, endYear: number, endMonth: number) {
  return Math.max(getMonthDifference(startYear, startMonth, endYear, endMonth), 1);
}

/**
 * 두 연월 사이의 월 차이를 반환합니다.
 *
 * @param startYear 시작 연도입니다.
 * @param startMonth 시작 월입니다.
 * @param endYear 종료 연도입니다.
 * @param endMonth 종료 월입니다.
 * @returns 월 차이입니다.
 */
function getMonthDifference(startYear: number, startMonth: number, endYear: number, endMonth: number) {
  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

/**
 * 이력서의 기본 정보를 반환합니다.
 *
 * @param data {@link ContentData}
 * @returns 기본 정보
 */
function getInfo(data?: ContentData) {
  return {
    name: data?.name ?? "이력서",
    memo: data?.memo,
    copyrights: data?.copyright ?? `Copyright ${new Date().getFullYear()}. All Right Reserved.`,
  };
}

/**
 * 이력서 스타일 설정을 반환합니다.
 *
 * @param style {@link ContentStyle}
 * @returns 스타일 설정
 */
function getStyle(style?: ContentStyle) {
  return {
    backgrounds: style?.backgrounds ?? ["#77E4C8", "#36C2CE", "#478CCF", "#4535C1"],
  };
}

/**
 * 최근 직책 및 직무 정보를 반환합니다.
 *
 * @param companies {@link ContentCompany}
 * @returns 최근 직책 및 직무 정보
 */
function getJob(companies: ContentCompany[]) {
  // 직무 정보 불러옴
  const recentCompany = companies[0];
  const firstCompany = companies[companies.length - 1];
  const recentJob = recentCompany.jobs[0];
  const firstJob = firstCompany.jobs[firstCompany.jobs.length - 1];

  // 데이터 확인
  if (!(recentJob.still || (recentJob.endYear && recentJob.endMonth)))
    throw new Error("최근 직장 정보가 올바르지 않습니다. 업무 종료 년월 혹은 현직 여부를 확인해주세요.");

  // 회사 정보 생성
  const company = recentCompany.company;
  const handle = recentCompany.handle ?? recentCompany.company;
  const link = recentCompany.link ?? "";

  // 최근 직무 생성
  const roles = recentJob.roles;

  // 근무 기간 생성
  const period = recentJob.still
    ? `${firstJob.startYear}년 ${firstJob.startMonth}월 ~`
    : `${firstJob.startYear}년 ${firstJob.startMonth}월 ~ ${recentJob.endYear}년 ${recentJob.endMonth}월`;

  // 근무 경력 생성
  // 일정이 겹치는 경력은 고려하지 않습니다.
  const duration = formatMonthLength(
    companies.reduce((prevCompDuration, currComp) => {
      return (
        prevCompDuration +
        currComp.jobs.reduce((prevJobDuration, currJob) => {
          // 현직인 경우, 오늘까지의 기간으로 계산
          if (currJob.still) {
            const today = new Date();
            return prevJobDuration + getJobMonthLength(currJob.startYear, currJob.startMonth, today.getFullYear(), today.getMonth() + 1);
          }

          // 데이터 확인
          if (!(currJob.endYear && currJob.endMonth))
            throw new Error(`직장 정보가 올바르지 않습니다. 업무 종료 년월 혹은 현직 여부를 확인해주세요. ${currJob}`);

          // 현직이 아닌 경우, 종료일까지의 기간으로 계산
          return prevJobDuration + getJobMonthLength(currJob.startYear, currJob.startMonth, currJob.endYear, currJob.endMonth);
        }, 0)
      );
    }, 0),
  );

  return {
    company,
    handle,
    link,
    roles,
    period,
    duration,
  };
}

/**
 * 연락처 목록을 반환합니다.
 * 타입에 따라 연락처를 구분하여 반환합니다.
 *
 * @param contacts {@link ContentContact}[][]
 * @returns 연락처 목록
 */
function getContacts(contacts: ContentContact[][]) {
  return contacts.map((contactGroup) => {
    return contactGroup.map((contact) => {
      switch (contact.type) {
        case "phone":
          return {
            ...contact,
            icon: "phone.fill",
            link: `tel:${contact.value}`,
          } as const;

        case "email":
          return {
            ...contact,
            icon: "envelope.fill",
            link: `mailto:${contact.value}`,
          } as const;

        case "web":
          return {
            ...contact,
            icon: "globe",
            link: `https://${contact.value}`,
          } as const;

        case "github":
          return {
            ...contact,
            icon: "github",
            link: `https://github.com/${contact.value}`,
          } as const;
      }
    });
  });
}

/**
 * 테크 스택 목록을 반환합니다.
 * 별도의 처리는 수행하지 않으나, 추후 구조를 맞출 것을 감안하여 함수로 분리합니다.
 *
 * @param techStacks - 테크 스택 목록
 * @returns 테크 스택 목록
 */
function getTechStacks(techStacks: string[]) {
  return techStacks;
}

/**
 * 반환할 회사 목록을 정의합니다.
 * reduce 함수가 중첩되어 있어, 타입을 강제합니다.
 */
interface PolyFillJob {
  company: string | undefined;
  roles: string[];
  period: string;
  duration: string;
  link: string | undefined;
}

/**
 * 회사 목록을 반환합니다.
 *
 * @param companies {@link ContentCompany}[]
 * @returns 회사 목록
 */
function getCompanies(companies: ContentCompany[]) {
  return companies.reduce((prev: PolyFillJob[], curr) => {
    return [
      ...prev,
      ...curr.jobs.reduce((prevJob: PolyFillJob[], currJob, i) => {
        const today = new Date();
        const duration = currJob.still
          ? getJobMonthLength(currJob.startYear, currJob.startMonth, today.getFullYear(), today.getMonth() + 1)
          : getJobMonthLength(currJob.startYear, currJob.startMonth, currJob.endYear!, currJob.endMonth!);

        return [
          ...prevJob,
          {
            company: i === 0 ? curr.company : undefined,
            roles: currJob.roles,
            period: currJob.still
              ? `${currJob.startYear}년 ${currJob.startMonth}월 ~`
              : `${currJob.startYear}년 ${currJob.startMonth}월 ~ ${currJob.endYear}년 ${currJob.endMonth}월`,
            duration: formatMonthLength(duration),
            link: curr.link,
          },
        ];
      }, []),
    ];
  }, []);
}

/**
 * 학력 목록을 반환합니다.
 * 학교, 전공, 기간을 반환합니다.
 *
 * @param schools {@link ContentSchool}[]
 * @returns 학력 목록
 */
function getSchools(schools: ContentSchool[]) {
  return schools.map((school) => {
    return {
      school: school.school,
      major: school.major,
      period: school.still
        ? `${school.startYear}년 ~`
        : school.endYear
          ? `${school.startYear}년 ~ ${school.endYear}년`
          : `${school.startYear}년`,
    };
  });
}

/**
 * 수상 내역 목록을 반환합니다.
 *
 * @param awards {@link ContentAward}[]
 * @returns 수상 내역 목록
 */
function getAwards(awards: ContentAward[]) {
  return awards.map((award) => {
    return {
      award: award.award,
      prize: award.prize,
      organization: award.organization,
      issueDate: `${award.issueYear}년 ${award.issueMonth}월`,
      link: award.link,
      pin: award.pin,
    };
  });
}

/**
 * 자격증 목록을 반환합니다.
 *
 * @param licenses {@link ContentLicense}[]
 * @returns 자격증 목록
 */
function getLicenses(licenses: ContentLicense[]) {
  return licenses.map((license) => {
    return {
      license: license.license,
      organization: license.organization,
      issueDate: `${license.issueYear}년 ${license.issueMonth}월`,
      pin: license.pin,
    };
  });
}

/**
 * 프로젝트 목록을 반환합니다.
 *
 * @param projects {@link ContentProject}[]
 * @returns 프로젝트 목록
 */
function getProjects(projects: ContentProject[]) {
  return projects.map((project) => {
    const companyInfo = contentData.companies.find((company) => company.company === project.organization);
    const orgName = companyInfo?.handle ?? companyInfo?.company ?? project.organization;
    const today = new Date();
    const duration = project.still
      ? getProjectMonthLength(project.startYear, project.startMonth, today.getFullYear(), today.getMonth() + 1)
      : project.endYear && project.endMonth
        ? getProjectMonthLength(project.startYear, project.startMonth, project.endYear, project.endMonth)
        : undefined;
    const durationText = getProjectDurationText(project, duration);

    return {
      title: project.project,
      rootProject: project.rootProject,
      role: project.roles?.join(" & "),
      link: project.link,
      priority: project.priority,
      organization: orgName
        ? {
            name: orgName,
            link: companyInfo?.link,
          }
        : undefined,
      techStacks: project.techStacks,
      summary: project.content?.summary,
      details: project.content?.details,
      period: getProjectPeriod(project),
      duration: durationText,
      thumbnail: project.thumbnail,
    };
  });
}

/**
 * 프로젝트 시작월과 종료월이 같은지 확인합니다.
 *
 * @param project {@link ContentProject}
 * @returns 시작월과 종료월이 같은지 여부
 */
function isSameProjectMonth(project: ContentProject): boolean {
  return project.startYear === project.endYear && project.startMonth === project.endMonth;
}

/**
 * 프로젝트 기간 텍스트를 반환합니다.
 *
 * @param project {@link ContentProject}
 * @returns 프로젝트 기간 텍스트
 */
function getProjectPeriod(project: ContentProject): string {
  if (project.still) return `${project.startYear}년 ${project.startMonth}월 ~`;

  if (project.endYear && project.endMonth && !isSameProjectMonth(project)) {
    return `${project.startYear}년 ${project.startMonth}월 ~ ${project.endYear}년 ${project.endMonth}월`;
  }

  return `${project.startYear}년 ${project.startMonth}월`;
}

/**
 * 프로젝트 진행 기간 텍스트를 반환합니다.
 * 단일 월 또는 1개월 이하의 프로젝트에 주 단위 기간이 있으면 주 단위로 표시합니다.
 *
 * @param project {@link ContentProject}
 * @param monthLength 월 단위 프로젝트 기간입니다.
 * @returns 프로젝트 진행 기간 텍스트
 */
function getProjectDurationText(project: ContentProject, monthLength?: number): string | undefined {
  if (project.weeks && (monthLength === undefined || monthLength <= 1)) return `${project.weeks}주`;

  if (monthLength === undefined) return undefined;

  return formatMonthLength(monthLength);
}
