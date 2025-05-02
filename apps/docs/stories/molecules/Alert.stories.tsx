import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Alert, Button } from "@doo/common-ui";

const meta: Meta<typeof Alert> = {
  title: "Components/Molecules/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
      description: "알림의 유형",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "알림의 크기",
    },
    title: {
      control: "text",
      description: "알림의 제목",
    },
    showIcon: {
      control: "boolean",
      description: "아이콘 표시 여부",
    },
    onClose: {
      action: "closed",
      description: "알림이 닫힐 때 호출될 함수",
    },
    fullWidth: {
      control: "boolean",
      description: "전체 너비 설정",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// 기본 알림
export const Default: Story = {
  args: {
    variant: "info",
    size: "md",
    title: "정보",
    children: "이 알림은 중요한 정보를 제공합니다.",
    showIcon: true,
  },
};

// 알림 변형(variants)
export const AlertVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert variant="info" title="정보 알림">
        새로운 퀴즈가 추가되었습니다. 지금 바로 확인해보세요!
      </Alert>
      <Alert variant="success" title="성공 알림">
        퀴즈가 성공적으로 저장되었습니다. 퀴즈 ID: QZ-2025-042501
      </Alert>
      <Alert variant="warning" title="주의 알림">
        배포 전 미리보기를 통해 퀴즈 내용을 반드시 확인해주세요.
      </Alert>
      <Alert variant="error" title="오류 알림">
        퀴즈 저장 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      </Alert>
    </div>
  ),
};

// 알림 크기
export const AlertSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert variant="info" size="sm" title="작은 알림">
        블로그 포스트에 새 댓글이 추가되었습니다.
      </Alert>
      <Alert variant="info" size="md" title="중간 크기 알림">
        MBTI 테스트의 20개 질문 중 15개를 완료했습니다.
      </Alert>
      <Alert variant="info" size="lg" title="큰 알림">
        새로운 백오피스 기능이 업데이트되었습니다. 주요 변경사항을 확인하세요.
      </Alert>
    </div>
  ),
};

// 아이콘 없는 알림
export const WithoutIcon: Story = {
  args: {
    variant: "success",
    title: "아이콘 없는 알림",
    children: "이 알림은 아이콘 없이 표시됩니다.",
    showIcon: false,
  },
};

// 닫기 버튼이 있는 알림
export const WithCloseButton: Story = {
  args: {
    variant: "info",
    title: "닫기 가능한 알림",
    children: "이 알림은 닫기 버튼이 있어 사용자가 닫을 수 있습니다.",
    onClose: () => console.log("알림이 닫혔습니다"),
  },
};

// 작업 버튼이 있는 알림
export const WithAction: Story = {
  args: {
    variant: "warning",
    title: "퀴즈 결과 미저장",
    children: "퀴즈 결과가 저장되지 않았습니다. 지금 저장하시겠습니까?",
    action: (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button variant="outline" size="sm">
          취소
        </Button>
        <Button variant="primary" size="sm">
          저장하기
        </Button>
      </div>
    ),
  },
};

// 전체 너비 알림
export const FullWidth: Story = {
  args: {
    variant: "info",
    title: "전체 너비 알림",
    children: "이 알림은 부모 컨테이너의 전체 너비를 차지합니다.",
    fullWidth: true,
  },
};

// 퀴즈 관련 알림 예제
export const QuizRelatedAlerts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert
        variant="success"
        title="퀴즈 제작 완료"
        onClose={() => console.log("알림 닫힘")}
      >
        MBTI 성격 유형 퀴즈가 성공적으로 제작되었습니다. 이제 퀴즈를 공유하거나
        배포할 수 있습니다.
      </Alert>

      <Alert variant="warning" title="퀴즈 마감 임박">
        "나에게 어울리는 직업 찾기" 퀴즈가 3일 후에 마감됩니다. 퀴즈 기간을
        연장하려면 퀴즈 설정에서 변경하세요.
      </Alert>

      <Alert
        variant="info"
        title="신규 사용자 증가"
        action={
          <Button variant="outline" size="sm">
            통계 보기
          </Button>
        }
      >
        지난 주 대비 퀴즈 참여자가 32% 증가했습니다. 사용자 통계에서 자세한
        내용을 확인하세요.
      </Alert>

      <Alert
        variant="error"
        title="결과 분석 오류"
        action={
          <Button variant="primary" size="sm">
            오류 수정
          </Button>
        }
      >
        MBTI 결과 분석 중 일부 데이터 불일치가 발견되었습니다. 결과 매핑을
        확인해주세요.
      </Alert>
    </div>
  ),
};

// 블로그 관련 알림 예제
export const BlogRelatedAlerts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert variant="info" size="sm" showIcon={false}>
        이 포스트는 최근 7일 동안 가장 많이 읽힌 MBTI 관련 글입니다.
      </Alert>

      <Alert
        variant="success"
        title="블로그 포스트 게시됨"
        onClose={() => console.log("알림 닫힘")}
      >
        "MBTI와 대인관계: 유형별 소통 방식" 포스트가 성공적으로 게시되었습니다.
      </Alert>

      <Alert
        variant="warning"
        title="저장되지 않은 변경사항"
        action={
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="outline" size="sm">
              무시하기
            </Button>
            <Button variant="primary" size="sm">
              저장하기
            </Button>
          </div>
        }
      >
        블로그 포스트 편집 내용이 자동 저장되지 않았습니다. 페이지를 나가기 전에
        변경사항을 저장하세요.
      </Alert>

      <Alert variant="error" title="구독 알림 전송 실패">
        일부 구독자에게 새 포스트 알림 전송이 실패했습니다. 시스템 설정을
        확인해주세요.
      </Alert>
    </div>
  ),
};

// 백오피스 대시보드 알림
export const DashboardAlerts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Alert
        variant="info"
        title="시스템 점검 안내"
        onClose={() => console.log("알림 닫힘")}
      >
        내일 오전 2시부터 4시까지 시스템 점검이 예정되어 있습니다. 점검 시간
        동안 서비스 이용이 제한될 수 있습니다.
      </Alert>

      <Alert variant="success" title="업데이트 완료" showIcon={true}>
        백오피스 시스템이 버전 2.5.3으로 업데이트되었습니다. 새로운 퀴즈 분석
        기능과 개선된 사용자 관리 도구를 확인해보세요.
      </Alert>
    </div>
  ),
};
