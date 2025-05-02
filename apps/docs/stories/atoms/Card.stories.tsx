import type { Meta, StoryObj } from "@storybook/react";
import { Card, Button, Text, Badge, Icon } from "@doo/common-ui";

const meta: Meta<typeof Card> = {
  title: "Components/Atoms/Card",
  component: Card,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: "text",
      description: "카드 제목",
    },
    headerActions: {
      description: "제목 오른쪽에 표시될 액션 버튼이나 아이콘",
    },
    footer: {
      description: "카드 하단에 표시될 푸터 컨텐츠",
    },
    padded: {
      control: "boolean",
      description: "카드 패딩 사용 여부",
    },
    shadow: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
      description: "그림자 크기",
    },
    borderRadius: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg", "xl"],
      description: "테두리 반경 크기",
    },
    clickable: {
      control: "boolean",
      description: "전체 카드를 클릭 가능하게 만들지 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: "기본 카드",
    children: "카드 내용을 여기에 표시합니다.",
  },
};

export const WithHeaderActions: Story = {
  args: {
    title: "퀴즈 통계 정보",
    headerActions: (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button variant="outline" size="sm">
          새로고침
        </Button>
        <Button variant="primary" size="sm">
          내보내기
        </Button>
      </div>
    ),
    children: (
      <div
        style={{
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        여기에 통계 그래프가 표시됩니다
      </div>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    title: "인기 블로그 포스트",
    children: (
      <div style={{ padding: "10px 0" }}>
        <div style={{ marginBottom: "16px" }}>
          <Text weight="semibold">
            MBTI와 직업 선택: 당신의 성격 유형에 맞는 직업 찾기
          </Text>
          <Text size="sm" color="secondary">
            조회수: 4,582 | 댓글: 32
          </Text>
        </div>
        <div style={{ marginBottom: "16px" }}>
          <Text weight="semibold">성격 유형별 스트레스 대처 방법</Text>
          <Text size="sm" color="secondary">
            조회수: 3,249 | 댓글: 18
          </Text>
        </div>
        <div>
          <Text weight="semibold">MBTI 유형의 과학적 근거는?</Text>
          <Text size="sm" color="secondary">
            조회수: 2,871 | 댓글: 47
          </Text>
        </div>
      </div>
    ),
    footer: (
      <Button variant="primary" size="sm">
        모든 포스트 보기
      </Button>
    ),
  },
};

export const DifferentShadows: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card title="그림자 없음" shadow="none" style={{ width: "200px" }}>
        테두리만 있는 카드입니다.
      </Card>

      <Card title="작은 그림자" shadow="sm" style={{ width: "200px" }}>
        작은 그림자가 있는 카드입니다.
      </Card>

      <Card title="중간 그림자" shadow="md" style={{ width: "200px" }}>
        기본 그림자 크기의 카드입니다.
      </Card>

      <Card title="큰 그림자" shadow="lg" style={{ width: "200px" }}>
        큰 그림자가 있는 카드입니다.
      </Card>
    </div>
  ),
};

export const BorderRadiusVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card title="모서리 없음" borderRadius="none" style={{ width: "200px" }}>
        각진 모서리를 가진 카드입니다.
      </Card>

      <Card title="작은 모서리" borderRadius="sm" style={{ width: "200px" }}>
        약간 둥근 모서리를 가진 카드입니다.
      </Card>

      <Card title="중간 모서리" borderRadius="md" style={{ width: "200px" }}>
        중간 정도 둥근 모서리를 가진 카드입니다.
      </Card>

      <Card title="큰 모서리" borderRadius="lg" style={{ width: "200px" }}>
        많이 둥근 모서리를 가진 카드입니다.
      </Card>

      <Card title="매우 큰 모서리" borderRadius="xl" style={{ width: "200px" }}>
        아주 둥근 모서리를 가진 카드입니다.
      </Card>
    </div>
  ),
};

export const NoPadding: Story = {
  args: {
    title: "패딩 없는 카드",
    padded: false,
    children: (
      <img
        src="https://i.pravatar.cc/300?img=2"
        alt="이미지 예시"
        style={{ width: "300px", display: "block" }}
      />
    ),
  },
};

export const Clickable: Story = {
  args: {
    title: "클릭 가능한 카드",
    children: "이 카드는 전체가 클릭 가능합니다. 클릭해보세요!",
    clickable: true,
    onClick: () => alert("카드가 클릭되었습니다!"),
  },
};

export const QuizStatusCards: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card
        title="활성 퀴즈"
        shadow="sm"
        style={{ width: "300px" }}
        headerActions={<Badge variant="success">23개</Badge>}
      >
        <div style={{ padding: "10px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Text>MBTI 성격 테스트</Text>
            <Badge variant="primary">인기</Badge>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Text>연애 유형 테스트</Text>
            <Badge variant="primary">신규</Badge>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>직업 적성 검사</Text>
            <Badge variant="warning">수정 중</Badge>
          </div>
        </div>
      </Card>

      <Card
        title="완료된 퀴즈"
        shadow="sm"
        style={{ width: "300px" }}
        headerActions={<Badge variant="warning">8개</Badge>}
      >
        <div style={{ padding: "10px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Text>고전 문학 퀴즈</Text>
            <Text size="sm" color="secondary">
              2025/03/15
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Text>영화 취향 테스트</Text>
            <Text size="sm" color="secondary">
              2025/02/28
            </Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>빈티지 패션 테스트</Text>
            <Text size="sm" color="secondary">
              2025/01/10
            </Text>
          </div>
        </div>
      </Card>

      <Card
        title="임시 저장"
        shadow="sm"
        style={{ width: "300px" }}
        headerActions={<Badge variant="primary">4개</Badge>}
      >
        <div style={{ padding: "10px 0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Text>음식 취향 테스트</Text>
            <Text size="sm" color="secondary">
              15분 전
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <Text>해외여행 스타일 테스트</Text>
            <Text size="sm" color="secondary">
              3시간 전
            </Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>독서 취향 분석</Text>
            <Text size="sm" color="secondary">
              어제
            </Text>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const QuizDetailCard: Story = {
  render: () => (
    <Card
      title="MBTI 성격 유형 테스트"
      headerActions={
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="outline" size="sm">
            편집
          </Button>
          <Button variant="primary" size="sm">
            미리보기
          </Button>
        </div>
      }
      footer={
        <div style={{ display: "flex", gap: "8px" }}>
          <Button variant="outline">통계 보기</Button>
          <Button variant="outline">결과 관리</Button>
          <Button
            variant="outline"
            style={{ marginLeft: "auto", color: "red" }}
          >
            삭제
          </Button>
        </div>
      }
      style={{ maxWidth: "800px" }}
    >
      <div style={{ padding: "16px 0" }}>
        <div style={{ display: "flex", gap: "24px", marginBottom: "16px" }}>
          <div>
            <Text size="sm" color="secondary">
              생성일
            </Text>
            <Text>2025년 2월 15일</Text>
          </div>
          <div>
            <Text size="sm" color="secondary">
              마지막 수정일
            </Text>
            <Text>2025년 4월 3일</Text>
          </div>
          <div>
            <Text size="sm" color="secondary">
              상태
            </Text>
            <Badge variant="success">활성</Badge>
          </div>
          <div>
            <Text size="sm" color="secondary">
              공개 여부
            </Text>
            <Badge variant="primary">공개</Badge>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <Text size="sm" color="secondary">
            설명
          </Text>
          <Text>
            사용자의 성격 유형을 분석하여 16가지 MBTI 유형 중 하나로 분류합니다.
            총 24개의 질문에 답하면 성격 유형과 함께 직업 추천, 성격 특성,
            대인관계 팁 등을 제공합니다.
          </Text>
        </div>

        <div>
          <Text size="sm" color="secondary">
            퀴즈 통계
          </Text>
          <div style={{ display: "flex", gap: "24px", marginTop: "8px" }}>
            <div style={{ textAlign: "center" }}>
              <Text size="lg" weight="bold">
                12,487
              </Text>
              <Text size="sm">총 참여자</Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="lg" weight="bold">
                4.8/5
              </Text>
              <Text size="sm">평균 평점</Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="lg" weight="bold">
                89%
              </Text>
              <Text size="sm">완료율</Text>
            </div>
            <div style={{ textAlign: "center" }}>
              <Text size="lg" weight="bold">
                287
              </Text>
              <Text size="sm">공유 횟수</Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  ),
};

export const BlogDashboardCards: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card
        title="인기 글"
        headerActions={
          <Button variant="primary" size="sm">
            모두 보기
          </Button>
        }
        style={{ width: "300px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "8px 0",
          }}
        >
          <div>
            <Text weight="semibold">MBTI와 직업 선택</Text>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text size="sm" color="secondary">
                조회수 4,582
              </Text>
              <Badge variant="success">↑ 12%</Badge>
            </div>
          </div>
          <div>
            <Text weight="semibold">성격 유형별 스트레스 대처법</Text>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text size="sm" color="secondary">
                조회수 3,249
              </Text>
              <Badge variant="success">↑ 8%</Badge>
            </div>
          </div>
          <div>
            <Text weight="semibold">MBTI 유형의 과학적 근거</Text>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text size="sm" color="secondary">
                조회수 2,871
              </Text>
              <Badge variant="error">↓ 3%</Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card
        title="댓글 활동"
        headerActions={
          <Button variant="primary" size="sm">
            모두 보기
          </Button>
        }
        style={{ width: "300px" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "8px 0",
          }}
        >
          <div>
            <Text size="sm" weight="semibold">
              김도움
            </Text>
            <Text size="sm" color="secondary">
              MBTI와 직업 선택 글에 댓글을 남겼습니다.
            </Text>
            <Text size="xs" color="secondary">
              5분 전
            </Text>
          </div>
          <div>
            <Text size="sm" weight="semibold">
              이유형
            </Text>
            <Text size="sm" color="secondary">
              성격 유형별 스트레스 대처법 글에 댓글을 남겼습니다.
            </Text>
            <Text size="xs" color="secondary">
              23분 전
            </Text>
          </div>
          <div>
            <Text size="sm" weight="semibold">
              박지성
            </Text>
            <Text size="sm" color="secondary">
              MBTI 유형의 과학적 근거 글에 댓글을 남겼습니다.
            </Text>
            <Text size="xs" color="secondary">
              1시간 전
            </Text>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const QuizResultCard: Story = {
  render: () => (
    <Card padded={false} shadow="sm" style={{ maxWidth: "400px" }}>
      <div
        style={{
          height: "150px",
          background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        MBTI 퀴즈 결과
      </div>
      <div style={{ padding: "16px" }}>
        <Text size="lg" weight="semibold" style={{ marginBottom: "8px" }}>
          ENFJ - "정의로운 사회운동가"
        </Text>
        <Text>
          따뜻하고 적극적이며 책임감이 강하고 사교성이 높은 ENFJ는 타인의 성장과
          발전에 진심으로 관심을 기울이며, 사람들이 잠재력을 발휘할 수 있도록
          돕는 타고난 리더입니다.
        </Text>
      </div>
      <div
        style={{
          padding: "16px",
          background: "#F9FAFB",
          borderTop: "1px solid #E5E7EB",
        }}
      >
        <Text size="sm" weight="medium" style={{ marginBottom: "8px" }}>
          추천 직업
        </Text>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <Badge>상담사</Badge>
          <Badge>교사</Badge>
          <Badge>인사 관리자</Badge>
          <Badge>마케팅 책임자</Badge>
          <Badge>홍보 전문가</Badge>
        </div>
      </div>
    </Card>
  ),
};

export const QuizEventCards: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Card
        title="봄맞이 MBTI 이벤트"
        shadow="sm"
        style={{ width: "250px" }}
        clickable
        onClick={() => alert("봄맞이 MBTI 이벤트 상세 페이지로 이동합니다.")}
      >
        <Text size="sm" color="secondary">
          2025.03.15 ~ 2025.04.30
        </Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <Badge variant="success">진행 중</Badge>
          <Text size="sm">참여자: 2,845명</Text>
        </div>
      </Card>

      <Card
        title="취업 준비생 성격 분석"
        shadow="sm"
        style={{ width: "250px" }}
        clickable
        onClick={() => alert("취업 준비생 성격 분석 상세 페이지로 이동합니다.")}
      >
        <Text size="sm" color="secondary">
          2025.04.01 ~ 2025.05.15
        </Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <Badge variant="success">진행 중</Badge>
          <Text size="sm">참여자: 1,247명</Text>
        </div>
      </Card>

      <Card
        title="여름 방학 특집 퀴즈"
        shadow="sm"
        style={{ width: "250px" }}
        clickable
        onClick={() => alert("여름 방학 특집 퀴즈 상세 페이지로 이동합니다.")}
      >
        <Text size="sm" color="secondary">
          2025.06.01 ~ 2025.07.31
        </Text>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <Badge variant="warning">준비 중</Badge>
          <Text size="sm">D-37</Text>
        </div>
      </Card>
    </div>
  ),
};
