# AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Next.js 15.5.6** with React 19 and App Router
- **Styling**: Tailwind CSS v4 (uses `globals.css`, no config file)
- **UI Components**: shadcn/ui (based on Radix UI)
- **Icons**: lucide-react
- **Forms**: react-hook-form + Zod
- **Package Manager**: pnpm
- **Language**: TypeScript (strict typing required)

## Development Commands

```bash
# Development server with turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Linting
pnpm lint
```

## Project Architecture

### Directory Convention

프로젝트 파일은 `app` 외부에 저장:

- `app/`: 라우팅 전용 (page.tsx, layout.tsx, route.ts 등만)
- `components/`: 재사용 가능한 컴포넌트
  - `components/ui/`: shadcn 컴포넌트 (자동 생성, 수정 금지)
  - `components/providers/`: React Context 프로바이더들
- `lib/`: 유틸리티 함수 및 클라이언트 설정
  - `lib/utils.ts`: 공통 유틸리티 (cn 함수 등)
- `hooks/`: 커스텀 React Hook들

**예정된 디렉토리** (아직 없지만 필요 시 생성):

- `actions/`: Server Actions (API 대신 우선 사용)
- `types/`: TypeScript 타입 정의
- `constants/`: 상수 값들
- `states/`: 전역 상태 (jotai 사용, 최소화)

### Naming Conventions

- **파일명**: kebab-case (예: `my-component.tsx`)
- **컴포넌트**: PascalCase (파일명은 여전히 kebab-case)
- **함수/변수**: camelCase
- **타입/인터페이스**: PascalCase

## Development Guidelines

### Server Actions vs API Routes

**우선순위**: Server Actions > API Routes

- 가능하면 항상 Server Actions 사용 (`actions/` 디렉토리)
- API Routes는 불가피한 경우에만 사용 (웹훅, 외부 API 등)

### UI Components

1. **shadcn/ui 설치 확인**: 사용 전 `/components/ui/` 디렉토리 체크
2. **설치 명령어**: `pnpx shadcn@latest add [component-name]`
3. **아이콘**: lucide-react 사용 (`import { Icon } from 'lucide-react'`)

### Styling

- Tailwind CSS v4 사용 (설정은 `app/globals.css`에만)
- `tailwind.config.js` 파일은 사용하지 않음
- 다크/라이트 모드 지원 고려

### TypeScript

- 모든 코드에 타입 정의 필수
- 인터페이스 우선, 타입은 필요시만
- enum 대신 const 객체 사용
- `satisfies` 연산자로 타입 검증

### React 19 & Next.js 15 Patterns

```typescript
// Async Request APIs (항상 await 사용)
const cookieStore = await cookies();
const headersList = await headers();
const params = await props.params;
const searchParams = await props.searchParams;

// Server Component 우선
// 'use client'는 필요한 경우에만
```

## Key Files

- `middleware.ts`: Next.js 미들웨어
- `app/layout.tsx`: RootLayout
- `components.json`: shadcn/ui 설정

## Additional Cursor Rules

프로젝트에는 다음 Cursor 규칙들이 있습니다:

- `.cursor/rules/web/nextjs-convention.mdc`: Next.js 컨벤션
- `.cursor/rules/web/design-rules.mdc`: UI/UX 디자인 가이드
- `.cursor/rules/web/playwright-test-guide.mdc`: 테스트 가이드

주요 원칙은 이 AGENTS.md에 통합되어 있으나, 세부사항은 해당 파일들 참고.
