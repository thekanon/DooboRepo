import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastController, Button } from "@doo/common-ui";

const meta: Meta<typeof Toast> = {
  title: "Components/Molecules/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
      description: "토스트 메시지 유형",
    },
    position: {
      control: { type: "select" },
      options: [
        "top-right",
        "top-left",
        "bottom-right",
        "bottom-left",
        "top-center",
        "bottom-center",
      ],
      description: "토스트 메시지 위치",
    },
    autoClose: {
      control: { type: "number" },
      description: "자동으로 닫히는 시간 (ms)",
    },
    showIcon: {
      control: "boolean",
      description: "아이콘 표시 여부",
    },
    showProgress: {
      control: "boolean",
      description: "진행 표시줄 표시 여부",
    },
    title: {
      control: "text",
      description: "토스트 메시지 제목",
    },
    onClose: {
      action: "closed",
      description: "토스트가 닫힐 때 호출될 함수",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          height: "500px",
          position: "relative",
          border: "1px dashed #ccc",
          borderRadius: "8px",
        }}
      >
        <div style={{ padding: "20px" }}>
          <strong>미리보기 영역</strong>
          <p>토스트 메시지가 이 영역에 표시됩니다.</p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

// 기본 토스트
export const Default: Story = {
  args: {
    variant: "info",
    position: "top-right",
    title: "알림",
    children: "새로운 알림이 도착했습니다.",
    autoClose: 5000,
    showIcon: true,
    showProgress: true,
  },
};

// 토스트 변형
export const ToastVariants: Story = {
  render: () => (
    <div>
      <Toast
        variant="info"
        position="top-right"
        title="정보"
        autoClose={0} // 자동으로 닫히지 않음
      >
        블로그에 새 댓글이 달렸습니다.
      </Toast>

      <Toast variant="success" position="top-left" title="성공" autoClose={0}>
        퀴즈가 성공적으로 게시되었습니다.
      </Toast>

      <Toast
        variant="warning"
        position="bottom-right"
        title="주의"
        autoClose={0}
      >
        퀴즈 결과가 저장되지 않을 수 있습니다.
      </Toast>

      <Toast variant="error" position="bottom-left" title="오류" autoClose={0}>
        서버 연결에 실패했습니다.
      </Toast>
    </div>
  ),
};

// 위치 옵션
export const PositionOptions: Story = {
  render: () => (
    <div>
      <Toast
        variant="info"
        position="top-center"
        title="상단 중앙"
        autoClose={0}
      >
        이 토스트는 상단 중앙에 표시됩니다.
      </Toast>

      <Toast
        variant="info"
        position="bottom-center"
        title="하단 중앙"
        autoClose={0}
      >
        이 토스트는 하단 중앙에 표시됩니다.
      </Toast>
    </div>
  ),
};

// 진행 표시줄 있는 토스트
export const WithProgressBar: Story = {
  args: {
    variant: "info",
    position: "top-right",
    title: "자동 닫힘",
    children: "이 토스트는 5초 후에 자동으로 닫힙니다.",
    autoClose: 5000,
    showProgress: true,
  },
};

// 진행 표시줄 없는 토스트
export const WithoutProgressBar: Story = {
  args: {
    variant: "info",
    position: "top-right",
    title: "진행 표시줄 없음",
    children: "이 토스트는 진행 표시줄 없이 자동으로 닫힙니다.",
    autoClose: 5000,
    showProgress: false,
  },
};

// 액션 버튼이 있는 토스트
export const WithAction: Story = {
  args: {
    variant: "warning",
    position: "top-right",
    title: "작업 필요",
    children: "퀴즈 결과가 저장되지 않았습니다.",
    autoClose: 0,
    action: (
      <Button variant="outline" size="sm">
        지금 저장
      </Button>
    ),
  },
};

// ToastController 데모
export const ToastControllerDemo: Story = {
  render: () => {
    // ToastController는 실제로 컴포넌트를 렌더링하지 않고 별도의 상태 관리를 필요로 합니다.
    // 이 예제에서는 버튼을 통해 토스트 표시 기능만 보여줍니다.
    const [toastId, setToastId] = useState<string | null>(null);

    const showInfoToast = () => {
      // 실제 구현에서는 ToastController가 토스트를 렌더링합니다.
      // 여기서는 데모 목적으로 직접 토스트를 렌더링합니다.
      setToastId("demo-toast-1");
    };

    const closeAllToasts = () => {
      // 실제 구현에서는 ToastController.closeAll()을 호출합니다.
      setToastId(null);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <Button variant="primary" onClick={showInfoToast}>
            정보 토스트 표시
          </Button>
          <Button variant="outline" onClick={closeAllToasts}>
            모든 토스트 닫기
          </Button>
        </div>

        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f5f5f5",
            borderRadius: "5px",
          }}
        >
          <code>
            {`// ToastController 사용 예시\n`}
            {`const toastId = ToastController.show(\n`}
            {`  "퀴즈가 성공적으로 저장되었습니다.",\n`}
            {`  {\n`}
            {`    variant: "success",\n`}
            {`    title: "저장 완료",\n`}
            {`    position: "top-right",\n`}
            {`    autoClose: 3000\n`}
            {`  }\n`}
            {`);\n\n`}
            {`// 특정 토스트 닫기\n`}
            {`ToastController.close(toastId);\n\n`}
            {`// 모든 토스트 닫기\n`}
            {`ToastController.closeAll();`}
          </code>
        </div>

        {toastId && (
          <Toast
            id={toastId}
            variant="info"
            position="top-right"
            title="ToastController 데모"
            autoClose={3000}
            onClose={() => setToastId(null)}
          >
            ToastController를 통해 표시된 토스트 메시지입니다.
          </Toast>
        )}
      </div>
    );
  },
};

// 퀴즈 관련 토스트 예시
export const QuizRelatedToasts: Story = {
  render: () => {
    const [showToasts, setShowToasts] = useState(false);

    const toggleToasts = () => {
      setShowToasts(!showToasts);
    };

    // wrapper div 사용하여 간격 조정
    return (
      <div>
        <Button
          variant={showToasts ? "primary" : "outline"}
          onClick={toggleToasts}
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {showToasts ? "토스트 숨기기" : "퀴즈 관련 토스트 표시"}
        </Button>

        {showToasts && (
          // 각 토스트를 개별 래퍼로 감싸 위치 조정
          <>
            <div>
              <Toast
                variant="success"
                position="top-right"
                title="퀴즈 저장 완료"
                autoClose={0}
              >
                "MBTI 성격 유형 테스트" 퀴즈가 저장되었습니다.
              </Toast>
            </div>

            {/* 두 번째 토스트는 별도의 Portal을 통해 렌더링되므로 DOM에서 약간 아래에 배치 */}
            <div className="second-toast">
              <Toast
                variant="info"
                position="top-right"
                title="퀴즈 통계 업데이트"
                autoClose={0}
              >
                지난 24시간 동안 152명이 퀴즈에 참여했습니다.
              </Toast>
            </div>

            {/* 세 번째 토스트도 마찬가지로 별도의 Portal로 렌더링 */}
            <div className="third-toast">
              <Toast
                variant="warning"
                position="top-right"
                title="미완성 질문 감지"
                autoClose={0}
                action={
                  <Button variant="outline" size="sm">
                    지금 확인
                  </Button>
                }
              >
                퀴즈에 미완성 질문이 있습니다. 발행 전에 확인해주세요.
              </Toast>
            </div>
          </>
        )}

        {/* CSS 스타일을 추가하여 토스트 위치 조정 */}
        <style>
          {`
            .second-toast {
              margin-top: 80px;
            }
            .third-toast {
              margin-top: 160px;
            }
          `}
        </style>
      </div>
    );
  },
};

// 블로그 관련 토스트 예시
export const BlogRelatedToasts: Story = {
  render: () => {
    const [showToasts, setShowToasts] = useState(false);

    const toggleToasts = () => {
      setShowToasts(!showToasts);
    };

    return (
      <div>
        <Button
          variant={showToasts ? "primary" : "outline"}
          onClick={toggleToasts}
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {showToasts ? "토스트 숨기기" : "블로그 관련 토스트 표시"}
        </Button>

        {showToasts && (
          <>
            <div>
              <Toast
                variant="success"
                position="bottom-right"
                title="포스트 게시 완료"
                autoClose={0}
              >
                "MBTI와 직업 선택" 포스트가 성공적으로 게시되었습니다.
              </Toast>
            </div>

            <div className="second-toast-bottom">
              <Toast
                variant="info"
                position="bottom-right"
                title="새 댓글 알림"
                autoClose={0}
              >
                홍길동님이 게시글에 새 댓글을 남겼습니다.
              </Toast>
            </div>

            <div className="third-toast-bottom">
              <Toast
                variant="error"
                position="bottom-right"
                title="이미지 업로드 실패"
                autoClose={0}
                action={
                  <Button variant="primary" size="sm">
                    다시 시도
                  </Button>
                }
              >
                블로그 배경 이미지 업로드에 실패했습니다.
              </Toast>
            </div>
          </>
        )}

        {/* CSS 스타일을 추가하여 토스트 위치 조정 */}
        <style>
          {`
            .second-toast-bottom {
              margin-bottom: 80px;
            }
            .third-toast-bottom {
              margin-bottom: 160px;
            }
          `}
        </style>
      </div>
    );
  },
};

// 시스템 알림 토스트
export const SystemNotificationToasts: Story = {
  render: () => {
    const [showToasts, setShowToasts] = useState(false);

    const toggleToasts = () => {
      setShowToasts(!showToasts);
    };

    return (
      <div>
        <Button
          variant={showToasts ? "primary" : "outline"}
          onClick={toggleToasts}
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {showToasts ? "토스트 숨기기" : "시스템 알림 표시"}
        </Button>

        {showToasts && (
          <>
            <div>
              <Toast
                variant="info"
                position="top-center"
                title="시스템 업데이트 예정"
                autoClose={0}
              >
                내일 오전 2시부터 4시까지 시스템 점검이 있을 예정입니다.
              </Toast>
            </div>

            <div className="second-toast">
              <Toast
                variant="warning"
                position="top-center"
                title="세션 만료 임박"
                autoClose={0}
                action={
                  <Button variant="primary" size="sm">
                    세션 연장
                  </Button>
                }
              >
                로그인 세션이 5분 후 만료됩니다. 작업을 저장해 주세요.
              </Toast>
            </div>
          </>
        )}

        {/* CSS 스타일을 추가하여 토스트 위치 조정 */}
        <style>
          {`
            .second-toast {
              margin-top: 80px;
            }
          `}
        </style>
      </div>
    );
  },
};
