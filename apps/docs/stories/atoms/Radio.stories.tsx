import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Radio } from "@doo/common-ui";

const meta: Meta<typeof Radio> = {
  title: "Components/Atoms/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
      description: "라디오 버튼 크기",
    },
    label: {
      control: "text",
      description: "라디오 버튼 레이블",
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
      description: "선택 여부",
    },
    fullWidth: {
      control: "boolean",
      description: "전체 너비 사용 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

/**
 * 기본 라디오 버튼 예제입니다.
 */
export const Default: Story = {
  args: {
    label: "기본 라디오 버튼",
  },
};

/**
 * 선택된 상태의 라디오 버튼입니다.
 */
export const Checked: Story = {
  args: {
    label: "선택된 라디오 버튼",
    checked: true,
  },
};

/**
 * 비활성화된 라디오 버튼입니다.
 */
export const Disabled: Story = {
  args: {
    label: "비활성화된 라디오 버튼",
    disabled: true,
  },
};

/**
 * 선택되고 비활성화된 라디오 버튼입니다.
 */
export const CheckedAndDisabled: Story = {
  args: {
    label: "선택되고 비활성화된 라디오 버튼",
    checked: true,
    disabled: true,
  },
};

/**
 * 다양한 상태의 라디오 버튼 그룹 예제입니다.
 */
export const RadioGroup: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState("option1");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(e.target.value);
      console.log("선택된 옵션:", e.target.value);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ marginBottom: "16px", fontWeight: "bold" }}>
          현재 선택된 옵션: {selectedOption}
        </div>

        <Radio
          label="옵션 1"
          name="options-group"
          value="option1"
          checked={selectedOption === "option1"}
          onChange={handleChange}
        />

        <Radio
          label="옵션 2"
          name="options-group"
          value="option2"
          checked={selectedOption === "option2"}
          onChange={handleChange}
        />

        <Radio
          label="옵션 3"
          name="options-group"
          value="option3"
          checked={selectedOption === "option3"}
          onChange={handleChange}
        />

        <Radio
          label="비활성화된 옵션"
          name="options-group"
          value="option4"
          checked={selectedOption === "option4"}
          disabled={true}
          onChange={handleChange}
        />

        <Radio
          label="에러 상태의 옵션"
          name="options-group"
          value="option5"
          checked={selectedOption === "option5"}
          error="이 옵션은 현재 선택할 수 없습니다"
          onChange={handleChange}
        />

        <Radio
          label="도움말이 있는 옵션"
          name="options-group"
          value="option6"
          checked={selectedOption === "option6"}
          helpText="이 옵션을 선택하면 추가 기능이 활성화됩니다"
          onChange={handleChange}
        />
      </div>
    );
  },
};

/**
 * 선택에 따라 다른 컨텐츠를 보여주는 라디오 버튼 그룹입니다.
 */
export const ConditionalContent: Story = {
  render: () => {
    const [selectedPreference, setSelectedPreference] = useState("");

    const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedPreference(e.target.value);
      console.log("선택된 선호도:", e.target.value);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        <h3>선호하는 알림 방식을 선택하세요</h3>

        <Radio
          label="이메일"
          name="notification-preference"
          value="email"
          checked={selectedPreference === "email"}
          onChange={handlePreferenceChange}
        />

        {selectedPreference === "email" && (
          <div
            style={{
              marginLeft: "24px",
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            이메일 알림을 받으면 중요한 업데이트를 놓치지 않고 확인할 수
            있습니다.
          </div>
        )}

        <Radio
          label="SMS"
          name="notification-preference"
          value="sms"
          checked={selectedPreference === "sms"}
          onChange={handlePreferenceChange}
        />

        {selectedPreference === "sms" && (
          <div
            style={{
              marginLeft: "24px",
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            SMS 알림은 즉시 확인이 필요한 중요한 알림에 적합합니다.
          </div>
        )}

        <Radio
          label="앱 푸시 알림"
          name="notification-preference"
          value="push"
          checked={selectedPreference === "push"}
          onChange={handlePreferenceChange}
        />

        {selectedPreference === "push" && (
          <div
            style={{
              marginLeft: "24px",
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            앱 푸시 알림을 통해 실시간으로 중요한 정보를 받아보세요.
          </div>
        )}

        <Radio
          label="알림 받지 않기"
          name="notification-preference"
          value="none"
          checked={selectedPreference === "none"}
          onChange={handlePreferenceChange}
        />
      </div>
    );
  },
};
