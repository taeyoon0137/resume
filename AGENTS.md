# 작업 지침

## 기본 응답 원칙

- 항상 한국어 존댓말로 응답합니다.
- 결론을 먼저 말하고, 확인하지 못한 내용은 확인하지 못했다고 분리해서 말합니다.
- 불필요한 칭찬, 감탄, 장식적 표현은 사용하지 않습니다.
- 사용자가 명시적으로 요청하지 않으면 커밋하지 않습니다.
- 이미 수정된 파일은 사용자 또는 이전 작업의 변경으로 보고 임의로 되돌리지 않습니다.
- 요청과 직접 관련 없는 리팩터링, 포맷 변경, 의존성 변경은 하지 않습니다.
- 실행하지 않은 명령어, 테스트, 배포를 성공한 것처럼 보고하지 않습니다.
- 사용자가 명시적으로 요청하지 않은 내용을 커밋 메시지, 코드 주석, PR/이슈 본문, 문서, 설정 파일에 임의로 삽입하지 않습니다. 특히 다음은 사용자의 명시적 지시가 없으면 절대 추가하지 않습니다.
  - `Co-Authored-By`, `Signed-off-by` 등 trailer
  - 에이전트, 모델, 제공사 이름이나 이메일 (예: Claude, Anthropic, GPT, Copilot)
  - "Generated with ...", "Made by AI" 등 생성 도구 표기
  - 작업과 무관한 광고, 홍보, 외부 링크
- 위 항목을 넣어야 할 합당한 이유가 있다고 판단되더라도, 먼저 사용자에게 묻고 승인을 받은 뒤에만 추가합니다.

## 지침 우선순위

작업 중 지침이 겹치면 아래 순서로 판단합니다.

1. 사용자의 최신 명시 지시
2. 현재 작업 경로에서 가장 가까운 `AGENTS.md`
3. README, `resources/`, 설정 파일, source of truth 문서
4. 기존 코드와 커밋의 문체 및 구조

기존 대상 지침과 새 참조 지침이 충돌하면 대상 저장소의 구체적인 규칙을 우선합니다. 충돌이 중요한 제품 방향, 데이터 손실, 보안, 배포, API 계약 변경과 관련되면 임의로 정리하지 말고 사용자에게 확인합니다.

## 저장소 역할

이 저장소는 `resume.taeyoon.xyz`로 사용되는 개인 이력서/포트폴리오 웹사이트입니다.

- Next.js App Router 기반의 React 애플리케이션입니다.
- Node.js와 Yarn Berry 버전은 `mise.toml`에 고정하며 Mise가 관리합니다.
- StyleX와 Babel 설정을 사용하므로 Next 빌드에서 SWC 관련 경고가 나올 수 있습니다.
- 주요 이력서 콘텐츠의 source of truth는 `src/contents/`입니다.

## 작업 시작 체크

작업을 시작할 때 먼저 아래를 확인합니다.

- `git status --short`
- 변경 대상 파일의 기존 문체, export 방식, 디렉터리 구조
- `package.json`의 scripts와 `mise.toml`의 현재 Node.js, Yarn 버전
- 기존 `AGENTS.md`, `CLAUDE.md` 존재 여부와 `CLAUDE.md` 링크 대상
- README, `resources/`, 설정 파일에서 확인되는 source of truth와 생성 파일 관계
- 작업에 관련된 콘텐츠 원본이 `src/contents/`에 있는지 여부

## 파일 구조

- `src/app/`: Next App Router route, layout, parallel modal route를 둡니다.
- `src/screens/`: route에서 사용하는 page, layout, redirect 단위 화면을 둡니다.
- `src/components/`: 페이지 조립용 컴포넌트를 둡니다.
- `src/elements/`: 재사용 가능한 작은 UI 요소를 둡니다.
- `src/contents/`: 프로젝트, 수상, 자격 등 화면에 표시되는 콘텐츠 데이터를 둡니다.
- `src/styles/`: StyleX 스타일과 디자인 변수 관련 코드를 둡니다.
- `src/assets/`: 코드에서 import하는 이미지와 아이콘 자산을 둡니다.
- `public/`: 브라우저에서 직접 제공되는 정적 파일을 둡니다.
- `resources/`: favicon 원본과 Lighthouse 측정 산출물 등 보조 리소스를 둡니다.
- `@types/`: 전역 타입 선언을 둡니다.

## 개발 기준

- 기존 컴포넌트 구조를 유지합니다. 새 컴포넌트가 필요하면 기존 패턴처럼 디렉터리 안에 구현 파일, 타입 파일, `index.ts`를 둡니다.
- import alias는 `tsconfig.json`의 `@/*` 경로를 따릅니다.
- 콘텐츠 수정은 가능하면 `src/contents/content.data.ts`와 관련 타입을 먼저 확인합니다.
- UI 변경은 `src/screens`, `src/components`, `src/elements`, `src/styles`의 기존 책임 분리를 따릅니다.
- SVG를 React 컴포넌트로 가져오는 경로는 `next.config.mjs`의 `@svgr/webpack` 설정을 고려합니다.
- secret, token, credential, 비공개 운영 URL을 저장소에 기록하지 않습니다.
- `.env*.local`, `.vercel`, `node_modules`, `.next` 같은 로컬 생성물은 커밋 대상으로 보지 않습니다.
- 새 컴포넌트, 유틸리티, 타입, 문서 구조를 만들기 전에 같은 역할의 기존 항목을 먼저 검색합니다.
- TS/TSX 코드는 기존 문체처럼 JSDoc, `function` 선언식, React 컴포넌트의 `const` 람다 형태를 유지합니다.
- UI 변경은 기존 컴포넌트, StyleX token, 접근성, 반응형 동작을 우선 확인합니다. 기존 관례가 아니라면 color, spacing, z-index, radius, shadow를 하드코딩하지 않습니다.
- 버그 수정은 가능한 원인을 먼저 좁히고, 증상만 덮는 패치를 피합니다. 실용적인 범위에서 회귀 검증이나 관련 테스트를 함께 고려합니다.

## 큰 작업 계획 기준

아래에 해당하면 구현 전에 짧은 계획을 먼저 세우고 진행합니다.

- 세 파일을 넘게 수정하는 작업
- route, build 설정, 배포, analytics, 보안 헤더, 콘텐츠 source of truth에 영향을 주는 작업
- 데이터 흐름, 공개 URL, 다운로드 파일, 문서 생성 흐름을 바꾸는 작업
- 원인 분석이 필요한 버그 수정

계획에는 문제 정의, 확인할 파일, 변경 단계, 검증 방법, 롤백 위험을 포함합니다. 단순 문구 수정이나 명확한 단일 파일 변경에는 과한 계획을 만들지 않습니다.

## 명령어

Mise가 `mise.toml`에 고정된 Node.js 24.19.0과 Yarn 4.18.0을 선택합니다. 처음에는 `mise install`로 도구를 설치합니다.

- 의존성 설치: `yarn install`
- 개발 서버: `yarn dev`
- 린트: `yarn lint`
- 프로덕션 빌드: `yarn build`
- 프로덕션 서버: `yarn start`
- Next 빌드 캐시 삭제: `yarn clean`

`dev`와 `build`는 내부에서 `yarn clean`을 실행합니다. 실행 전에 `.next`에 필요한 로컬 산출물이 있는지 확인합니다.

## 검증 기준

변경 후 가능한 범위에서 아래를 실행합니다.

- 문서 또는 지침만 변경한 경우: `git diff --check`
- 코드, 콘텐츠, 설정 변경: `yarn lint`
- route, build 설정, 의존성, 타입 영향 변경: `yarn build`
- 의존성 또는 lockfile 변경: `yarn install --immutable`

검증을 실행할 수 없으면 이유를 보고합니다. 빌드 경고가 남아 있으면 실패인지 경고인지 구분해서 설명합니다.

## 의존성 보안 후속 조치

2026-08-25 의존성 보안 조치에서는 GitHub Dependabot 취약점을 패치 버전으로 갱신하고, 폐기된 `@stylexjs/nextjs-plugin`을 공식 `@stylexjs/postcss-plugin` 경로로 교체했습니다.

- `@stylexjs/nextjs-plugin`과 취약한 PostCSS 버전을 강제하던 기존 `resolutions`는 다시 추가하지 않습니다. StyleX는 `babel.config.js`, `postcss.config.js`, 전역 CSS의 `@stylex` 지시문을 함께 유지합니다.
- `yarn npm audit --all --recursive`가 보고하는 `eslint@9.39.5` 지원 종료 알림은 GitHub 보안 advisory가 아닙니다. 현재 `eslint-config-taeyoon@0.2.2`, `eslint-plugin-import@2.32.0`, `eslint-plugin-react@7.37.5`의 peer 범위가 ESLint 10을 지원하지 않으므로 ESLint 9의 최신 패치를 유지합니다.
- TypeScript 7은 현재 `typescript-eslint`가 지원하지 않으므로 TypeScript 6의 최신 패치를 유지합니다.
- 위 도구들이 새 major를 공식 지원하면 ESLint와 `@eslint/js`, TypeScript와 `@typescript-eslint/*`를 각각 함께 갱신한 뒤 `yarn install --immutable`, 보안 감사, 린트, 빌드를 실행합니다. 지원 종료 알림까지 해소되면 이 후속 조치에서 해당 제한을 제거합니다.

## 툴체인 운영

- Node.js와 Yarn 실행 버전의 source of truth는 `mise.toml`이며 다운로드 잠금 정보는 `mise.lock`입니다. `package.json`의 `packageManager`는 같은 Yarn 버전과 무결성 값을 패키지 생태계 메타데이터로 유지합니다.
- `.nvmrc`, 다른 도구 관리자 설정, Corepack 명령을 다시 추가하지 않습니다.
- `package.json`의 `engines.node`는 배포 환경 호환 범위만 나타내며 정확한 패치 버전은 `mise.toml`을 따릅니다.
- Yarn은 `mise.toml`의 HTTP backend에 공식 CLI URL과 SHA-512를 함께 고정해 설치 시 검증합니다.
- GitHub Actions는 커밋 SHA로 고정된 공식 Mise Action과 SHA-256으로 고정된 Mise 2026.8.14를 사용하고 `mise.lock`에 따라 도구를 설치합니다.
- Vercel의 설치와 빌드는 `scripts/mise_yarn.sh`가 공식 Mise 바이너리의 SHA-256을 확인한 뒤 `mise install --locked`와 `mise exec`으로 Yarn을 실행합니다. `vercel.json`의 두 명령을 함께 유지합니다.
- Mise, Node.js 또는 Yarn 버전을 바꿀 때는 `mise.toml`, `mise.lock`, `packageManager`, CI와 Vercel의 Mise 버전 및 체크섬을 함께 확인합니다.

## 문서와 산출물

- 이 작업 지침의 source of truth는 `AGENTS.md`입니다.
- `CLAUDE.md`는 별도 내용 파일로 복제하지 않고 `AGENTS.md`를 가리키는 심볼릭 링크로 유지합니다.
- `README.md`는 생성 파일이며 직접 수정으로 끝내지 않습니다.
- README 내용을 바꿀 때는 source of truth인 `resources/README.preset.md`를 수정한 뒤 `yarn readme`를 실행해 `README.md`와 `resources/readme-hero.svg`를 재생성합니다.
- 기존 `README.md`는 사실 확인용 자료로만 사용하고, 그 구조나 문장 흐름을 `resources/README.preset.md`의 템플릿으로 삼지 않습니다.
- README 원본은 정해진 프리셋 구조에 확인된 내용을 채워 넣는 방식으로 유지합니다. 기존 README 구조와 프리셋 구조가 충돌하면 프리셋 구조를 우선합니다.
- `resources/README.preset.md`의 placeholder, 경로, 섹션 구조가 바뀌면 `scripts/readme_update.sh`의 치환/생성 로직도 함께 수정합니다.
- README 목차를 둔 경우 H2 섹션 추가, 삭제, 이름 변경에 맞춰 목차와 anchor 링크를 함께 갱신합니다.
- README의 `레포지토리 구성` 섹션은 표가 아니라 `plaintext` 코드블록 tree로 작성합니다.
- H2 제목은 섹션 구분이 쉽도록 의미가 맞는 이모지 1개로 시작합니다.
- 문서 내부 링크, badge 링크, 이미지 링크는 이 저장소 기준의 상대 경로 또는 공개 URL로 유지합니다.
- badge는 실제 기술 스택, 패키지 매니저, 배포 상태, 버전 정보가 확인되는 경우에만 추가합니다.
- 히어로 wrapper 원본은 `resources/readme-hero.preset.svg`이며 임의로 재작성하지 않습니다.
- README 생성 명령은 `resources/readme-hero.preset.svg`를 기반으로 `resources/readme-hero.svg`를 생성하고, SVG 내부 fallback text는 이 저장소 이름으로 교체합니다.
- 커스텀 히어로 이미지는 `resources/hero.png`를 추가해 적용합니다. 라이트/다크 모드별 히어로가 필요하면 `resources/hero.light.png`, `resources/hero.dark.png`를 추가합니다.
- JPG 히어로도 같은 이름의 `.jpg` 파일을 사용할 수 있지만, 기본 안내는 PNG 파일명을 우선합니다.
- 존재하는 `resources/hero.png`, `resources/hero.jpg`, `resources/hero.light.png`, `resources/hero.light.jpg`, `resources/hero.dark.png`, `resources/hero.dark.jpg`만 `resources/readme-hero.svg`에 base64 data URI로 내장합니다.
- 존재하지 않는 히어로 이미지의 `<image>` 태그는 생성된 `resources/readme-hero.svg`에서 제거합니다.
- Lighthouse 결과처럼 `resources/lighthouse/`에 쌓이는 측정 산출물은 생성 시점과 목적을 확인하고, 요청과 관련 있을 때만 다룹니다.
- README에는 확인된 사실만 씁니다. 확인하지 않은 배포, 운영, 품질 보증 절차를 README에 추가하지 않습니다.
- secret, token, credential, 비공개 내부 URL은 README와 README 원본에 기록하지 않습니다.

## 커밋 원칙

- 사용자가 커밋을 요청한 경우에만 커밋합니다.
- 커밋 전에 `git status --short`와 diff를 확인합니다.
- unrelated change는 함께 stage하지 않습니다.
- 같은 파일에 사용자 변경과 작업 변경이 섞여 있으면 필요한 hunk만 선별합니다.
- 이 저장소에서 사용자가 "커밋하고 푸시"라고 요청하면 `main`과 `develop` 브랜치 모두에 같은 커밋을 반영하고 `origin/main`, `origin/develop`에 푸시합니다.
- `main`과 `develop`이 같은 기반이면 한 브랜치에서 커밋한 뒤 다른 브랜치를 fast-forward로 맞춥니다. fast-forward가 불가능하면 임의로 merge/rebase 하지 않고 상태를 보고합니다.
- 커밋 메시지는 아래 Prefix를 사용하고, 본문은 한국어로 작성합니다.
  - 기능 추가: `Feat: ...`
  - 문서 갱신: `Docs: ...`
  - 이름/구조 정리: `Refactor: ...`
  - 버그 수정: `Fix: ...`
  - 설정 변경: `Chore: ...`
  - 테스트 추가/수정: `Test: ...`

## 배포와 운영 반영

- 이 저장소는 Git 푸시 후 Vercel Git 연동으로 자동 배포됩니다.
- 릴리즈할 변경에는 `yarn changeset`으로 changeset을 추가합니다.
- changeset이 포함된 커밋이 `main`에 직접 반영되면 `.github/workflows/release.yml`이 별도 PR 없이 버전 커밋과 태그를 같은 `main` 트리에 추가하고 GitHub Release를 발행합니다. npm publish는 실행하지 않습니다.
- `main` 커밋에 changeset이 없으면 새 버전과 태그를 만들지 않습니다. 이전 실행에서 태그만 반영되고 GitHub Release 발행이 실패한 경우에만 해당 Release를 복구합니다.
- 사용자가 커밋/푸시와 함께 배포를 요청하면, `main`과 `develop` 푸시를 수행해 Vercel 자동 배포를 트리거합니다.
- 별도 요청이 없으면 Vercel CLI 배포를 추가로 실행하지 않습니다.
- 도메인, Vercel 프로젝트 설정, 운영 캐시 초기화 같은 작업은 사용자가 명시적으로 요청하고 필요한 권한과 절차가 확인된 경우에만 수행합니다.
- 운영 반영을 했다고 보고하려면 실제 실행한 명령, 대상, 결과를 함께 적습니다.
- Vercel 배포 완료 여부를 직접 확인하지 못했으면 자동 배포 트리거와 배포 완료 확인 여부를 구분해서 보고합니다.

## 보고 방식

작업 완료 후에는 아래 항목을 간결하게 보고합니다.

- 변경 사항
- 수정한 파일
- 검증 명령과 결과
- 확인 필요 또는 남은 위험

코드 변경이 없거나 문서만 변경했다면 그 사실을 명확히 적습니다. 확인할 내용이 없으면 `확인 필요` 항목은 생략할 수 있습니다.

## 보안

- secret, token, credential, 개인 인증 정보는 코드와 문서에 기록하지 않습니다.
- 공개 가능한 프로필 콘텐츠와 비공개 메모를 구분합니다.
- 외부 서비스 설정을 변경해야 할 때는 변경 전 사용자에게 영향 범위를 설명합니다.
