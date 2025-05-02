import type { Meta, StoryObj } from "@storybook/react";
import { InfoBox, Button, Icon } from "@doo/common-ui";

const meta: Meta<typeof InfoBox> = {
  title: "Components/Molecules/InfoBox",
  component: InfoBox,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error", "neutral"],
      description: "인포박스 유형",
    },
    title: {
      control: "text",
      description: "인포박스 제목",
    },
    showIcon: {
      control: "boolean",
      description: "아이콘 표시 여부",
    },
    closable: {
      control: "boolean",
      description: "닫기 버튼 표시 여부",
    },
    fullWidth: {
      control: "boolean",
      description: "전체 너비 사용 여부",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "인포박스 크기",
    },
    bordered: {
      control: "boolean",
      description: "테두리 표시 여부",
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right"],
      description: "내용 정렬 방식",
    },
    compact: {
      control: "boolean",
      description: "압축된 형태로 표시",
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoBox>;

export const Default: Story = {
  args: {
    variant: "info",
    title: "정보",
    children: "퀴즈 작성에 대한 기본적인 안내 정보입니다.",
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <InfoBox variant="info" title="퀴즈 생성 안내">
        퀴즈 생성 시에는 최소 10개 이상의 질문을 포함하는 것이 좋습니다. 질문은
        명확하고 이해하기 쉽게 작성해주세요.
      </InfoBox>

      <InfoBox variant="success" title="퀴즈 저장 완료">
        퀴즈가 성공적으로 저장되었습니다. 퀴즈 관리 페이지에서 확인하실 수
        있습니다.
      </InfoBox>

      <InfoBox variant="warning" title="공개 설정 확인">
        이 퀴즈는 현재 비공개 상태입니다. 공개 전에 모든 질문과 결과를
        검토해주세요.
      </InfoBox>

      <InfoBox variant="error" title="저장 실패">
        퀴즈 저장 중 오류가 발생했습니다. 모든 필수 항목을 입력했는지 확인하시고
        다시 시도해주세요.
      </InfoBox>

      <InfoBox variant="neutral" title="팁">
        문항 순서는 드래그 앤 드롭으로 변경할 수 있습니다. 퀴즈 결과는 최대
        16개까지 추가할 수 있습니다.
      </InfoBox>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <InfoBox variant="info" title="작은 사이즈" size="sm">
        간단한 정보나 팁을 표시할 때 사용합니다.
      </InfoBox>

      <InfoBox variant="info" title="중간 사이즈" size="md">
        일반적인, 보통 길이의 정보를 표시할 때 사용합니다. 대부분의 상황에
        적합합니다.
      </InfoBox>

      <InfoBox variant="info" title="큰 사이즈" size="lg">
        중요하거나 상세한 정보를 표시할 때 사용합니다. 여러 줄의 설명이나 지침이
        필요한 경우에 적합합니다.
      </InfoBox>
    </div>
  ),
};

export const WithoutIcon: Story = {
  args: {
    variant: "info",
    title: "아이콘 없는 정보 박스",
    children:
      "아이콘이 필요 없는 경우에 사용합니다. 텍스트만으로 정보를 표시합니다.",
    showIcon: false,
  },
};

export const WithActions: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <InfoBox
        variant="warning"
        title="퀴즈 삭제 예정"
        actions={
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="outline">취소</Button>
            <Button variant="primary">연장하기</Button>
          </div>
        }
      >
        "MBTI 성격 테스트" 퀴즈가 30일 이상 업데이트되지 않아 7일 후 자동으로
        보관 처리될 예정입니다. 퀴즈를 계속 활성 상태로 유지하려면 연장하기를
        클릭하세요.
      </InfoBox>
    </div>
  ),
};

export const Closable: Story = {
  args: {
    variant: "success",
    title: "블로그 포스트 발행 완료",
    children:
      "블로그 포스트가 성공적으로 발행되었습니다. 대시보드에서 확인하실 수 있습니다.",
    closable: true,
    onClose: () => console.log("InfoBox closed"),
  },
};

export const Alignment: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        maxWidth: "600px",
      }}
    >
      <InfoBox variant="info" title="왼쪽 정렬" align="left">
        왼쪽 정렬된 내용입니다. 가장 일반적으로 사용되는 정렬 방식입니다.
      </InfoBox>

      <InfoBox variant="info" title="가운데 정렬" align="center">
        가운데 정렬된 내용입니다. 특별히 강조하고 싶은 정보에 사용합니다.
      </InfoBox>

      <InfoBox variant="info" title="오른쪽 정렬" align="right">
        오른쪽 정렬된 내용입니다. 특수한 경우에 사용합니다.
      </InfoBox>
    </div>
  ),
};

export const Compact: Story = {
  args: {
    variant: "info",
    title: "압축 모드",
    children:
      "공간을 효율적으로 사용해야 하는 경우 압축 모드를 활용합니다. 패딩이 줄어들어 더 콤팩트한 디자인이 적용됩니다.",
    compact: true,
  },
};

export const WithoutBorder: Story = {
  args: {
    variant: "neutral",
    title: "테두리 없는 정보 박스",
    children:
      "테두리 없이 배경색만으로 구분되는 심플한 디자인입니다. 미니멀한 UI에 적합합니다.",
    bordered: false,
  },
};

export const QuizCreationTips: Story = {
  render: () => (
    <div style={{ maxWidth: "700px" }}>
      <InfoBox variant="info" title="효과적인 퀴즈 만들기 팁" size="lg">
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <p style={{ margin: 0 }}>
            퀴즈 제작 시 다음 사항을 고려하면 더 높은 참여율과 만족도를 얻을 수
            있습니다:
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>명확하고 간결한 질문 작성하기</li>
            <li>균형 잡힌 난이도 유지하기</li>
            <li>다양한 유형의 질문 포함하기</li>
            <li>흥미로운 결과 페이지 디자인하기</li>
            <li>공유하기 쉬운 결과 이미지 제공하기</li>
          </ul>
        </div>
      </InfoBox>
    </div>
  ),
};

export const ResultPublishWarning: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <InfoBox
        variant="warning"
        title="결과 공개 전 확인사항"
        actions={
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="outline">돌아가기</Button>
            <Button variant="primary">결과 공개하기</Button>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ margin: 0 }}>
            퀴즈 결과를 공개하기 전에 다음 사항을 확인해주세요:
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>모든 결과 텍스트에 오탈자가 없는지 확인</li>
            <li>결과 이미지가 모든 디바이스에서 올바르게 표시되는지 확인</li>
            <li>모든 결과 유형이 적절하게 연결되어 있는지 확인</li>
          </ul>
          <p style={{ margin: "8px 0 0 0" }}>
            한번 공개된 결과는 사용자들에게 즉시 표시되므로 신중하게
            확인해주세요.
          </p>
        </div>
      </InfoBox>
    </div>
  ),
};

export const BlogPostDraftSaved: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <InfoBox
        variant="success"
        title="블로그 포스트 임시저장 완료"
        showIcon={true}
        closable={true}
        size="sm"
        compact={true}
        actions={
          <Button variant="primary" size="sm">
            임시저장 목록 보기
          </Button>
        }
      >
        작성 중인 블로그 포스트가 자동으로 임시저장되었습니다. 나중에 이어서
        작성할 수 있습니다.
      </InfoBox>
    </div>
  ),
};

export const DataBackupReminder: Story = {
  render: () => (
    <div style={{ maxWidth: "700px" }}>
      <InfoBox
        variant="neutral"
        title="정기 데이터 백업 안내"
        actions={
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="outline">다음에 하기</Button>
            <Button variant="primary">지금 백업하기</Button>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ margin: 0 }}>
            마지막 퀴즈 데이터 백업 이후 30일이 경과했습니다. 데이터 손실을
            방지하기 위해 정기적인 백업을 권장합니다.
          </p>
          <p style={{ margin: 0 }}>백업에는 다음 항목이 포함됩니다:</p>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>모든 퀴즈 질문 및 결과</li>
            <li>블로그 포스트 및 댓글</li>
            <li>사용자 참여 통계</li>
          </ul>
        </div>
      </InfoBox>
    </div>
  ),
};

export const QuizValidationError: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <InfoBox variant="error" title="퀴즈 저장 실패">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ margin: 0 }}>
            다음 오류로 인해 퀴즈를 저장할 수 없습니다:
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>질문 3번: 선택지가 2개 이상 필요합니다.</li>
            <li>질문 7번: 질문 내용이 입력되지 않았습니다.</li>
            <li>결과 페이지: 최소 1개의 결과가 필요합니다.</li>
          </ul>
          <p style={{ margin: "8px 0 0 0" }}>
            위 문제를 해결한 후 다시 시도해주세요.
          </p>
        </div>
      </InfoBox>
    </div>
  ),
};

export const MaintenanceNotice: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <InfoBox variant="info" title="시스템 점검 안내" align="center">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>2025년 5월 1일 오전 2시 ~ 5시</strong> 동안 시스템 정기
            점검이 예정되어 있습니다.
          </p>
          <p style={{ margin: 0 }}>
            점검 시간 동안에는 사이트 접속 및 퀴즈 참여가 일시적으로 제한될 수
            있습니다.
          </p>
          <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#666" }}>
            작업 중인 내용은 미리 저장해주시기 바랍니다.
          </p>
        </div>
      </InfoBox>
    </div>
  ),
};

export const NewFeatureAnnouncement: Story = {
  render: () => (
    <div style={{ maxWidth: "700px" }}>
      <InfoBox
        variant="info"
        title="새로운 기능 안내: 퀴즈 템플릿 기능 추가"
        actions={
          <div style={{ display: "flex", gap: "8px" }}>
            <Button variant="outline">나중에 보기</Button>
            <Button variant="primary">지금 사용해보기</Button>
          </div>
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p style={{ margin: 0 }}>
            이제 자주 사용하는 퀴즈 형식을 템플릿으로 저장하고 재사용할 수
            있습니다!
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>자주 사용하는 질문 형식 저장</li>
            <li>결과 페이지 레이아웃 템플릿 관리</li>
            <li>팀원들과 템플릿 공유</li>
            <li>퀴즈 제작 시간 단축</li>
          </ul>
          <p style={{ margin: "8px 0 0 0" }}>
            <a href="#" style={{ color: "#1890ff", textDecoration: "none" }}>
              템플릿 기능 가이드 보기 →
            </a>
          </p>
        </div>
      </InfoBox>
    </div>
  ),
};
