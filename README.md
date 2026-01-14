# 🧠 심리테스트 웹서비스

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**모바일 최적화 심리테스트 플랫폼**

[🎯 데모 보기](#) • [📖 문서](#-문서) • [🚀 시작하기](#-시작하기)

</div>

---

## 📋 목차

1. [소개](#-소개)
2. [주요 기능](#-주요-기능)
3. [기술 스택](#-기술-스택)
4. [시작하기](#-시작하기)
5. [프로젝트 구조](#-프로젝트-구조)
6. [테스트 목록](#-테스트-목록)
7. [개발 가이드](#-개발-가이드)
8. [배포](#-배포)
9. [문서](#-문서)

---

## 🎯 소개

**poomang.com**을 벤치마킹한 **모바일 퍼스트** 심리테스트 웹서비스입니다.

### 핵심 특징

- 🔓 **비로그인 서비스** - 회원가입 없이 누구나 즉시 이용 가능
- 📱 **모바일 최적화** - 모바일 화면에 최적화된 반응형 UI
- 🎨 **모던 디자인** - shadcn/ui 기반의 세련된 UI/UX
- 🚀 **빠른 로딩** - 정적 데이터 기반의 초고속 로딩
- 📤 **SNS 공유** - 카카오톡, X(트위터), 페이스북, 링크 복사
- 💾 **로컬 저장** - 좋아요, 북마크 기능 (localStorage)
- 🖼️ **동적 OG 이미지** - 결과 공유 시 자동 생성되는 Open Graph 이미지
- 📊 **광고 통합** - Google AdSense 통합

---

## ✨ 주요 기능

### 사용자 기능

| 기능 | 설명 |
|------|------|
| 🏠 **홈 화면** | 테마별 섹션으로 구성된 테스트 카드 목록 |
| 🔍 **검색** | 제목, 설명, 태그 기반 실시간 검색 |
| 📖 **테스트 상세** | 테스트 정보, 예상 소요시간, 통계 표시 |
| 🎮 **테스트 진행** | 진행률 표시, 이전 질문 돌아가기 지원 |
| 🎉 **결과 페이지** | 결과 이미지, 설명, 공유 버튼 |
| ❤️ **좋아요/북마크** | 로컬 저장소 기반 사용자 반응 |
| 📤 **공유하기** | 카카오톡, X, 페이스북, 링크 복사 |
| 🎪 **배너 슬라이더** | 주요 테스트 홍보 배너 |
| 🌓 **테마 전환** | 다크/라이트 모드 지원 |
| 📜 **맨 위로** | 긴 페이지에서 스크롤 탑 버튼 |

### 개발자 기능

- ✅ 테스트별 JSON 파일 분리 (협업 효율성)
- ✅ 자동 테스트 병합 시스템 (`data/tests/index.ts`)
- ✅ TypeScript 타입 안정성
- ✅ 템플릿 파일 제공 (`_template.json`)
- ✅ SEO 최적화 (sitemap, robots.txt)
- ✅ PWA 지원 (Web App Manifest)

---

## 🛠️ 기술 스택

### 프론트엔드

| 영역 | 기술 | 버전 |
|------|------|------|
| **프레임워크** | Next.js | 15.5.9 |
| **UI 라이브러리** | React | 19.0.0 |
| **언어** | TypeScript | 5.x |
| **스타일링** | Tailwind CSS | v4 |
| **UI 컴포넌트** | shadcn/ui | - |
| **아이콘** | lucide-react, react-icons | - |
| **폼 관리** | react-hook-form | 7.56.4 |
| **검증** | Zod | 3.25.32 |
| **토스트 알림** | Sonner | 2.0.7 |
| **테마** | next-themes | 0.4.6 |

### 인프라

- **배포**: Vercel
- **OG 이미지**: @vercel/og
- **광고**: Google AdSense
- **패키지 매니저**: pnpm

---

## 🚀 시작하기

### 필수 요구사항

시스템에 다음이 설치되어 있어야 합니다:

- [Node.js](https://nodejs.org/) (v18 이상)
- [pnpm](https://pnpm.io/) (권장 패키지 매니저)

```bash
# pnpm 설치
npm install -g pnpm
```

### 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone https://github.com/your-username/our-play.git
   cd our-play
   ```

2. **의존성 설치**

   ```bash
   pnpm install
   ```

3. **환경 변수 설정** (선택사항)

   ```bash
   cp .env.example .env
   ```

   `.env` 파일에 필요한 환경 변수를 설정:
   - `NEXT_PUBLIC_KAKAO_APP_KEY`: 카카오 공유 기능 (선택)
   - `NEXT_PUBLIC_GA_ID`: Google Analytics (선택)
   - `NEXT_PUBLIC_ADSENSE_ID`: Google AdSense (선택)

4. **개발 서버 실행**

   ```bash
   pnpm dev
   ```

   브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 개발 명령어

```bash
# 개발 서버 (Turbopack)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start

# 린팅
pnpm lint
```

---

## 📁 프로젝트 구조

```
our-play-main/
├── app/                       # Next.js App Router
│   ├── api/                  # API Routes
│   │   └── og/              # OG 이미지 생성 API
│   ├── search/              # 검색 페이지
│   ├── test/[id]/           # 테스트 상세/진행/결과
│   ├── layout.tsx           # Root Layout
│   ├── page.tsx             # 홈 페이지
│   ├── globals.css          # 전역 스타일
│   ├── manifest.ts          # PWA Manifest
│   ├── robots.ts            # robots.txt
│   └── sitemap.ts           # sitemap.xml
│
├── components/               # React 컴포넌트
│   ├── home/                # 홈 화면 컴포넌트
│   │   ├── BannerSlider.tsx
│   │   ├── SearchBar.tsx
│   │   ├── TestCard.tsx
│   │   └── TestSection.tsx
│   ├── layout/              # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   └── MobileNav.tsx
│   ├── test/                # 테스트 관련 컴포넌트
│   │   ├── TestInfo.tsx
│   │   ├── ActionButtons.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Question.tsx
│   │   ├── OptionButton.tsx
│   │   ├── ResultCard.tsx
│   │   └── RelatedTests.tsx
│   ├── shared/              # 공유 컴포넌트
│   │   ├── ShareModal.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── AdSense.tsx
│   │   └── AdSenseModal.tsx
│   ├── providers/           # Context Providers
│   │   └── theme-provider.tsx
│   └── ui/                  # shadcn/ui 컴포넌트 (자동 생성)
│
├── data/                     # 테스트 데이터
│   └── tests/               # 개별 테스트 JSON 파일
│       ├── _template.json   # 새 테스트 템플릿
│       ├── button-test.json
│       ├── blood-type-test.json
│       ├── mbti-simple-test.json
│       ├── empathy-test.json
│       ├── ghibli-character-test.json
│       ├── black-white-test.json
│       ├── dubai-cookie-test.json
│       ├── fantasy-job-test.json
│       ├── year-review-test.json
│       └── index.ts         # 자동 병합 스크립트
│
├── hooks/                    # Custom React Hooks
│   ├── use-local-storage.ts
│   ├── use-likes.ts
│   └── use-bookmarks.ts
│
├── lib/                      # 유틸리티 함수
│   ├── utils.ts             # 공통 유틸 (cn 등)
│   ├── test-utils.ts        # 테스트 관련 유틸
│   └── image-utils.ts       # 이미지 처리 유틸
│
├── types/                    # TypeScript 타입
│   ├── test.ts              # 테스트 타입 정의
│   └── vercel-og.d.ts       # OG 이미지 타입
│
├── public/                   # 정적 파일
│   ├── banner/              # 배너 이미지
│   ├── icons/               # PWA 아이콘
│   ├── images/              # 테스트 이미지
│   │   └── tests/           # 테스트별 이미지 폴더
│   ├── logo.png
│   ├── og-image.png
│   └── ads.txt              # AdSense 인증
│
├── docs/                     # 프로젝트 문서
│   ├── PRD.md               # 제품 요구사항 문서
│   ├── TODO.md              # 작업 목록
│   ├── COLLABORATION.md     # 협업 가이드
│   ├── CONVERSATION_SUMMARY.md
│   └── DIR.md               # 디렉토리 구조
│
├── .cursor/                  # Cursor AI 규칙
│   └── rules/               # 개발 컨벤션
│
├── AGENTS.md                 # AI 에이전트 가이드
├── middleware.ts             # Next.js 미들웨어
├── next.config.ts            # Next.js 설정
├── tsconfig.json             # TypeScript 설정
├── components.json           # shadcn/ui 설정
└── package.json              # 의존성 관리
```

---

## 🎮 테스트 목록

현재 **10개**의 심리테스트가 제공됩니다:

| # | 제목 | 카테고리 | 질문 수 | 결과 수 | 파일명 |
|---|------|----------|---------|---------|--------|
| 1 | 발작버튼 테스트 | 성격 | 10 | 4 | `button-test.json` |
| 2 | 혈액형 테스트 | 성격 | 12 | 4 | `blood-type-test.json` |
| 3 | 간단 MBTI 테스트 | MBTI | 20 | 16 | `mbti-simple-test.json` |
| 4 | 공감능력 테스트 | 성격 | 15 | 5 | `empathy-test.json` |
| 5 | 에겐&테토 테스트 | 재미 | 8 | 3 | `ghibli-character-test.json` |
| 6 | 흑백요리사 테스트 | 재미 | 10 | 2 | `black-white-test.json` |
| 7 | 두바이 초콜릿 MBTI | MBTI | 12 | 16 | `dubai-cookie-test.json` |
| 8 | 판타지 직업 테스트 | 재미 | 10 | 4 | `fantasy-job-test.json` |
| 9 | 2024 올해의 리뷰 | 재미 | 10 | 4 | `year-review-test.json` |

---

## 👨‍💻 개발 가이드

### 새 테스트 추가하기

1. **템플릿 복사**

   ```bash
   cp data/tests/_template.json data/tests/your-test-name-test.json
   ```

2. **테스트 데이터 작성**

   - 필수 필드: `id`, `title`, `description`, `questions`, `results`
   - 점수 계산 로직 설정
   - 이미지 경로 지정

3. **인덱스 파일에 추가**

   `data/tests/index.ts` 파일에 import 추가:

   ```typescript
   import yourTestName from "./your-test-name-test.json";
   
   const tests: Test[] = [
     // ... 기존 테스트들
     yourTestName as Test,
   ];
   ```

4. **이미지 추가**

   `public/images/tests/your-test-name-test/` 폴더 생성 및 이미지 추가

5. **테스트 실행**

   ```bash
   pnpm dev
   ```

   브라우저에서 `/test/your-test-name-test` 접속하여 확인

**자세한 가이드**: [`docs/COLLABORATION.md`](docs/COLLABORATION.md) 참조

### shadcn/ui 컴포넌트 추가

```bash
pnpx shadcn@latest add [component-name]
```

예시:
```bash
pnpx shadcn@latest add dialog
pnpx shadcn@latest add toast
```

### 코딩 컨벤션

- **파일명**: kebab-case (예: `test-card.tsx`)
- **컴포넌트**: PascalCase (예: `TestCard`)
- **함수/변수**: camelCase
- **타입/인터페이스**: PascalCase
- **상수**: UPPER_SNAKE_CASE (선택)

자세한 내용: [`.cursor/rules/`](.cursor/rules/) 참조

---

## 🚀 배포

### Vercel 배포 (권장)

1. **Vercel에 프로젝트 연결**

   ```bash
   pnpm i -g vercel
   vercel
   ```

2. **환경 변수 설정**

   Vercel Dashboard에서 환경 변수 추가:
   - `NEXT_PUBLIC_KAKAO_APP_KEY`
   - `NEXT_PUBLIC_GA_ID`
   - `NEXT_PUBLIC_ADSENSE_ID`

3. **자동 배포**

   `main` 브랜치에 push하면 자동 배포됩니다.

### 기타 플랫폼

Next.js 15를 지원하는 모든 플랫폼에 배포 가능:
- Netlify
- AWS Amplify
- Cloudflare Pages
- 커스텀 Node.js 서버

---

## 📖 문서

- **[PRD.md](docs/PRD.md)** - 제품 요구사항 문서 (기능 명세, 데이터 모델)
- **[TODO.md](docs/TODO.md)** - 개발 작업 목록 (완료/진행/예정)
- **[COLLABORATION.md](docs/COLLABORATION.md)** - 협업 가이드 (Git, 테스트 추가 방법)
- **[AGENTS.md](AGENTS.md)** - AI 에이전트용 프로젝트 가이드

---

## 🤝 기여하기

프로젝트에 기여하고 싶으신가요?

1. 이 저장소를 Fork
2. 새 브랜치 생성 (`git checkout -b feat/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치에 Push (`git push origin feat/amazing-feature`)
5. Pull Request 생성

**커밋 메시지 형식**: [Conventional Commits](https://www.conventionalcommits.org/) 준수

자세한 내용: [`docs/COLLABORATION.md`](docs/COLLABORATION.md)

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 📞 문의

- **이슈**: [GitHub Issues](https://github.com/your-username/our-play/issues)
- **이메일**: your-email@example.com

---

<div align="center">

**Made with ❤️ using Next.js 15 & React 19**

⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!

</div>

 
 