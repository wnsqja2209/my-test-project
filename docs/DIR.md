# 프로젝트 디렉토리 구조

> 마지막 업데이트: 2026-01-14

---

## 📁 전체 구조

```
our-play-main/
├── .cursor/                        # Cursor AI 설정 및 규칙
│   └── rules/                      # 개발 컨벤션 및 가이드
│       ├── common/                 # 공통 규칙
│       │   ├── cursor-rules.mdc
│       │   ├── gemini-cli.mdc
│       │   ├── git-convention.mdc
│       │   ├── self-improve.mdc
│       │   ├── tdd.mdc
│       │   └── vibe-coding.mdc
│       └── web/                    # 웹 개발 규칙
│           ├── design-rules.mdc
│           ├── nextjs-convention.mdc
│           ├── playwright-test-guide.mdc
│           └── toss-frontend.mdc
│
├── .github/                        # GitHub 설정
│   └── ISSUE_TEMPLATE/            # 이슈 템플릿
│
├── app/                            # Next.js App Router
│   ├── api/                        # API Routes
│   │   └── og/                     # Open Graph 이미지 생성 API
│   │       ├── download/           # 이미지 다운로드 엔드포인트
│   │       │   └── route.tsx
│   │       └── result/             # 결과 OG 이미지 생성
│   │           └── route.tsx
│   ├── search/                     # 검색 페이지
│   │   └── page.tsx
│   ├── test/                       # 테스트 관련 페이지
│   │   └── [id]/                   # 동적 라우팅 (테스트 ID)
│   │       ├── loading.tsx         # 로딩 UI
│   │       ├── page.tsx            # 테스트 상세 페이지
│   │       ├── play/               # 테스트 진행 페이지
│   │       │   └── page.tsx
│   │       └── result/             # 결과 페이지
│   │           └── page.tsx
│   ├── favicon.ico                 # 파비콘
│   ├── globals.css                 # 전역 스타일 (Tailwind v4 설정)
│   ├── layout.tsx                  # Root Layout
│   ├── loading.tsx                 # 전역 로딩 UI
│   ├── manifest.ts                 # PWA Manifest
│   ├── not-found.tsx               # 404 페이지
│   ├── page.tsx                    # 홈 페이지
│   ├── robots.ts                   # robots.txt 생성
│   └── sitemap.ts                  # sitemap.xml 생성
│
├── components/                     # React 컴포넌트
│   ├── home/                       # 홈 화면 컴포넌트
│   │   ├── BannerSlider.tsx        # 배너 슬라이더
│   │   ├── SearchBar.tsx           # 검색 바
│   │   ├── TestCard.tsx            # 테스트 카드
│   │   └── TestSection.tsx         # 테스트 섹션 (테마별)
│   ├── layout/                     # 레이아웃 컴포넌트
│   │   ├── Header.tsx              # 헤더 (로고, 검색, 햄버거 메뉴)
│   │   └── MobileNav.tsx           # 모바일 네비게이션
│   ├── providers/                  # Context Providers
│   │   └── theme-provider.tsx      # 테마 Provider (다크/라이트 모드)
│   ├── shared/                     # 공유 컴포넌트
│   │   ├── AdSense.tsx             # Google AdSense 컴포넌트
│   │   ├── AdSenseModal.tsx        # AdSense 모달
│   │   ├── LoadingSpinner.tsx      # 로딩 스피너
│   │   ├── ScrollToTop.tsx         # 맨 위로 버튼
│   │   └── ShareModal.tsx          # 공유 모달 (카카오, X, 페북, 링크)
│   ├── test/                       # 테스트 관련 컴포넌트
│   │   ├── ActionButtons.tsx       # 좋아요/북마크/공유/추천 버튼
│   │   ├── OptionButton.tsx        # 선택지 버튼
│   │   ├── ProgressBar.tsx         # 진행률 표시 바
│   │   ├── Question.tsx            # 질문 컴포넌트
│   │   ├── RelatedTests.tsx        # 비슷한 테스트 추천
│   │   ├── ResultCard.tsx          # 결과 카드
│   │   └── TestInfo.tsx            # 테스트 정보 (상세 페이지)
│   └── ui/                         # shadcn/ui 컴포넌트 (자동 생성)
│       ├── accordion.tsx
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── sonner.tsx              # 토스트 알림
│       └── textarea.tsx
│
├── data/                           # 데이터 파일
│   ├── tests/                      # 테스트 JSON 파일 (개별 파일)
│   │   ├── _template.json          # 새 테스트 템플릿
│   │   ├── black-white-test.json   # 흑백요리사 테스트
│   │   ├── blood-type-test.json    # 혈액형 테스트
│   │   ├── button-test.json        # 발작버튼 테스트
│   │   ├── dubai-cookie-test.json  # 두바이 초콜릿 MBTI
│   │   ├── empathy-test.json       # 공감능력 테스트
│   │   ├── fantasy-job-test.json   # 판타지 직업 테스트
│   │   ├── ghibli-character-test.json  # 에겐&테토 테스트
│   │   ├── index.ts                # 모든 테스트 자동 병합
│   │   ├── mbti-simple-test.json   # 간단 MBTI 테스트
│   │   └── year-review-test.json   # 2024 올해의 리뷰
│   └── tests.json.backup           # 기존 단일 파일 백업
│
├── docs/                           # 프로젝트 문서
│   ├── COLLABORATION.md            # 협업 가이드 (Git, 테스트 추가 방법)
│   ├── CONVERSATION_SUMMARY.md     # 대화 요약 (개발 히스토리)
│   ├── DIR.md                      # 이 파일 (디렉토리 구조)
│   ├── PRD.md                      # 제품 요구사항 문서
│   └── TODO.md                     # 작업 목록 (완료/진행/예정)
│
├── hooks/                          # Custom React Hooks
│   ├── use-bookmarks.ts            # 북마크 관리 훅
│   ├── use-likes.ts                # 좋아요 관리 훅
│   └── use-local-storage.ts        # localStorage 훅
│
├── lib/                            # 유틸리티 함수
│   ├── image-utils.ts              # 이미지 처리 유틸리티
│   ├── test-utils.ts               # 테스트 관련 유틸리티
│   └── utils.ts                    # 공통 유틸리티 (cn 함수 등)
│
├── public/                         # 정적 파일
│   ├── ads.txt                     # Google AdSense 인증 파일
│   ├── banner/                     # 배너 이미지
│   │   ├── dubai_banner.png
│   │   ├── dubai-cookie-test.png
│   │   ├── empathy-test.png
│   │   ├── fantasy-job-test.png
│   │   ├── ghibli-character-test.png
│   │   ├── mbti-simple-test.png
│   │   └── year-review-test.png
│   ├── icons/                      # PWA 아이콘
│   │   ├── icon-192x192.png
│   │   ├── icon-256x256.png
│   │   ├── icon-384x384.png
│   │   └── icon-512x512.png
│   ├── images/                     # 이미지 파일
│   │   └── tests/                  # 테스트별 이미지 폴더
│   │       ├── black-white-test/   # 흑백요리사 테스트 이미지
│   │       ├── button-test/        # 발작버튼 테스트 이미지
│   │       ├── dubai-cookie-test/  # 두바이 초콜릿 테스트 이미지
│   │       ├── empathy-test/       # 공감능력 테스트 이미지
│   │       ├── fantasy-job-test/   # 판타지 직업 테스트 이미지
│   │       ├── ghibli-character-test/  # 에겐&테토 테스트 이미지
│   │       ├── mbti-simple-test/   # MBTI 테스트 이미지
│   │       └── year-review-test/   # 올해의 리뷰 테스트 이미지
│   ├── logo-1.png                  # 로고 (대체)
│   ├── logo.png                    # 로고
│   ├── og-image.png                # Open Graph 이미지
│   └── po.png                      # 기타 이미지
│
├── types/                          # TypeScript 타입 정의
│   ├── test.ts                     # 테스트 관련 타입 (Test, Question, Result)
│   └── vercel-og.d.ts              # Vercel OG 이미지 타입
│
├── .cursorignore                   # Cursor 무시 파일 설정
├── .gitignore                      # Git 무시 파일 설정
├── .prettierignore                 # Prettier 무시 파일 설정
├── .prettierrc                     # Prettier 설정
├── AGENTS.md                       # AI 에이전트용 프로젝트 가이드
├── CLAUDE.md                       # Claude Code용 프로젝트 가이드
├── components.json                 # shadcn/ui 설정 파일
├── eslint.config.mjs               # ESLint 설정
├── middleware.ts                   # Next.js 미들웨어
├── next.config.ts                  # Next.js 설정 파일
├── package.json                    # 의존성 관리
├── postcss.config.mjs              # PostCSS 설정
├── README.md                       # 프로젝트 소개 (메인 문서)
├── tsconfig.json                   # TypeScript 설정
└── vercel.json                     # Vercel 배포 설정
```

---

## 📝 주요 디렉토리 설명

### `app/` - Next.js App Router

| 경로 | 설명 |
|------|------|
| `/` | 홈 페이지 (테스트 목록) |
| `/search` | 검색 결과 페이지 |
| `/test/[id]` | 테스트 상세 페이지 |
| `/test/[id]/play` | 테스트 진행 페이지 |
| `/test/[id]/result` | 테스트 결과 페이지 |
| `/api/og/result` | OG 이미지 생성 API |
| `/api/og/download` | OG 이미지 다운로드 API |

### `components/` - React 컴포넌트

| 폴더 | 설명 |
|------|------|
| `home/` | 홈 화면 전용 컴포넌트 (검색, 카드, 섹션, 배너) |
| `layout/` | 레이아웃 컴포넌트 (헤더, 네비게이션) |
| `test/` | 테스트 관련 컴포넌트 (질문, 결과, 버튼 등) |
| `shared/` | 공유 컴포넌트 (모달, 스피너, 광고 등) |
| `providers/` | Context Provider (테마 등) |
| `ui/` | shadcn/ui 컴포넌트 (자동 생성, 수정 금지) |

### `data/tests/` - 테스트 데이터

- **개별 파일 구조**: 협업 효율성을 위해 테스트별 JSON 파일 분리
- **`index.ts`**: 모든 테스트를 자동으로 import 및 병합
- **`_template.json`**: 새 테스트 작성 시 사용하는 템플릿

### `hooks/` - Custom Hooks

| 파일 | 설명 |
|------|------|
| `use-local-storage.ts` | localStorage 관리 기본 훅 |
| `use-likes.ts` | 좋아요 기능 훅 |
| `use-bookmarks.ts` | 북마크 기능 훅 |

### `lib/` - 유틸리티 함수

| 파일 | 설명 |
|------|------|
| `utils.ts` | 공통 유틸리티 (`cn` 함수 등) |
| `test-utils.ts` | 테스트 관련 함수 (검색, 추천, 결과 계산) |
| `image-utils.ts` | 이미지 처리 함수 |

### `public/` - 정적 파일

| 폴더/파일 | 설명 |
|-----------|------|
| `banner/` | 홈 화면 배너 이미지 |
| `icons/` | PWA 아이콘 (192, 256, 384, 512px) |
| `images/tests/` | 각 테스트의 썸네일, 커버, 결과 이미지 |
| `logo.png` | 헤더 로고 |
| `og-image.png` | 기본 Open Graph 이미지 |
| `ads.txt` | Google AdSense 인증 파일 |

### `types/` - TypeScript 타입

| 파일 | 설명 |
|------|------|
| `test.ts` | `Test`, `Question`, `Option`, `Result` 타입 정의 |
| `vercel-og.d.ts` | Vercel OG 이미지 생성 타입 |

---

## 🔧 설정 파일

| 파일 | 용도 |
|------|------|
| `next.config.ts` | Next.js 설정 (이미지 최적화 등) |
| `tsconfig.json` | TypeScript 컴파일러 설정 |
| `eslint.config.mjs` | ESLint 린팅 규칙 |
| `components.json` | shadcn/ui 컴포넌트 설정 |
| `.prettierrc` | Prettier 코드 포맷팅 규칙 |
| `postcss.config.mjs` | PostCSS (Tailwind v4) 설정 |
| `middleware.ts` | Next.js 미들웨어 (현재 미사용) |
| `vercel.json` | Vercel 배포 설정 |

---

## 📦 임시 파일

프로젝트 루트의 `tmpclaude-*` 파일들은 임시 파일로 삭제 가능합니다:

```
tmpclaude-115c-cwd
tmpclaude-23ee-cwd
tmpclaude-4a9d-cwd
tmpclaude-6927-cwd
tmpclaude-82d1-cwd
tmpclaude-f028-cwd
tmpclaude-fadf-cwd
```

---

## 🎨 이미지 파일 구조

각 테스트는 다음 이미지를 포함합니다:

```
public/images/tests/{test-id}/
├── thumb.png        # 썸네일 (목록용, 108x150px)
├── cover.png        # 커버 이미지 (상세 페이지 상단)
└── result-*.png     # 결과 이미지 (결과 유형별)
```

**예시 (button-test)**:
```
public/images/tests/button-test/
├── thumb.png
├── cover.png
├── result-high.png
├── result-mid-high.png
├── result-mid-low.png
└── result-low.png
```

---

## 📚 문서 구조

| 문서 | 설명 | 대상 독자 |
|------|------|-----------|
| `README.md` | 프로젝트 소개 및 시작 가이드 | 모든 사용자 |
| `AGENTS.md` | AI 에이전트용 기술 가이드 | Claude Code |
| `CLAUDE.md` | Claude Code 추가 가이드 | Claude Code |
| `docs/PRD.md` | 제품 요구사항 문서 | PM, 개발자 |
| `docs/TODO.md` | 작업 목록 및 진행 상황 | 개발자 |
| `docs/COLLABORATION.md` | 협업 가이드 | 기여자 |
| `docs/DIR.md` | 디렉토리 구조 (이 파일) | 개발자 |
| `docs/CONVERSATION_SUMMARY.md` | 개발 히스토리 | 개발자 |

---

## 🔄 파일 명명 규칙

### 컴포넌트 파일
- **형식**: `ComponentName.tsx` (PascalCase)
- **예시**: `TestCard.tsx`, `ShareModal.tsx`

### 페이지 파일
- **형식**: `page.tsx`, `layout.tsx`, `loading.tsx`
- **위치**: `app/` 디렉토리 내

### 유틸리티 파일
- **형식**: `utility-name.ts` (kebab-case)
- **예시**: `test-utils.ts`, `image-utils.ts`

### 데이터 파일
- **형식**: `{test-name}-test.json` (kebab-case)
- **예시**: `button-test.json`, `mbti-simple-test.json`

### 이미지 파일
- **형식**: `kebab-case.png`
- **예시**: `result-high.png`, `ghibli-mixed.png`

---

## 📌 참고 사항

1. **`components/ui/`** 폴더는 shadcn/ui에 의해 자동 생성되므로 직접 수정하지 마세요.
2. **`data/tests/index.ts`**에 새 테스트를 추가하면 자동으로 앱에 반영됩니다.
3. **`public/`** 폴더의 파일은 `/파일명`으로 접근 가능합니다.
4. **임시 파일** (`tmpclaude-*`)은 삭제해도 무방합니다.

---

**마지막 업데이트**: 2026-01-14
