/**
 * Copyright 2024 Taeyoon Lee. All Right Reserved.
 *
 * This source code is licensed under the file found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  img_activity_thumbnail_design_off,
  img_activity_thumbnail_medium_semantic,
  img_activity_thumbnail_whatssub_blog_interview,
  img_project_thumbnail_bang,
  img_project_thumbnail_whatssub,
  img_project_thumbnail_whatssub_blog,
  img_project_thumbnail_whatssub_design_system,
  img_project_thumbnail_whatssub_figma_plugin,
  img_project_thumbnail_whatssub_global,
  img_side_project_thumbnail_cc,
  img_side_project_thumbnail_echoscript,
} from "@/assets";

import type { ContentData } from "./contents.type";

/**
 * ### 컨텐츠 원본
 *
 * 컴포넌트에 사용되는 원본 텍스트, 이미지 등의 컨텐츠를 정의합니다.
 */
export const contentData: ContentData = {
  name: "이태윤",
  memo: "산업기능요원 진행 중",
  copyright: "Copyright 2024 Taeyoon Lee. All Right Reserved.",
  contacts: [
    [
      { type: "phone", value: "010-1234-5678" },
      { type: "email", value: "taeyoon0137@gmail.com" },
    ],
    [
      { type: "web", value: "taeyoon.xyz" },
      { type: "github", value: "taeyoon0137" },
    ],
  ],
  techStacks: [
    ["Figma", "Lottie", "Protopie", "After Effect", "Photoshop", "Illustrator", "Sketch", "Framer"],
    ["Typescript", "React Native", "React", "GCP", "Next.js", "Vite", "ESBuild", "Supabase"],
    ["MyData", "Openbank", "Plaid", "Amplitude", "Hackle"],
  ],
  companies: [
    {
      company: "주식회사 왓섭",
      handle: "whatssub",
      link: "https://whatssub.co",
      jobs: [
        {
          roles: ["Lead Product Designer", "FE Engineer(RN)"],
          startYear: 2020,
          startMonth: 3,
          endYear: 2024,
          endMonth: 9,
        },
        {
          roles: ["Product Designer (계약)"],
          startYear: 2019,
          startMonth: 6,
          endYear: 2020,
          endMonth: 2,
        },
      ],
    },
  ],
  schools: [
    {
      school: "서울디자인고등학교",
      major: "시각디자인과",
      startYear: 2017,
      endYear: 2020,
    },
    {
      school: "용산고등학교",
      major: "과학중점반",
      startYear: 2017,
    },
  ],
  awards: [
    {
      award: "제 2회 핀테크 아이디어 공모전",
      prize: "금융위원장상, 대상",
      organization: "금융위원회",
      issueYear: 2019,
      issueMonth: 10,
      link: "https://www.etnews.com/20191013000089",
      pin: true,
    },
    {
      award: "OPL × SEI Web3 Hackathon",
      prize: "입상 (해외)",
      organization: "onepiece labs",
      issueYear: 2023,
      issueMonth: 9,
      link: "https://devfolio.co/projects/bang-ea5c",
      pin: true,
    },
    {
      award: "Protopiethon",
      prize: "입상",
      organization: "스튜디오 XID (프로토파이)",
      issueYear: 2019,
      issueMonth: 7,
      link: "https://www.facebook.com/sharedesignspectrum/photos/a.204620676609804/541263699612165/?type=3",
      pin: true,
    },
  ],
  licenses: [
    {
      license: "정보처리기능사",
      organization: "한국산업인력공단",
      issueYear: 2023,
      issueMonth: 9,
      pin: true,
    },
    {
      license: "컴퓨터그래픽스운용기능사",
      organization: "한국산업인력공단",
      issueYear: 2019,
      issueMonth: 7,
      pin: true,
    },
    {
      license: "자동차운전면허 (1종 보통)",
      organization: "서울특별시경찰청",
      issueYear: 2021,
      issueMonth: 8,
      pin: true,
    },
  ],
  projects: [
    {
      project: "왓섭 – 돈을 관리하는 새로운 방법",
      roles: ["Product Designer"],
      thumbnail: img_project_thumbnail_whatssub,
      link: "https://whatssub.co",
      organization: "주식회사 왓섭",
      techStacks: [
        "Figma",
        "Amplitude",
        "MyData",
        "Openbank",
        "Lottie",
        "After Effect",
        "Photoshop",
        "Illustrator",
        "Sketch",
      ],
      content: {
        summary: [
          "회사 설립 시점부터 서비스 기획 및 디자인",
          "Hi-Fi 프로토타입을 통한 제휴 및 투자 미팅 지원",
          "Seed, Pre-A 투자 유치",
          "스크래핑, 오픈뱅킹, 마이데이터와 같은 금융 데이터 활용",
          "회원가입률 90%대, 연동률 60%대, 자연 유입 80%대의 높은 성과",
          "Lottie를 통한 애니메이션 제공",
          "Flow 구조 고안을 통한 플랫폼 최적화 된 구조 구축",
          "Amplitude를 통한 성과 추적",
        ],
      },
      still: true,
      startYear: 2019,
      startMonth: 7,
    },
    {
      project: "Whatssub Design System",
      roles: ["Product Designer", "FE Engineer"],
      thumbnail: img_project_thumbnail_whatssub_design_system,
      organization: "주식회사 왓섭",
      techStacks: ["Figma", "Lottie", "After Effect", "Typescript", "React", "React-Native"],
      content: {
        summary: [
          "설계부터 개발까지 단독 진행",
          "피그마부터 타입스크립트 기반의 React, React-Native, Next.js 환경에서 이용 가능한 Lerna 모노레포 기반 라이브러리 구축",
          "React Native Reanimated 기반의 UI 스레드 애니메이션 최적화",
          "Recoil 기반의 전역 상태 제어 및 React Navigation과의 상호작용",
          "Lottie의 구조를 변형하여 자체 *.lottie.json 포멧 제작 및 리소스 오버라이드 추가",
        ],
      },
      still: true,
      startYear: 2021,
      startMonth: 2,
    },
    {
      project: "Whatssub Global",
      roles: ["Product Designer"],
      thumbnail: img_project_thumbnail_whatssub_global,
      link: "https://whatssub.co",
      organization: "주식회사 왓섭",
      techStacks: ["Figma", "Lottie", "Amplitude"],
      content: {
        summary: [
          "해외 서비스 제공을 위한 서비스 기획 및 디자인 재설계",
          "Plaid를 통한 해외 20,000개 금융사 금융 데이터 활용",
          "자체 구독 서비스 제공을 통한 매출 확보 개시",
          "Hackle을 통한 A/B 테스트 진행",
          "Amplitude를 통한 성과 추적 자동화",
        ],
      },
      startYear: 2023,
      startMonth: 1,
      endYear: 2024,
      endMonth: 6,
    },
    {
      project: "bang! – 해커톤 참여",
      roles: ["Product Designer", "FE Engineer"],
      thumbnail: img_project_thumbnail_bang,
      link: "https://devfolio.co/projects/bang-ea5c",
      organization: "주식회사 왓섭",
      techStacks: ["Figma", "Typescript", "React-Native"],
      content: {
        summary: [
          "블록체인을 활용한 결제 내역 기반의 리뷰 SNS 플랫폼 기획 및 디자인",
          "React Native Reanimated 기반의 UI 스레드 애니메이션 최적화",
          "OPL × SEI Web3 Hackathon 입상 (해외)",
        ],
      },
      startYear: 2023,
      startMonth: 9,
      duration: 2,
    },
    {
      project: "Whatssub Figma Plugin",
      roles: ["FE Engineer"],
      thumbnail: img_project_thumbnail_whatssub_figma_plugin,
      organization: "주식회사 왓섭",
      techStacks: ["Figma", "Typescript", "Vite", "ESBuild", "React", "Amplitude"],
      content: {
        summary: [
          "피그마 내에서 정기적인 유지보수 작업을 자동화 하기 위한 자체 플러그인 개발",
          "UI 환경은 Vite를 기반으로 하였으며, Plugin 환경은 ESBuild를 통해 번들링",
          "화면 별 고유 ID 할당을 통한 성과 추적 자동화 및 안정성 부여",
        ],
      },
      still: true,
      startYear: 2024,
      startMonth: 1,
    },
    {
      project: "Whatssub Blog – 마크다운 파서 개발",
      roles: ["FE Engineer"],
      thumbnail: img_project_thumbnail_whatssub_blog,
      link: "https://blog.whatssub.co",
      organization: "주식회사 왓섭",
      techStacks: ["Typescript", "Next.js", "React"],
      content: {
        summary: [
          "신입 디자이너의 블로그 및 운영 기획, 디자인 과정 보조",
          "콘텐츠를 위한 사진 촬영 보조",
          "자체 상품 링크 등의 기능 지원을 위한 Markdown Parser 개발",
          "AST 라이브러리를 포크하여 신규 문법 지원 구문 추가 및 렌더 요소 디자인 및 개발",
        ],
      },
      startYear: 2022,
      startMonth: 10,
    },
  ],
  sideProjects: [
    {
      project: "College Calendar",
      roles: ["Product Designer", "Full-Stack Engineer"],
      thumbnail: img_side_project_thumbnail_cc,
      techStacks: [
        "Figma",
        "Lottie",
        "After Effect",
        "Typescript",
        "React-Native",
        "Supabase",
        "GCP",
        "Sentry",
        "Firebase",
        "Amplitude",
      ],
      content: {
        summary: [
          "서울과학기술대학교 출석 수업 확인을 위한 일정 관리 애플리케이션",
          "기획부터 디자인, 애플리케이션 개발 및 서버, 데이터베이스 구축 및 운용까지 진행",
          "서버리스 및 RDB 기반 서버, 데이터베이스 구축 및 함수 설계 최적화",
          "Google Cloud Platform, Supabase를 통한 이메일 기반 자체 인증 과정 구축",
          "Amplitude를 통한 성과 추적 및 Sentry를 통한 오류 로깅",
        ],
      },
      member: 2,
      startYear: 2024,
      startMonth: 7,
      endYear: 2024,
      endMonth: 8,
    },
    {
      project: "Echoscript",
      roles: ["FE Engineer"],
      thumbnail: img_side_project_thumbnail_echoscript,
      link: "https://github.com/taeyoon0137/echoscript",
      techStacks: ["Typescript", "Yarn", "Node", "Vite"],
      content: {
        summary: [
          "Yarn Script 실행 시 실행 스크립트 및 Depth를 로깅하는 Yarn 플러그인",
          "Yarn과 Node의 동작 원리에 대한 이해",
          "오픈소스로 배포 및 각종 개인 프로젝트에서 활용",
        ],
      },
      startYear: 2023,
      startMonth: 9,
      duration: 2 * 7,
    },
  ],
  activities: [
    {
      project: "살아 움직이는 디자인 시스템, WDS – DESIGN OFF",
      link: "https://brunch.co.kr/@ultra0034/152",
      thumbnail: img_activity_thumbnail_design_off,
      content: {
        summary: ["WDS에 대해 컨퍼런스 발표", "디자인 시스템의 초기 구축과 운용에 대해서 다룸"],
      },
      startYear: 2023,
      startMonth: 5,
    },
    {
      project: "프라이드가 퀄리티를 만든다 – 왓섭 인터뷰",
      link: "https://blog.whatssub.co/post/interview-ty",
      thumbnail: img_activity_thumbnail_whatssub_blog_interview,
      content: {
        summary: ["왓섭 블로그 게시 및 채용 홍보를 위해 내부 인터뷰 진행", "디자인 팀장으로서 인터뷰를 진행함"],
      },
      startYear: 2022,
      startMonth: 7,
    },
    {
      project: "스케치, Semantic Color 적용기 – Medium",
      link: "https://taeyoon0137.medium.com/%EC%8A%A4%EC%BC%80%EC%B9%98-sementic-color-%EC%A0%81%EC%9A%A9%EA%B8%B0-9bc96776ff74",
      thumbnail: img_activity_thumbnail_medium_semantic,
      content: {
        summary: [
          "스케치 Color Variable 도입 후, 이를 기반한 Semantic Color 설계에 대해 다룸",
          "Surfit 추천 게시글 선정",
        ],
      },
      startYear: 2020,
      startMonth: 10,
    },
  ],
};
