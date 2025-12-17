# 협업 워크플로우 가이드

이 문서는 프로젝트에 기여하는 모든 개발자를 위한 협업 가이드입니다. 테스트 추가, 수정, Git 워크플로우 등에 대한 규칙과 가이드를 제공합니다.

---

## 목차

1. [새 테스트 추가 가이드](#1-새-테스트-추가-가이드)
2. [기존 테스트 수정 가이드](#2-기존-테스트-수정-가이드)
3. [Git 워크플로우](#3-git-워크플로우)
4. [테스트 파일 네이밍 컨벤션](#4-테스트-파일-네이밍-컨벤션)
5. [충돌 해결 가이드](#5-충돌-해결-가이드)

---

## 1. 새 테스트 추가 가이드

### 1.1 파일 생성

1. `data/tests/` 디렉토리에 새 JSON 파일을 생성합니다.
2. 파일명은 `{test-name}-test.json` 형식을 따릅니다 (kebab-case).
   - 예: `button-test.json`, `blood-type-test.json`, `mbti-simple-test.json`

### 1.2 템플릿 사용

`data/tests/_template.json` 파일을 복사하여 시작하세요:

```bash
cp data/tests/_template.json data/tests/your-test-name-test.json
```

### 1.3 필수 필드 작성

테스트 파일에는 다음 필드들이 **필수**입니다:

#### 루트 레벨 필드

| 필드 | 타입 | 설명 | 예시 |
|------|------|------|------|
| `id` | `string` | 테스트 고유 ID (파일명과 일치 권장) | `"button-test"` |
| `title` | `string` | 테스트 제목 | `"발작버튼 테스트"` |
| `description` | `string` | 테스트 설명 | `"당신의 선택을 통해..."` |
| `thumbnailUrl` | `string` | 썸네일 이미지 경로 | `"/images/tests/button-thumb.png"` |
| `coverImageUrl` | `string` | 커버 이미지 경로 | `"/images/tests/button-cover.png"` |
| `estimatedTime` | `number` | 예상 소요시간 (분) | `2` |
| `playCount` | `number` | 실행 횟수 (초기값: 0) | `0` |
| `likeCount` | `number` | 좋아요 수 (초기값: 0) | `0` |
| `bookmarkCount` | `number` | 북마크 수 (초기값: 0) | `0` |
| `recommendCount` | `number` | 추천 수 (초기값: 0) | `0` |
| `category` | `string` | 카테고리 (`personality`, `love`, `fun`, `mbti`, `etc`) | `"personality"` |
| `tags` | `string[]` | 태그 배열 | `["성격", "직감"]` |
| `questions` | `Question[]` | 질문 배열 | (아래 참조) |
| `results` | `Result[]` | 결과 배열 | (아래 참조) |
| `createdAt` | `string` | 생성일 (YYYY-MM-DD) | `"2024-01-15"` |

#### Question 객체

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | `string` | ✅ | 질문 고유 ID (예: `"q1"`, `"q2"`) |
| `content` | `string` | ✅ | 질문 내용 |
| `imageUrl` | `string` | ❌ | 질문 이미지 경로 (선택) |
| `options` | `Option[]` | ✅ | 선택지 배열 (최소 2개) |

#### Option 객체

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | `string` | ✅ | 선택지 고유 ID (예: `"q1-a"`, `"q1-b"`) |
| `content` | `string` | ✅ | 선택지 내용 |
| `imageUrl` | `string` | ❌ | 선택지 이미지 경로 (선택) |
| `scores` | `Record<string, number>` | ✅ | 결과 유형별 점수 객체 |

#### Result 객체

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `id` | `string` | ✅ | 결과 고유 ID |
| `type` | `string` | ✅ | 결과 유형 (점수 계산에 사용) |
| `title` | `string` | ✅ | 결과 제목 |
| `description` | `string` | ✅ | 결과 설명 |
| `imageUrl` | `string` | ✅ | 결과 이미지 경로 |
| `minScore` | `number` | ❌ | 최소 점수 (포함) |
| `maxScore` | `number` | ❌ | 최대 점수 (포함) |

### 1.4 점수 계산 로직

점수 계산은 다음과 같이 작동합니다:

1. 사용자가 각 질문에서 선택한 선택지의 `scores` 객체를 확인합니다.
2. 각 결과 유형(`type`)별로 점수를 누적합니다.
3. 최종 점수에 따라 결과를 결정합니다:
   - `minScore`만 있는 경우: 해당 점수 이상이면 해당 결과
   - `maxScore`만 있는 경우: 해당 점수 이하이면 해당 결과
   - 둘 다 있는 경우: `minScore <= 점수 <= maxScore` 범위
   - 둘 다 없는 경우: 점수 범위로 자동 매핑

**중요**: 모든 선택지의 `scores` 객체에 모든 결과 유형(`type`)이 포함되어야 합니다. 누락된 경우 0점으로 처리됩니다.

**예시**:
```json
{
  "id": "q1-a",
  "content": "빨간 버튼",
  "scores": {
    "active": 2,
    "passive": 0,
    "careful": 0
  }
}
```

### 1.5 인덱스 파일 업데이트

새 테스트 파일을 생성한 후, `data/tests/index.ts` 파일에 import를 추가해야 합니다:

```typescript
import yourTestName from "./your-test-name-test.json";
// ... 기존 imports

const tests: Test[] = [
  // ... 기존 테스트들
  yourTestName as Test,
];
```

### 1.6 검증 방법

테스트 파일을 작성한 후 다음을 확인하세요:

1. **타입 검증**: `pnpm build` 실행하여 TypeScript 오류 확인
2. **JSON 유효성**: JSON 파일이 올바른 형식인지 확인
3. **필수 필드**: 모든 필수 필드가 포함되었는지 확인
4. **점수 계산**: 모든 선택지의 `scores`에 모든 결과 유형이 포함되었는지 확인
5. **이미지 경로**: 이미지 경로가 올바른지 확인 (실제 파일 존재 여부는 선택)
6. **실행 테스트**: 개발 서버에서 실제로 테스트가 작동하는지 확인


---

## 2. 기존 테스트 수정 가이드

### 2.1 수정 시 주의사항

기존 테스트를 수정할 때는 다음 사항을 주의하세요:

- **ID 변경 금지**: 테스트 `id`는 변경하지 마세요. 이는 URL과 데이터 무결성에 영향을 줍니다.
- **타입 호환성 유지**: 기존 필드의 타입을 변경하지 마세요.
- **점수 계산 로직 변경 시**: 점수 계산 방식을 변경하면 기존 사용자의 결과에 영향을 줄 수 있습니다.

### 2.2 안전하게 수정 가능한 항목

- 제목, 설명, 태그 등 메타데이터
- 질문 내용 및 선택지 내용 (텍스트만)
- 이미지 경로 (이미지 파일도 함께 업데이트)
- 통계 수치 (playCount, likeCount 등)

### 2.3 주의가 필요한 수정

- **점수 계산 로직 변경**:
  - 모든 결과 유형의 점수 범위를 재검토해야 합니다.
  - 기존 사용자 결과와의 호환성을 고려하세요.
- **질문/선택지 추가/삭제**:
  - 질문 ID 체계를 유지하세요.
  - 선택지 삭제 시 기존 사용자 데이터와의 호환성 문제가 발생할 수 있습니다.

- **결과 유형 변경**:
  - 결과 ID나 타입을 변경하면 기존 결과와 매칭되지 않을 수 있습니다.

### 2.4 이미지 경로 확인

이미지 경로를 변경하거나 추가할 때는:

1. `public/images/` 디렉토리에 실제 이미지 파일이 있는지 확인
2. 경로가 올바른지 확인 (`/images/tests/...`, `/images/results/...`)
3. 이미지 파일명이 JSON의 경로와 일치하는지 확인

---

## 3. Git 워크플로우

### 3.1 브랜치 전략

프로젝트는 **GitFlow** 기반의 브랜치 전략을 사용합니다.

#### 브랜치 타입

- **main**: 프로덕션 배포용 브랜치
- **develop**: 개발 통합 브랜치 (기본 작업 브랜치)
- **feature/**: 새 기능 개발 브랜치
- **fix/**: 버그 수정 브랜치
- **docs/**: 문서 작업 브랜치

#### 브랜치 네이밍 컨벤션

형식: `{type}/{description}[-#issue]`

- `type`: 브랜치 타입 (feat, fix, docs, style, refactor, test, chore)
- `description`: 브랜치 설명 (kebab-case)
- `issue`: 관련 이슈 번호 (선택)

**예시:**

```
feat/add-personality-test
fix/button-click-bug
docs/collaboration-guide
feat/new-test-#123
```

### 3.2 작업 흐름

1. **브랜치 생성**

   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feat/your-feature-name
   ```

2. **작업 및 커밋**
   - 작업을 논리적인 단위로 나누어 커밋
   - 커밋 메시지는 Conventional Commits 형식 준수

3. **푸시 및 PR 생성**

   ```bash
   git push origin feat/your-feature-name
   ```

   - GitHub에서 Pull Request 생성
   - `develop` 브랜치로 PR 생성

4. **코드 리뷰**
   - 최소 1명의 리뷰어 승인 필요
   - 리뷰 코멘트에 대한 수정 사항 반영

5. **병합**
   - 리뷰 승인 후 `develop` 브랜치로 병합
   - 병합 후 브랜치 삭제 (선택)

### 3.3 커밋 메시지 컨벤션

커밋 메시지는 **Conventional Commits** 형식을 따릅니다.

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 작업
- `style`: 코드 스타일 수정 (기능 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드, 설정 등 유지보수 작업

#### 예시

```
feat(test): add personality test template

- Create _template.json with example structure
- Add field descriptions and examples
- Include 3-question sample test

Closes #123
```

```
fix(test): correct score calculation in button-test

- Fix scores mapping for result types
- Update minScore/maxScore ranges

Fixes #456
```

### 3.4 PR 규칙

1. **PR 제목**: 커밋 메시지와 동일한 형식 사용
2. **PR 설명**:
   - 변경 사항 요약
   - 관련 이슈 번호
   - 테스트 방법
3. **체크리스트**:
   - [ ] 타입 검증 통과 (`pnpm build`)
   - [ ] 기능 테스트 완료
   - [ ] 문서 업데이트 (필요시)

---

## 4. 테스트 파일 네이밍 컨벤션

### 4.1 파일명 규칙

- **형식**: `{test-name}-test.json`
- **케이스**: kebab-case (소문자, 하이픈 사용)
- **확장자**: `.json`

### 4.2 예시

```
button-test.json          ✅ 올바름
blood-type-test.json      ✅ 올바름
my-personality-test.json  ✅ 올바름
ButtonTest.json           ❌ 잘못됨 (PascalCase)
button_test.json          ❌ 잘못됨 (snake_case)
buttonTest.json           ❌ 잘못됨 (camelCase)
```

### 4.3 ID 필드와 파일명 일치

테스트 파일의 `id` 필드는 파일명과 일치하는 것을 권장합니다:

- 파일명: `button-test.json`
- ID: `"button-test"`

일치하지 않아도 동작하지만, 일관성을 위해 일치시키는 것을 권장합니다.

---

## 5. 충돌 해결 가이드

### 5.1 `data/tests/index.ts` 충돌

가장 흔한 충돌은 여러 개발자가 동시에 새 테스트를 추가할 때 발생합니다.

#### 충돌 발생 시

```typescript
<<<<<<< HEAD
import newTestA from "./new-test-a.json";
=======
import newTestB from "./new-test-b.json";
>>>>>>> branch-name
```

#### 해결 방법

1. 두 import 모두 유지
2. tests 배열에 두 테스트 모두 추가
3. 알파벳 순서로 정렬 (선택)

```typescript
import newTestA from "./new-test-a.json";
import newTestB from "./new-test-b.json";

const tests: Test[] = [
  // ... 기존 테스트들
  newTestA as Test,
  newTestB as Test,
];
```

### 5.2 JSON 파일 충돌

JSON 파일 자체에서 충돌이 발생한 경우:

1. **자동 병합 가능한 경우**: Git이 자동으로 병합 시도
2. **수동 해결 필요한 경우**:
   - 충돌 마커 확인 (`<<<<<<<`, `=======`, `>>>>>>>`)
   - 두 변경사항을 모두 반영
   - JSON 문법 유효성 확인

#### 예시

```json
{
  "title": "<<<<<<< HEAD
나의 성격 테스트
=======
성격 유형 테스트
>>>>>>> branch-name
```

**해결:**

```json
{
  "title": "나의 성격 유형 테스트"
}
```

### 5.3 병합 후 검증

병합 후 반드시 다음을 확인하세요:

1. **타입 검증**

   ```bash
   pnpm build
   ```

2. **기능 테스트**
   - 충돌이 발생한 테스트가 정상 작동하는지 확인
   - 다른 테스트에 영향이 없는지 확인

3. **JSON 유효성 검사**
   - JSON 문법 오류가 없는지 확인
   - 모든 필수 필드가 있는지 확인

### 5.4 충돌 예방

충돌을 최소화하기 위한 팁:

1. **작은 단위로 작업**: 한 번에 하나의 테스트만 추가/수정
2. **자주 동기화**: `develop` 브랜치를 자주 pull
3. **소통**: 다른 개발자와 작업 범위 공유
4. **빠른 병합**: 작업 완료 후 빠르게 PR 생성 및 병합

---

## 추가 리소스

- 타입 정의: `types/test.ts`
- 템플릿 파일: `data/tests/_template.json`
- Git 컨벤션: `.cursor/rules/common/git-convention.mdc`
- 프로젝트 구조: `docs/PRD.md`

---

## 문의

협업 관련 질문이나 제안사항이 있으면 이슈를 생성하거나 팀에 문의하세요.
