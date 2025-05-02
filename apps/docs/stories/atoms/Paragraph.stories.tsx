import type { Meta, StoryObj } from "@storybook/react";
import { Paragraph } from "@doo/common-ui";

const meta: Meta<typeof Paragraph> = {
  title: "Components/Atoms/Paragraph",
  component: Paragraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "base", "lg", "xl"],
      description: "텍스트 크기",
    },
    weight: {
      control: { type: "select" },
      options: ["light", "normal", "medium", "semibold", "bold"],
      description: "폰트 굵기",
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right", "justify"],
      description: "텍스트 정렬",
      
    },
    color: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "muted"],
      description: "텍스트 색상",
    },
    lineHeight: {
      control: { type: "select" },
      options: ["tight", "normal", "relaxed", "loose"],
      description: "줄 간격",
    },
    gutterBottom: {
      control: "boolean",
      description: "하단 마진 추가 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

// 퀴즈 소개 텍스트
const quizIntroText = `DooMBTI는 사용자의 성격 유형을 분석하여 16가지 MBTI 유형 중 하나로 분류합니다. 총 24개의 질문에 답하면 당신의 성격 유형과 함께 직업 추천, 성격 특성, 대인관계 팁 등을 알려드립니다. 이 테스트는 약 5분 정도 소요되며, 가능한 솔직하게 답변해 주시기 바랍니다.`;

// 블로그 포스트 텍스트
const blogPostText = `MBTI는 Myers-Briggs Type Indicator의 약자로, 개인의 성격 유형을 16가지로 분류하는 심리 검사입니다. 에너지 방향(외향형/내향형), 인식 기능(감각형/직관형), 판단 기능(사고형/감정형), 생활 양식(판단형/인식형)의 4가지 척도로 구성되어 있습니다. 최근 젊은 세대를 중심으로 자기 이해와 대인 관계 개선을 위한 도구로 큰 인기를 얻고 있습니다.`;

export const Default: Story = {
  args: {
    children: quizIntroText,
  },
};

export const Sizes: Story = {
  render: () => (
    <div>
      <Paragraph size="xl">퀴즈 제목 (xl): MBTI 성격 유형 테스트</Paragraph>
      <Paragraph size="lg">
        퀴즈 부제목 (lg): 당신의 진짜 성격 유형을 찾아보세요
      </Paragraph>
      <Paragraph size="base">
        퀴즈 설명 (base): {quizIntroText.substring(0, 100)}...
      </Paragraph>
      <Paragraph size="sm">
        추가 정보 (sm): 전문가가 검증한 심리학 기반 테스트입니다.
      </Paragraph>
      <Paragraph size="xs">
        주의사항 (xs): 본 테스트는 전문적인 심리 상담을 대체할 수 없습니다.
      </Paragraph>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div>
      <Paragraph weight="bold">
        테스트 결과 (bold): 당신은 INTJ 유형입니다!
      </Paragraph>
      <Paragraph weight="semibold">
        유형 별명 (semibold): "용의주도한 전략가"
      </Paragraph>
      <Paragraph weight="medium">
        유형 특징 (medium): 분석적이고 논리적이며 독립적인 성향을 가지고
        있습니다.
      </Paragraph>
      <Paragraph weight="normal">
        상세 설명 (normal): {blogPostText.substring(0, 100)}...
      </Paragraph>
      <Paragraph weight="light">
        부가 설명 (light): 모든 MBTI 유형은 각자의 강점과 약점을 가지고
        있습니다.
      </Paragraph>
    </div>
  ),
};

export const LineHeights: Story = {
  render: () => (
    <div>
      <Paragraph lineHeight="tight">
        질문 텍스트 (tight): 익숙하지 않은 상황에서 당신은 어떻게 행동하나요?
        새로운 사람들을 만나는 자리에서 당신은 먼저 대화를 시작하는 편인가요,
        아니면 다른 사람이 말을 걸어오기를 기다리나요?
      </Paragraph>
      <Paragraph lineHeight="normal">
        블로그 본문 (normal): {blogPostText}
      </Paragraph>
      <Paragraph lineHeight="relaxed">
        퀴즈 설명 (relaxed): {quizIntroText}
      </Paragraph>
      <Paragraph lineHeight="loose">
        결과 요약 (loose): MBTI는 단순한 성격 분류를 넘어 자기 이해와 타인과의
        소통 방식을 개선하는 데 도움을 줄 수 있습니다. 하지만 이는 절대적인 것이
        아니며, 사람의 성격은 다양한 요소에 의해 영향받고 시간에 따라 변할 수
        있다는 점을 기억해주세요.
      </Paragraph>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div>
      <Paragraph color="default">
        일반 텍스트 (default): 퀴즈 결과는 종료 후 이메일로 받아볼 수 있습니다.
      </Paragraph>
      <Paragraph color="primary">
        중요 안내 (primary): 모든 질문에 답변해야 정확한 결과를 얻을 수
        있습니다.
      </Paragraph>
      <Paragraph color="secondary">
        부가 정보 (secondary): 응답한 데이터는 통계 목적으로만 사용됩니다.
      </Paragraph>
      <Paragraph color="muted">
        미세 정보 (muted): 테스트는 약 5분 정도 소요됩니다.
      </Paragraph>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div>
      <Paragraph align="left">퀴즈 설명 (left): {quizIntroText}</Paragraph>
      <Paragraph align="center">
        퀴즈 결과 제목 (center): INTJ - 용의주도한 전략가
      </Paragraph>
      <Paragraph align="right">
        퀴즈 저작권 (right): © 2025 DooMBTI. All rights reserved.
      </Paragraph>
      <Paragraph align="justify">
        블로그 본문 (justify): {blogPostText}
      </Paragraph>
    </div>
  ),
};

export const WithoutGutterBottom: Story = {
  args: {
    children:
      "이 텍스트는 하단 마진이 없습니다. 퀴즈 결과 페이지의 연속된 단락에 유용합니다.",
    gutterBottom: false,
  },
};

export const QuizInstructions: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <Paragraph size="lg" weight="semibold" color="primary">
        퀴즈 참여 방법
      </Paragraph>
      <Paragraph>
        1. 총 24개의 질문에 솔직하게 답변하세요. 정답은 없으니 가장 자신과
        가까운 선택지를 고르면 됩니다.
      </Paragraph>
      <Paragraph>
        2. 모든 질문에 답변해야 정확한 결과를 얻을 수 있습니다. 중간에 테스트를
        중단하면 진행 상황이 저장되지 않습니다.
      </Paragraph>
      <Paragraph>
        3. 결과 페이지에서 자신의 MBTI 유형과 함께 상세한 분석 결과를 확인할 수
        있습니다.
      </Paragraph>
      <Paragraph size="sm" color="muted">
        참고: 본 테스트는 재미 요소가 포함된 비공식 MBTI 테스트입니다. 정확한
        성격 평가를 원하신다면 전문가와 상담하시기 바랍니다.
      </Paragraph>
    </div>
  ),
};

export const BlogPost: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <Paragraph size="xl" weight="bold">
        MBTI와 직업 선택: 당신의 성격 유형에 맞는 직업 찾기
      </Paragraph>
      <Paragraph size="sm" color="secondary">
        작성자: 김도움 | 발행일: 2025년 4월 23일 | 카테고리: 심리학, 커리어
      </Paragraph>
      <Paragraph>
        MBTI 성격 유형은 직업 선택에 있어 중요한 참고 사항이 될 수 있습니다.
        자신의 성격 유형에 맞는 직업을 선택하면 일의 만족도와 성취감이 높아질 수
        있기 때문입니다.
      </Paragraph>
      <Paragraph>
        예를 들어, INTJ 유형은 분석적 사고와 전략적 계획을 세우는 능력이 뛰어나
        연구원, 엔지니어, 프로그래머 등의 직업에 적합할 수 있습니다. 반면 ESFJ
        유형은 대인관계와 협업 능력이 뛰어나 상담사, 교사, 의료 서비스 등의
        직업에서 강점을 발휘할 수 있습니다.
      </Paragraph>
      <Paragraph weight="medium" color="primary">
        성격 유형별 추천 직업
      </Paragraph>
      <Paragraph size="sm" color="muted">
        이 블로그의 내용은 참고용이며, 개인의 적성과 상황에 따라 다를 수
        있습니다.
      </Paragraph>
    </div>
  ),
};

export const QuizResult: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <Paragraph size="xl" weight="bold" color="primary" align="center">
        당신의 결과: INFJ
      </Paragraph>
      <Paragraph size="lg" weight="semibold" align="center">
        "선의의 옹호자"
      </Paragraph>
      <Paragraph align="center" color="secondary">
        전체 참여자 중 상위 3%에 해당하는 희귀한 유형입니다
      </Paragraph>
      <Paragraph>
        INFJ는 조용하고 신비로우면서도 사람들에게 영감을 주는 이상주의적인
        성격입니다. 높은 원칙과 도덕성을 갖고 있으며, 명확한 비전과 신념에 따라
        행동합니다. 다른 사람의 감정과 필요에 민감하며 공감 능력이 뛰어납니다.
      </Paragraph>
      <Paragraph weight="medium">당신의 강점:</Paragraph>
      <Paragraph>
        • 통찰력과 직관력이 뛰어남 • 창의적이고 독창적인 문제 해결 능력 • 깊은
        공감 능력과 경청 태도 • 강한 개인적 신념과 가치관
      </Paragraph>
      <Paragraph size="sm" color="muted">
        결과를 친구들과 공유하거나 다른 테스트도 참여해보세요!
      </Paragraph>
    </div>
  ),
};
