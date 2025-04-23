import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Input } from "@doo/common-ui";

const meta: Meta<typeof Input> = {
  title: "Components/Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
      description: "입력 필드 크기",
    },
    label: {
      control: "text",
      description: "입력 필드 레이블",
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
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
    fullWidth: {
      control: "boolean",
      description: "전체 너비 사용 여부",
      defaultValue: true,
    },
    type: {
      control: { type: "select" },
      options: ["text", "password", "email", "number", "tel", "search", "url"],
      defaultValue: "text",
      description: "입력 필드 타입",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

/**
 * 기본 입력 필드 예제입니다.
 */
export const Default: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력하세요",
  },
};

/**
 * 비활성화된 입력 필드입니다.
 */
export const Disabled: Story = {
  args: {
    label: "비활성화된 입력 필드",
    placeholder: "입력할 수 없습니다",
    disabled: true,
  },
};

/**
 * 에러 상태의 입력 필드입니다.
 */
export const WithError: Story = {
  args: {
    label: "이메일",
    placeholder: "이메일을 입력하세요",
    error: "올바른 이메일 형식이 아닙니다",
    type: "email",
  },
};

/**
 * 도움말이 있는 입력 필드입니다.
 */
export const WithHelpText: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    type: "password",
    helpText: "최소 8자 이상의 문자, 숫자, 특수문자를 포함해야 합니다",
  },
};

/**
 * 접두사가 있는 입력 필드입니다.
 */
export const WithPrefix: Story = {
  args: {
    label: "가격",
    placeholder: "0",
    prefix: <span style={{ paddingLeft: "8px" }}>￦</span>,
    type: "number",
  },
};

/**
 * 접미사가 있는 입력 필드입니다.
 */
export const WithSuffix: Story = {
  args: {
    label: "무게",
    placeholder: "0",
    suffix: <span style={{ paddingRight: "8px" }}>kg</span>,
    type: "number",
  },
};

/**
 * 접두사와 접미사가 모두 있는 입력 필드입니다.
 */
export const WithPrefixAndSuffix: Story = {
  args: {
    label: "온도",
    placeholder: "0",
    prefix: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginLeft: "8px" }}
      >
        <path
          d="M12 9.5V14M12 17.5V17.51M8.2 5H15.8C16.9201 5 17.4802 5 17.908 5.21799C18.2843 5.40973 18.5903 5.71569 18.782 6.09202C19 6.51984 19 7.07989 19 8.2V15.8C19 16.9201 19 17.4802 18.782 17.908C18.5903 18.2843 18.2843 18.5903 17.908 18.782C17.4802 19 16.9201 19 15.8 19H8.2C7.07989 19 6.51984 19 6.09202 18.782C5.71569 18.5903 5.40973 18.2843 5.21799 17.908C5 17.4802 5 16.9201 5 15.8V8.2C5 7.07989 5 6.51984 5.21799 6.09202C5.40973 5.71569 5.71569 5.40973 6.09202 5.21799C6.51984 5 7.07989 5 8.2 5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    suffix: <span style={{ paddingRight: "8px" }}>°C</span>,
    type: "number",
  },
};

/**
 * 다양한 크기의 입력 필드입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}
    >
      <Input label="Small 크기 입력 필드" size="sm" placeholder="Small 입력" />
      <Input
        label="Medium 크기 입력 필드"
        size="md"
        placeholder="Medium 입력"
      />
      <Input label="Large 크기 입력 필드" size="lg" placeholder="Large 입력" />
    </div>
  ),
};

/**
 * 다양한 너비의 입력 필드입니다.
 */
export const WidthVariations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Input
        label="전체 너비 입력 필드"
        placeholder="전체 너비"
        fullWidth={true}
      />
      <div style={{ width: "300px" }}>
        <Input
          label="컨테이너 너비 입력 필드"
          placeholder="컨테이너 너비"
          fullWidth={true}
        />
      </div>
      <Input
        label="자동 너비 입력 필드"
        placeholder="자동 너비"
        fullWidth={false}
        style={{ width: "200px" }}
      />
    </div>
  ),
};

/**
 * 다양한 타입의 입력 필드입니다.
 */
export const InputTypes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}
    >
      <Input label="텍스트 입력" type="text" placeholder="일반 텍스트" />
      <Input label="비밀번호 입력" type="password" placeholder="비밀번호" />
      <Input label="이메일 입력" type="email" placeholder="이메일" />
      <Input label="숫자 입력" type="number" placeholder="숫자만 입력" />
      <Input label="전화번호 입력" type="tel" placeholder="전화번호" />
      <Input
        label="검색 입력"
        type="search"
        placeholder="검색어를 입력하세요"
      />
      <Input label="URL 입력" type="url" placeholder="https://example.com" />
    </div>
  ),
};

/**
 * 동적으로 상태가 변하는 입력 필드 예제입니다.
 */
export const Interactive = () => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.length < 3 && newValue.length > 0) {
      setError("3자 이상 입력해주세요");
    } else {
      setError(undefined);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "300px",
      }}
    >
      <Input
        label="실시간 유효성 검사"
        placeholder="3자 이상 입력하세요"
        value={value}
        onChange={handleChange}
        error={error}
      />
      <div>입력된 값: {value || "(없음)"}</div>
    </div>
  );
};
