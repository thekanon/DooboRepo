import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@doo/common-ui";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
      description: "체크박스 크기",
    },
    label: {
      control: "text",
      description: "체크박스 레이블",
    },
    helpText: {
      control: "text",
      description: "도움말 텍스트",
    },
    error: {
      control: "text",
      description: "에러 메시지",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
    },
    checked: {
      control: "boolean",
      description: "체크 여부",
    },
    defaultChecked: {
      control: "boolean",
      description: "기본 체크 여부",
    },
    fullWidth: {
      control: "boolean",
      description: "전체 너비 사용 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

/**
 * 기본 체크박스 예제입니다.
 */
export const Default: Story = {
  args: {
    label: "기본 체크박스",
    // 제어되지 않은 컴포넌트로 명확히 설정
    defaultChecked: false,
  },
};

/**
 * 체크된 상태의 체크박스입니다.
 */
export const Checked: Story = {
  args: {
    label: "체크된 체크박스",
    checked: true,
    onChange: () => {},
  },
};

/**
 * 비활성화된 체크박스입니다.
 */
export const Disabled: Story = {
  args: {
    label: "비활성화된 체크박스",
    disabled: true,
    defaultChecked: false,
  },
};

/**
 * 체크되고 비활성화된 체크박스입니다.
 */
export const CheckedAndDisabled: Story = {
  args: {
    label: "체크되고 비활성화된 체크박스",
    checked: true,
    disabled: true,
    onChange: () => {},
  },
};

/**
 * 에러 상태의 체크박스입니다.
 */
export const WithError: Story = {
  args: {
    label: "에러 상태 체크박스",
    error: "오류가 발생했습니다",
    defaultChecked: false,
  },
};

/**
 * 도움말이 있는 체크박스입니다.
 */
export const WithHelpText: Story = {
  args: {
    label: "도움말이 있는 체크박스",
    helpText: "이것은 도움말입니다",
    defaultChecked: false,
  },
};

/**
 * 다양한 크기의 체크박스입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox label="Small 크기 체크박스" size="sm" />
      <Checkbox label="Medium 크기 체크박스" size="md" />
      <Checkbox label="Large 크기 체크박스" size="lg" />
    </div>
  ),
};

// 상호작용 가능한 체크박스는 useState로 상태를 관리하여 제어 컴포넌트로 설정
export const Interactive = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 체크박스의 상태를 업데이트
    const isChecked = event.target.checked;
    // 상태를 업데이트
    console.log("체크박스 상태:", isChecked);
    setChecked(isChecked);
  };

  return (
    <Checkbox
      label={`현재 상태: ${checked ? "체크됨" : "체크되지 않음"}`}
      checked={checked}
      onChange={handleChange}
    />
  );
};
