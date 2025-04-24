import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Select, SelectOption } from "@doo/common-ui";

const meta: Meta<typeof Select> = {
  title: "Components/Atoms/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
      description: "선택 상자 크기",
    },
    label: {
      control: "text",
      description: "선택 상자 레이블",
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
    fullWidth: {
      control: "boolean",
      description: "전체 너비 사용 여부",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = [
  { value: "option1", label: "옵션 1" },
  { value: "option2", label: "옵션 2" },
  { value: "option3", label: "옵션 3" },
  { value: "option4", label: "옵션 4" },
  { value: "option5", label: "옵션 5" },
];

/**
 * 기본 선택 상자 예제입니다.
 */
export const Default: Story = {
  args: {
    label: "기본 선택 상자",
    options: defaultOptions,
    placeholder: "옵션을 선택하세요",
  },
};

/**
 * 기본값이 선택된 선택 상자입니다.
 */
export const WithDefaultValue: Story = {
  args: {
    label: "기본값이 있는 선택 상자",
    options: defaultOptions,
    defaultValue: "option2",
  },
};

/**
 * 비활성화된 선택 상자입니다.
 */
export const Disabled: Story = {
  args: {
    label: "비활성화된 선택 상자",
    options: defaultOptions,
    disabled: true,
    defaultValue: "option1",
  },
};

/**
 * 에러 상태의 선택 상자입니다.
 */
export const WithError: Story = {
  args: {
    label: "에러 상태 선택 상자",
    options: defaultOptions,
    error: "옵션을 선택해야 합니다",
  },
};

/**
 * 도움말이 있는 선택 상자입니다.
 */
export const WithHelpText: Story = {
  args: {
    label: "도움말이 있는 선택 상자",
    options: defaultOptions,
    helpText: "필요한 옵션을 선택하세요",
  },
};

/**
 * 접두사가 있는 선택 상자입니다.
 */
export const WithPrefix: Story = {
  args: {
    label: "접두사가 있는 선택 상자",
    options: defaultOptions,
    prefix: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 10H3M16 2V6M8 2V6M7.8 22H16.2C17.8802 22 18.7202 22 19.362 21.673C19.9265 21.3854 20.3854 20.9265 20.673 20.362C21 19.7202 21 18.8802 21 17.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V17.2C3 18.8802 3 19.7202 3.32698 20.362C3.6146 20.9265 4.07354 21.3854 4.63803 21.673C5.27976 22 6.11984 22 7.8 22Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
};

/**
 * 다양한 크기의 선택 상자입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Select
        label="Small 크기 선택 상자"
        size="sm"
        options={defaultOptions}
        placeholder="Small"
      />
      <Select
        label="Medium 크기 선택 상자"
        size="md"
        options={defaultOptions}
        placeholder="Medium"
      />
      <Select
        label="Large 크기 선택 상자"
        size="lg"
        options={defaultOptions}
        placeholder="Large"
      />
    </div>
  ),
};

/**
 * 비활성화된 옵션이 있는 선택 상자입니다.
 */
export const WithDisabledOptions: Story = {
  args: {
    label: "비활성화된 옵션이 있는 선택 상자",
    options: [
      { value: "option1", label: "옵션 1" },
      { value: "option2", label: "옵션 2 (비활성화됨)", disabled: true },
      { value: "option3", label: "옵션 3" },
      { value: "option4", label: "옵션 4 (비활성화됨)", disabled: true },
      { value: "option5", label: "옵션 5" },
    ],
    placeholder: "옵션을 선택하세요",
  },
};

/**
 * 동적으로 상태가 변하는 선택 상자 예제입니다.
 */
export const Interactive = () => {
  const [selected, setSelected] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Select
        label="옵션을 선택하세요"
        options={defaultOptions}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        placeholder="선택하세요"
      />
      {selected && <p>선택된 값: {selected}</p>}
    </div>
  );
};
/**
 * 연결된 두 개의 선택 상자 예제입니다.
 */
export const DependentSelects = () => {
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");

  const categories = [
    { value: "fruit", label: "과일" },
    { value: "vegetable", label: "채소" },
    { value: "meat", label: "육류" },
  ];

  const itemsByCategory: Record<string, SelectOption[]> = {
    fruit: [
      { value: "apple", label: "사과" },
      { value: "banana", label: "바나나" },
      { value: "orange", label: "오렌지" },
    ],
    vegetable: [
      { value: "carrot", label: "당근" },
      { value: "cucumber", label: "오이" },
      { value: "lettuce", label: "상추" },
    ],
    meat: [
      { value: "beef", label: "소고기" },
      { value: "pork", label: "돼지고기" },
      { value: "chicken", label: "닭고기" },
    ],
  };

  // 카테고리 변경 시 아이템 초기화
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setItem("");
    console.log("카테고리 변경:", newCategory);
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
      <Select
        label="카테고리 선택"
        options={categories}
        value={category}
        onChange={handleCategoryChange}
        placeholder="카테고리를 선택하세요"
      />

      <Select
        label="항목 선택"
        options={category ? itemsByCategory[category] : []}
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
          console.log("항목 변경:", e.target.value);
        }}
        placeholder="항목을 선택하세요"
        disabled={!category}
      />

      {category && item && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#f5f5f5",
            borderRadius: "4px",
          }}
        >
          <p style={{ margin: 0 }}>
            선택된 카테고리:{" "}
            <strong>
              {categories.find((c) => c.value === category)?.label}
            </strong>
          </p>
          <p style={{ margin: "8px 0 0 0" }}>
            선택된 항목:{" "}
            <strong>
              {itemsByCategory[category].find((i) => i.value === item)?.label}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};
