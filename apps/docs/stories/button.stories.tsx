import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@doo/common-ui";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Components/Button",
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary", "danger", "ghost"],
      description: "버튼의 스타일 변형",
      defaultValue: "primary",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "버튼의 크기",
      defaultValue: "md",
    },
    disabled: {
      control: { type: "boolean" },
      description: "버튼의 비활성화 상태",
    },
    loading: {
      control: { type: "boolean" },
      description: "버튼의 로딩 상태",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "전체 너비 적용 여부",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "기본 버튼",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "보조 버튼",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "삼차 버튼",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "위험 버튼",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "고스트 버튼",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
      <Button leftIcon={<span>👤</span>}>좌측 아이콘</Button>
      <Button rightIcon={<span>→</span>}>우측 아이콘</Button>
      <Button leftIcon={<span>⚙️</span>} rightIcon={<span>▼</span>}>
        양쪽 아이콘
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
      <Button>기본 상태</Button>
      <Button disabled>비활성화 상태</Button>
      <Button loading>로딩 상태</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "전체 너비 버튼",
  },
};

export const WithClick: Story = {
  args: {
    children: "클릭 가능 버튼",
    onClick: () => {
      alert("Hello from Turborepo!");
    },
  },
};
