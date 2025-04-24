import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "@doo/common-ui";

const meta: Meta<typeof Button> = {
  title: "Components/Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "danger"],
      defaultValue: "primary",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    fullWidth: {
      control: "boolean",
      defaultValue: false,
    },
    isLoading: {
      control: "boolean",
      defaultValue: false,
    },
    disabled: {
      control: "boolean",
      defaultValue: false,
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * 기본 버튼 예제입니다.
 */
export const Default: Story = {
  args: {
    children: "버튼",
  },
};

/**
 * 프라이머리 버튼 예제입니다.
 */
export const Primary: Story = {
  args: {
    variant: "primary",
    children: "프라이머리 버튼",
  },
};

/**
 * 세컨더리 버튼 예제입니다.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "세컨더리 버튼",
  },
};

/**
 * 아웃라인 버튼 예제입니다.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "아웃라인 버튼",
  },
};

/**
 * 고스트 버튼 예제입니다.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "고스트 버튼",
  },
};

/**
 * 위험 버튼 예제입니다.
 */
export const Danger: Story = {
  args: {
    variant: "danger",
    children: "위험 버튼",
  },
};

/**
 * 비활성화된 버튼 예제입니다.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "비활성화 버튼",
  },
};

/**
 * 로딩 상태 버튼 예제입니다.
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: "로딩 중",
  },
};

/**
 * 다양한 버튼 크기를 보여주는 예제입니다.
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * 전체 너비 버튼 예제입니다.
 */
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "전체 너비 버튼",
  },
  parameters: {
    layout: "padded",
  },
};

/**
 * 모든 버튼 변형을 보여주는 예제입니다.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "16px" }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        <Button variant="primary" disabled>
          Primary
        </Button>
        <Button variant="secondary" disabled>
          Secondary
        </Button>
        <Button variant="outline" disabled>
          Outline
        </Button>
        <Button variant="ghost" disabled>
          Ghost
        </Button>
        <Button variant="danger" disabled>
          Danger
        </Button>
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        <Button variant="primary" isLoading>
          Primary
        </Button>
        <Button variant="secondary" isLoading>
          Secondary
        </Button>
        <Button variant="outline" isLoading>
          Outline
        </Button>
        <Button variant="ghost" isLoading>
          Ghost
        </Button>
        <Button variant="danger" isLoading>
          Danger
        </Button>
      </div>
    </div>
  ),
};

/**
 * 비동기 작업을 처리하는 버튼 예제입니다.
 */
export const AsyncButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    // 초기화
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    // 비동기 작업 시뮬레이션
    try {
      await new Promise((resolve, reject) => {
        // 70% 확률로 성공, 30% 확률로 실패
        setTimeout(() => {
          const isSuccessful = Math.random() < 0.7;
          if (isSuccessful) {
            resolve("success");
          } else {
            reject(new Error("요청이 실패했습니다. 다시 시도해주세요."));
          }
        }, 1500);
      });

      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000); // 2초 후 성공 상태 초기화
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "center",
        width: "280px",
      }}
    >
      <Button
        variant={isSuccess ? "outline" : "primary"}
        isLoading={isLoading}
        onClick={handleClick}
        style={{
          backgroundColor: isSuccess ? "#dcfce7" : undefined,
          borderColor: isSuccess ? "#22c55e" : undefined,
          color: isSuccess ? "#15803d" : undefined,
        }}
      >
        {isSuccess ? "성공했습니다!" : "API 요청 보내기"}
      </Button>

      {error && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fee2e2",
            borderRadius: "4px",
            color: "#b91c1c",
            fontSize: "14px",
            width: "100%",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ fontSize: "14px", color: "#525252" }}>
        클릭하면 1.5초 후 70% 확률로 성공, 30% 확률로 실패합니다.
      </div>
    </div>
  );
};

/**
 * 폼 제출에 사용되는 버튼 예제입니다.
 */
export const FormSubmitButton = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!formState.name || !formState.email) {
      setFeedback({
        type: "error",
        message: "모든 필드를 입력해주세요.",
      });
      return;
    }

    // 이메일 간단 유효성 검사
    if (!formState.email.includes("@")) {
      setFeedback({
        type: "error",
        message: "유효한 이메일 주소를 입력해주세요.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    // 폼 제출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setFeedback({
      type: "success",
      message: "폼이 성공적으로 제출되었습니다!",
    });

    // 폼 초기화
    setFormState({
      name: "",
      email: "",
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 12px",
    border: "1px solid #d4d4d4",
    borderRadius: "4px",
    marginBottom: "8px",
    fontSize: "14px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "4px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#404040",
  };

  return (
    <div style={{ width: "300px" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "16px" }}>
        <div style={{ marginBottom: "16px" }}>
          <label style={labelStyle} htmlFor="name">
            이름
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formState.name}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle} htmlFor="email">
            이메일
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formState.email}
            onChange={handleInputChange}
            style={inputStyle}
            placeholder="이메일을 입력하세요"
          />
        </div>

        <Button type="submit" isLoading={isSubmitting} fullWidth>
          제출하기
        </Button>
      </form>

      {feedback && (
        <div
          style={{
            padding: "12px",
            borderRadius: "4px",
            backgroundColor:
              feedback.type === "success" ? "#dcfce7" : "#fee2e2",
            color: feedback.type === "success" ? "#15803d" : "#b91c1c",
            fontSize: "14px",
          }}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
};

/**
 * 버튼 그룹 예제입니다.
 */
export const ButtonGroup = () => {
  const [selected, setSelected] = useState<string>("week");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ fontSize: "14px", marginBottom: "8px", color: "#404040" }}>
        기간 선택:
      </div>

      <div
        style={{
          display: "flex",
          borderRadius: "4px",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
        }}
      >
        <Button
          variant={selected === "day" ? "primary" : "ghost"}
          onClick={() => setSelected("day")}
          style={{
            borderRadius: "0",
            flex: "1",
            borderRight: "1px solid #e5e7eb",
          }}
        >
          일간
        </Button>
        <Button
          variant={selected === "week" ? "primary" : "ghost"}
          onClick={() => setSelected("week")}
          style={{
            borderRadius: "0",
            flex: "1",
            borderRight: "1px solid #e5e7eb",
          }}
        >
          주간
        </Button>
        <Button
          variant={selected === "month" ? "primary" : "ghost"}
          onClick={() => setSelected("month")}
          style={{
            borderRadius: "0",
            flex: "1",
          }}
        >
          월간
        </Button>
      </div>

      <div
        style={{
          padding: "12px",
          backgroundColor: "#f8f9fa",
          borderRadius: "4px",
          fontSize: "14px",
          color: "#525252",
        }}
      >
        선택된 기간:{" "}
        {selected === "day" ? "일간" : selected === "week" ? "주간" : "월간"}{" "}
        데이터
      </div>
    </div>
  );
};

/**
 * 실제 백오피스에서 사용될 수 있는 데이터 관리 버튼들의 예제입니다.
 */
export const DataManagementButtons = () => {
  const [selectedRows, setSelectedRows] = useState(2);
  const [actionStatus, setActionStatus] = useState<{
    action: string;
    status: "processing" | "success" | "error" | null;
  }>({ action: "", status: null });

  const simulateAction = async (action: string) => {
    setActionStatus({ action, status: "processing" });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setActionStatus({
      action,
      status: Math.random() > 0.2 ? "success" : "error",
    });

    // 성공 또는 실패 상태 3초 후 초기화
    setTimeout(() => {
      setActionStatus({ action: "", status: null });
    }, 3000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px",
      }}
    >
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "12px 16px",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>
            선택된 항목: <strong>{selectedRows}개</strong>
          </span>
          <button
            style={{
              background: "none",
              border: "none",
              color: "#096dd9",
              cursor: "pointer",
              fontSize: "14px",
            }}
            onClick={() => {
              const newCount = Math.floor(Math.random() * 5) + 1;
              setSelectedRows(newCount);
            }}
          >
            선택 변경
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          variant="primary"
          isLoading={
            actionStatus.action === "approve" &&
            actionStatus.status === "processing"
          }
          onClick={() => simulateAction("approve")}
          style={{
            backgroundColor:
              actionStatus.action === "approve" &&
              actionStatus.status === "success"
                ? "#22c55e"
                : undefined,
          }}
        >
          {actionStatus.action === "approve" &&
          actionStatus.status === "success"
            ? "승인 완료"
            : "승인하기"}
        </Button>

        <Button
          variant="outline"
          isLoading={
            actionStatus.action === "reject" &&
            actionStatus.status === "processing"
          }
          onClick={() => simulateAction("reject")}
        >
          반려하기
        </Button>

        <Button
          variant="danger"
          isLoading={
            actionStatus.action === "delete" &&
            actionStatus.status === "processing"
          }
          onClick={() => simulateAction("delete")}
        >
          삭제하기
        </Button>
      </div>

      {actionStatus.status === "error" && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#fee2e2",
            borderRadius: "4px",
            color: "#b91c1c",
            fontSize: "14px",
          }}
        >
          {actionStatus.action === "approve"
            ? "승인"
            : actionStatus.action === "reject"
              ? "반려"
              : "삭제"}
          처리 중 오류가 발생했습니다. 다시 시도해주세요.
        </div>
      )}
    </div>
  );
};
