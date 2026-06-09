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

## 저장소 역할

이 저장소는 `resume.taeyoon.xyz`로 사용되는 개인 이력서/포트폴리오 웹사이트입니다.

- Next.js App Router 기반의 React 애플리케이션입니다.
- 패키지 매니저는 Corepack이 관리하는 Yarn Berry입니다.
- StyleX와 Babel 설정을 사용하므로 Next 빌드에서 SWC 관련 경고가 나올 수 있습니다.
- 주요 이력서 콘텐츠의 source of truth는 `src/contents/`입니다.

## 작업 시작 체크

작업을 시작할 때 먼저 아래를 확인합니다.

- `git status --short`
- 변경 대상 파일의 기존 문체, export 방식, 디렉터리 구조
- `package.json`의 scripts와 현재 Yarn 버전
- 기존 `AGENTS.md`, `CLAUDE.md` 존재 여부와 `CLAUDE.md` 링크 대상
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

## 명령어

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
- 커밋 메시지는 아래 Prefix를 사용하고, 본문은 한국어로 작성합니다.
  - 기능 추가: `Feat: ...`
  - 문서 갱신: `Docs: ...`
  - 이름/구조 정리: `Refactor: ...`
  - 버그 수정: `Fix: ...`
  - 설정 변경: `Chore: ...`
  - 테스트 추가/수정: `Test: ...`

## 배포와 운영 반영

- 이 저장소의 실제 배포 절차는 현재 문서에서 확인되지 않았습니다.
- 배포, 도메인, Vercel 프로젝트, 운영 캐시 초기화 같은 작업은 사용자가 명시적으로 요청하고 필요한 권한과 절차가 확인된 경우에만 수행합니다.
- 운영 반영을 했다고 보고하려면 실제 실행한 명령, 대상, 결과를 함께 적습니다.

## 보안

- secret, token, credential, 개인 인증 정보는 코드와 문서에 기록하지 않습니다.
- 공개 가능한 프로필 콘텐츠와 비공개 메모를 구분합니다.
- 외부 서비스 설정을 변경해야 할 때는 변경 전 사용자에게 영향 범위를 설명합니다.
