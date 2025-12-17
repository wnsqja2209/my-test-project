# TODO

## 완료된 항목

- [x] `.cursor/` 디렉토리
  - [x] `rules/` 커서룰
- [x] `.github/` 디렉토리
- [x] `app/` 디렉토리
  - [x] `favicon.ico` 파일
- [x] `public/` 디렉토리
  - [x] `icons/` 디렉토리
  - [x] `logo.png` 파일
  - [x] `og-image.png` 파일
- [x] `tsconfig.json` 파일
- [x] `.cursorignore` 파일
- [x] `.gitignore` 파일
- [x] `.prettierignore` 파일
- [x] `.prettierrc` 파일
- [x] `eslint.config.mjs` 파일
- [x] `AGENTS.md` 파일
- [x] `docs/PRD.md` 파일

---

## Phase 1: MVP

### 1.1 기초 설정

- [x] `types/test.ts` - 타입 정의 (Test, Question, Option, Result)
- [x] `data/tests.json` - 테스트 데이터 JSON 파일
- [x] `lib/test-utils.ts` - 테스트 관련 유틸리티 함수

### 1.2 레이아웃 컴포넌트

- [x] `components/layout/Header.tsx` - 헤더 (로고, 검색 아이콘, 햄버거 메뉴)
- [x] `components/layout/MobileNav.tsx` - 모바일 네비게이션 메뉴
- [x] `app/layout.tsx` 업데이트 - Header 적용

### 1.3 홈 화면

- [x] `components/home/TestCard.tsx` - 테스트 카드 컴포넌트
- [x] `components/home/TestSection.tsx` - 테마별 테스트 섹션
- [x] `app/page.tsx` - 홈 페이지 (테스트 카드 목록)

### 1.4 테스트 상세 페이지

- [x] `components/test/TestInfo.tsx` - 테스트 정보 (이미지, 제목, 설명, 소요시간, 실행횟수)
- [x] `components/test/ActionButtons.tsx` - 좋아요, 북마크, 공유, 추천 버튼
- [x] `app/test/[id]/page.tsx` - 테스트 상세 페이지

### 1.5 테스트 진행 페이지

- [x] `components/test/ProgressBar.tsx` - 진행률 표시 바
- [x] `components/test/Question.tsx` - 질문 컴포넌트
- [x] `components/test/OptionButton.tsx` - 선택지 버튼
- [x] `app/test/[id]/play/page.tsx` - 테스트 진행 페이지

### 1.6 결과 페이지

- [x] `components/test/ResultCard.tsx` - 결과 카드 컴포넌트
- [x] `app/test/[id]/result/page.tsx` - 테스트 결과 페이지

### 1.7 예시 테스트 콘텐츠 (5개)

- [x] 발작버튼 테스트 (10문항, 4가지 결과)
- [x] 혈액형 테스트 (12문항, 4가지 결과)
- [x] MBTI 테스트 (20문항, 16가지 결과)
- [x] 공감능력 테스트 (15문항, 4가지 결과)
- [x] 에겐&테토 테스트 (8문항, 3가지 결과)

---

## Phase 2: 인터랙션

### 2.1 검색 기능

- [x] `components/home/SearchBar.tsx` - 검색 바 컴포넌트
- [x] `app/search/page.tsx` - 검색 결과 페이지
- [x] 검색어 기반 테스트 필터링 로직 (`lib/test-utils.ts`의 `searchTests` 함수)

### 2.2 좋아요/북마크

- [x] `hooks/use-local-storage.ts` - localStorage 훅
- [x] `hooks/use-likes.ts` - 좋아요 관리 훅
- [x] `hooks/use-bookmarks.ts` - 북마크 관리 훅
- [x] ActionButtons에 좋아요/북마크 기능 연결

### 2.3 공유하기

- [x] `components/shared/ShareModal.tsx` - 공유 모달 (카카오톡, X, 페이스북, 링크 복사)
- [x] 결과 페이지 공유 기능

### 2.4 비슷한 테스트 추천

- [x] `components/test/RelatedTests.tsx` - 비슷한 테스트 추천 컴포넌트
- [x] 카테고리/태그 기반 추천 로직 (`lib/test-utils.ts`의 `getRelatedTests` 함수)

---

## Phase 3: 개선

### 3.1 애니메이션

- [x] 페이지 전환 애니메이션 (`globals.css` - fade-in, fade-in-up 등)
- [x] 카드 호버 효과 (`card-hover` 클래스)
- [x] 선택지 클릭 피드백 (`option-select` 클래스)
- [x] 결과 등장 애니메이션 (`animate-bounce-in`)

### 3.2 SEO 최적화

- [x] 각 페이지 메타데이터 설정 (`app/layout.tsx`)
- [x] Open Graph 이미지 설정
- [x] `app/robots.ts` - robots.txt 생성
- [x] `app/sitemap.ts` - sitemap.xml 생성

### 3.3 PWA 지원

- [x] `app/manifest.ts` - Web App Manifest
- [ ] 서비스 워커 설정 (next-pwa 추가 필요)
- [ ] 오프라인 지원 (next-pwa 추가 필요)

### 3.4 성능 최적화

- [x] 이미지 최적화 (next/image 사용 중)
- [x] 코드 스플리팅 (Next.js 자동 처리)
- [x] 로딩 상태 UI (`components/shared/LoadingSpinner.tsx`)
- [x] `app/loading.tsx` - 전역 로딩 상태
- [x] `app/test/[id]/loading.tsx` - 테스트 페이지 로딩 상태

---

## Phase 4: 협업 효율성 개선

### 4.1 파일 구조 리팩토링

- [x] `data/tests/` 디렉토리 생성
- [x] 기존 테스트를 개별 파일로 분리
  - [x] `data/tests/button-test.json` - 발작버튼 테스트
  - [x] `data/tests/blood-type-test.json` - 혈액형 테스트
  - [x] `data/tests/mbti-simple-test.json` - MBTI 테스트
  - [x] `data/tests/empathy-test.json` - 공감능력 테스트
  - [x] `data/tests/ghibli-character-test.json` - 에겐&테토 테스트
- [x] `data/tests/index.ts` 생성 - 모든 테스트 자동 병합
- [x] `lib/test-utils.ts` 수정 - 분리된 파일 구조 사용
- [x] 기존 `data/tests.json` 백업 및 제거 (또는 마이그레이션 가이드 작성)

### 4.2 자동 병합 시스템

- [x] `data/tests/index.ts` 구현
  - [x] 모든 테스트 파일 import
  - [x] 테스트 배열 병합 로직
  - [x] 타입 안정성 보장
- [ ] (선택사항) 동적 import로 자동 인덱싱
  - [ ] `import.meta.glob` 또는 유사 기능 사용
  - [ ] 새 파일 추가 시 자동 인식

### 4.3 협업 워크플로우 문서화

- [ ] `docs/COLLABORATION.md` 작성
  - [ ] 새 테스트 추가 가이드
  - [ ] 기존 테스트 수정 가이드
  - [ ] Git 워크플로우 (브랜치 전략, PR 규칙)
  - [ ] 테스트 파일 네이밍 컨벤션
  - [ ] 충돌 해결 가이드
- [ ] 테스트 템플릿 파일 생성
  - [ ] `data/tests/_template.json` - 새 테스트 작성 가이드
  - [ ] 필수 필드 및 선택 필드 명시
  - [ ] 예시 코드 포함

### 4.4 검증 및 테스트

- [x] 리팩토링 후 기능 테스트
  - [x] 홈 화면 테스트 목록 표시 확인
  - [x] 테스트 상세 페이지 동작 확인
  - [x] 테스트 진행 페이지 동작 확인
  - [x] 결과 페이지 동작 확인
  - [x] 검색 기능 동작 확인
- [x] 타입 검증
  - [x] TypeScript 컴파일 오류 확인
  - [x] 모든 테스트가 올바른 타입인지 확인
- [x] 빌드 테스트
  - [x] `pnpm build` 성공 확인
  - [x] 프로덕션 빌드 동작 확인

### 4.5 추가 개선 사항 (선택사항)

- [ ] 테스트 메타데이터 분리
  - [ ] `data/tests-meta.json` - 목록용 경량 데이터
  - [ ] 상세 데이터는 개별 파일에 저장
  - [ ] 홈/검색 페이지 성능 최적화
- [ ] 테스트 검증 스크립트
  - [ ] `scripts/validate-tests.ts` - 테스트 데이터 유효성 검사
  - [ ] 필수 필드 누락 체크
  - [ ] 이미지 경로 유효성 체크
  - [ ] 점수 계산 로직 검증
- [ ] 자동 인덱스 생성 스크립트
  - [ ] `scripts/generate-test-index.ts`
  - [ ] `data/tests/*.json` 스캔
  - [ ] `data/tests/index.ts` 자동 생성
  - [ ] Git pre-commit hook에 통합 (선택사항)

---

## 기타

- [x] `app/not-found.tsx` - 404 페이지
- [ ] `.husky/` 디렉토리 (git hooks 설정)
- [ ] 결과 이미지 추가
  - [ ] `public/images/results/` 디렉토리 생성
  - [ ] 31개의 결과 이미지 파일 추가
  - [ ] 각 이미지 파일명이 `tests.json`의 `imageUrl`과 일치하는지 확인
