## Form 컴포넌트 설계

### 기능 명세

Form 기능 | 바로 쓸 수 있는 컴포넌트 | 비고 & 추가 아이디어
입력 필드 컨테이너 | FormField (molecule) | 라벨·헬프·에러·필수표시를 이미 지원 → 그대로 래핑
실제 입력 UI | Input, Select, Checkbox, Radio, Text 등 (atoms) | FormField 내부에 삽입
필드 묶음·정렬 | InputGroup (molecule) or Flex/Grid 유틸 클래스 | 날짜 + 시간 같이 붙이는 경우
전송 버튼 | Button (atom) | variant=primary, size 설정
서브 액션 | IconButton (atom) | 예: “새로고침”, “도움말”
상태 표시 | Spinner (atom) | 전송 중 로딩 인디케이터
알림/피드백 | Toast (molecule) | 성공·실패 메시지 일괄 처리
모달 내부 폼 | Modal (molecule) + 위 구성품 | “ModalWizard” 확장도 가능
유효성 메시지 박스 | Alert (molecule) | 폼 상단에 전체 오류 모아 보여주기
분할 섹션 | Card (atom) or CSS Section | 긴 폼을 구간별로 구분

### 참고할 컴포넌트

cat packages/common-ui/src/token/typography.ts
cat packages/common-ui/src/scss/\_variables.scss
cat packages/common-ui/src/components/molecules/InputGroup.tsx
cat packages/common-ui/src/components/molecules/InputGroup.module.scss
cat packages/common-ui/src/components/molecules/InfoBox.tsx
cat packages/common-ui/src/components/molecules/InfoBox.module.scss
cat packages/common-ui/src/components/organisms/DataTable/DataTable.tsx
cat packages/common-ui/src/index.ts
