## 프롬프트 1

# 아래 정보를 기반으로 Organisms에 DataTable 컴포넌트를 만들어줘

# 코드 제공 전에 한번에 touch 명령어로 만들 수 있도록 touch로 파일 먼저 생성해줘

# 현재 프로젝트에서 Tree 및, 컴포넌트 작성 시 유의점을 확인하고, 만약 더 필요한 정보나 참고해야 할 정보가 있다면 코드 작성 전에 내게 필요한 정보를 물어봐줘

cat packages/common-ui/src/token/typography.ts
cat packages/common-ui/src/scss/\_variables.scss
cat packages/common-ui/src/components/molecules/InputGroup.tsx
cat packages/common-ui/src/components/molecules/InputGroup.module.scss
cat packages/common-ui/src/components/molecules/InfoBox.tsx
cat packages/common-ui/src/components/molecules/InfoBox.module.scss
cat packages/common-ui/src/index.ts

## 프롬프트 2

# 테스트를 위해 블로그나 퀴즈 관리 시스템과 관련된 창의적인 예시가 포함된 stories도 만들어줘

# 아래에 현재 프로젝트에서 Tree 및, 컴포넌트 작성 시 유의점을 확인하고, 만약 더 필요한 정보나 참고해야 할 정보가 있다면 코드 작성 전에 내게 필요한 정보를 물어봐줘

cat apps/docs/stories/atoms/Paragraph.stories.tsx
cat apps/docs/stories/molecules/InputGroup.stories.tsx
cat apps/docs/stories/molecules/Modal.stories.tsx

## example

touch packages/common-ui/src/components/organisms/DataTable/index.ts
touch packages/common-ui/src/components/organisms/DataTable/DataTable.tsx
touch packages/common-ui/src/components/organisms/DataTable/DataTable.module.scss
touch packages/common-ui/src/components/organisms/DataTable/types.ts

DataTable에 필요한 주요 기능은 무엇인가요? (정렬, 필터링, 페이지네이션, 행 선택 등)

- 정렬, 필터링, 페이지네이션(Pagination 컴포넌트 사용), 행 선택 기능이 필요합니다.

데이터 소스는 어떤 형태인가요? (객체 배열, API 연동 등)

- 데이터소스는

성능 최적화가 필요한가요? (대용량 데이터 처리 등)
테이블 스타일 관련 요구사항이 있나요? (열 너비 조정, 테마 등)
백오피스 템플릿에 맞춘 특별한 UI 요소가 필요한가요?
