import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Modal,
  ModalFooter,
  Button,
  Input,
  Select,
  Checkbox,
  Radio,
  Text,
  Paragraph,
  FormField,
} from "@doo/common-ui";

const meta: Meta<typeof Modal> = {
  title: "Components/Molecules/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "모달 표시 여부",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "full"],
      description: "모달 크기",
    },
    title: {
      control: "text",
      description: "모달 제목",
    },
    closeOnOverlayClick: {
      control: "boolean",
      description: "오버레이 클릭 시 닫기 가능 여부",
    },
    closeOnEsc: {
      control: "boolean",
      description: "ESC 키로 닫기 가능 여부",
    },
    hideHeader: {
      control: "boolean",
      description: "헤더 숨김 여부",
    },
    hideCloseButton: {
      control: "boolean",
      description: "닫기 버튼 숨김 여부",
    },
    scrollable: {
      control: "boolean",
      description: "내용 스크롤 가능 여부",
    },
    animated: {
      control: "boolean",
      description: "애니메이션 사용 여부",
    },
    positionTop: {
      control: "boolean",
      description: "상단 표시 여부",
    },
    asPage: {
      control: "boolean",
      description: "페이지로 표시 여부",
    },
    onClose: {
      action: "closed",
      description: "모달이 닫힐 때 호출될 함수",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// 컨트롤에서 직접 모달을 제어할 수 있도록 래퍼 컴포넌트 사용
const ModalWrapper = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        모달 열기
      </Button>

      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {props.children}
      </Modal>
    </div>
  );
};

// 기본 모달
export const Default: Story = {
  render: (args) => (
    <ModalWrapper {...args} title="기본 모달">
      <p>기본 모달 내용입니다. 이 모달은 기본 스타일과 동작을 보여줍니다.</p>
    </ModalWrapper>
  ),
};

// 다양한 크기의 모달
export const ModalSizes: Story = {
  render: () => {
    const [isOpenSm, setIsOpenSm] = useState(false);
    const [isOpenMd, setIsOpenMd] = useState(false);
    const [isOpenLg, setIsOpenLg] = useState(false);
    const [isOpenXl, setIsOpenXl] = useState(false);
    const [isOpenFull, setIsOpenFull] = useState(false);

    return (
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Button variant="outline" onClick={() => setIsOpenSm(true)}>
          Small 모달
        </Button>
        <Button variant="outline" onClick={() => setIsOpenMd(true)}>
          Medium 모달
        </Button>
        <Button variant="outline" onClick={() => setIsOpenLg(true)}>
          Large 모달
        </Button>
        <Button variant="outline" onClick={() => setIsOpenXl(true)}>
          Extra Large 모달
        </Button>
        <Button variant="outline" onClick={() => setIsOpenFull(true)}>
          Full 모달
        </Button>

        <Modal
          isOpen={isOpenSm}
          onClose={() => setIsOpenSm(false)}
          title="Small 모달"
          size="sm"
        >
          <p>작은 크기의 모달입니다.</p>
          <p>간단한 메시지나 작은 입력 폼에 적합합니다.</p>
        </Modal>

        <Modal
          isOpen={isOpenMd}
          onClose={() => setIsOpenMd(false)}
          title="Medium 모달"
          size="md"
        >
          <p>중간 크기의 모달입니다.</p>
          <p>일반적인 대화상자에 적합한 기본 크기입니다.</p>
        </Modal>

        <Modal
          isOpen={isOpenLg}
          onClose={() => setIsOpenLg(false)}
          title="Large 모달"
          size="lg"
        >
          <p>큰 크기의 모달입니다.</p>
          <p>더 많은 내용이나 복잡한 폼을 표시할 때 적합합니다.</p>
          <p>모달 내용이 많아질 경우 자동으로 스크롤됩니다.</p>
        </Modal>

        <Modal
          isOpen={isOpenXl}
          onClose={() => setIsOpenXl(false)}
          title="Extra Large 모달"
          size="xl"
        >
          <p>매우 큰 크기의 모달입니다.</p>
          <p>복잡한 대시보드나 많은 정보를 표시해야 할 때 사용합니다.</p>
          <p>화면의 대부분을 차지하지만 여전히 모달의 컨텍스트를 유지합니다.</p>
        </Modal>

        <Modal
          isOpen={isOpenFull}
          onClose={() => setIsOpenFull(false)}
          title="Full 모달"
          size="full"
        >
          <p>전체 화면 모달입니다.</p>
          <p>최대한의 공간을 활용해야 하는 복잡한 인터페이스에 적합합니다.</p>
          <p>모바일 환경에서는 페이지처럼 표시됩니다.</p>
        </Modal>
      </div>
    );
  },
};

// 헤더 숨김 모달
export const NoHeader: Story = {
  render: () => (
    <ModalWrapper title="이 제목은 표시되지 않습니다" hideHeader={true}>
      <div style={{ padding: "20px 0" }}>
        <h3>헤더가 없는 모달</h3>
        <p>
          이 모달은 헤더가 숨겨져 있습니다. 특별한 UI가 필요한 경우에 사용할 수
          있습니다.
        </p>
      </div>
    </ModalWrapper>
  ),
};

// 커스텀 푸터가 있는 모달
export const WithCustomFooter: Story = {
  render: () => (
    <ModalWrapper
      title="커스텀 푸터 모달"
      footer={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button variant="outline" style={{ padding: "0 10px" }}>
            <span style={{ fontSize: "20px" }}>⚙️</span> 설정
          </Button>
          <div>
            <Button variant="outline" style={{ marginRight: "10px" }}>
              취소
            </Button>
            <Button variant="primary">확인</Button>
          </div>
        </div>
      }
    >
      <p>이 모달은 커스텀 푸터를 가지고 있습니다.</p>
      <p>모달 하단에 특별한 버튼이나 요소를 배치할 수 있습니다.</p>
    </ModalWrapper>
  ),
};

// 기본 푸터 컴포넌트 사용
export const WithDefaultFooter: Story = {
  render: () => (
    <ModalWrapper
      title="기본 푸터 사용"
      footer={
        <ModalFooter
          cancelText="취소"
          confirmText="저장"
          onCancel={() => console.log("취소됨")}
          onConfirm={() => console.log("확인됨")}
        />
      }
    >
      <p>이 모달은 ModalFooter 컴포넌트를 사용합니다.</p>
      <p>일관된 모달 푸터 UI를 쉽게 구현할 수 있습니다.</p>
    </ModalWrapper>
  ),
};

// 스크롤 모달
export const ScrollableModal: Story = {
  render: () => (
    <ModalWrapper title="스크롤 가능한 모달" scrollable={true}>
      <div>
        <p>이 모달은 내용이 많을 때 스크롤이 가능합니다.</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>스크롤 테스트를 위한 {i + 1}번째 문단입니다.</p>
        ))}
      </div>
    </ModalWrapper>
  ),
};

// 퀴즈 생성 폼 모달
export const QuizCreationModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [quizType, setQuizType] = useState("mbti");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <div>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          새 퀴즈 만들기
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="새 퀴즈 만들기"
          size="lg"
          footer={
            <ModalFooter
              cancelText="취소"
              confirmText="퀴즈 생성"
              onCancel={() => setIsOpen(false)}
              onConfirm={handleSubmit}
              confirmLoading={isLoading}
            />
          }
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <FormField label="퀴즈 제목" required>
              <Input placeholder="제목을 입력하세요" />
            </FormField>

            <FormField label="퀴즈 유형" required>
              <Select
                value={quizType}
                onChange={(e) => setQuizType(e.target.value)}
                options={[
                  { value: "mbti", label: "MBTI 테스트" },
                  { value: "personality", label: "성격 테스트" },
                  { value: "aptitude", label: "적성 테스트" },
                  { value: "knowledge", label: "지식 퀴즈" },
                  { value: "preference", label: "취향 테스트" },
                ]}
              />
            </FormField>

            <FormField label="퀴즈 설명">
              <textarea
                placeholder="퀴즈에 대한 간단한 설명을 입력하세요"
                rows={3}
                className="textarea-input"
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "1px solid #d9d9d9",
                  fontSize: "14px",
                  minHeight: "80px",
                  resize: "vertical",
                }}
              />
            </FormField>
          </div>
        </Modal>
      </div>
    );
  },
};

// 블로그 포스트 미리보기 모달
export const BlogPostPreviewModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          미리보기
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="블로그 포스트 미리보기"
          size="xl"
          headerRight={
            <Button variant="outline" size="sm" style={{ marginRight: "16px" }}>
              편집하기
            </Button>
          }
        >
          <div style={{ padding: "10px 0" }}>
            <Paragraph size="xl" weight="bold">
              MBTI와 직업 선택: 당신의 성격 유형에 맞는 직업 찾기
            </Paragraph>

            <div style={{ marginBottom: "20px" }}>
              <Paragraph size="sm" color="secondary">
                작성자: 김도움 | 발행일: 2025년 4월 23일 | 카테고리: 심리학,
                커리어
              </Paragraph>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#888",
                }}
              >
                [블로그 대표 이미지]
              </div>
            </div>

            <Paragraph>
              MBTI 성격 유형은 직업 선택에 있어 중요한 참고 사항이 될 수
              있습니다. 자신의 성격 유형에 맞는 직업을 선택하면 일의 만족도와
              성취감이 높아질 수 있기 때문입니다.
            </Paragraph>

            <Paragraph>
              예를 들어, INTJ 유형은 분석적 사고와 전략적 계획을 세우는 능력이
              뛰어나 연구원, 엔지니어, 프로그래머 등의 직업에 적합할 수
              있습니다. 반면 ESFJ 유형은 대인관계와 협업 능력이 뛰어나 상담사,
              교사, 의료 서비스 등의 직업에서 강점을 발휘할 수 있습니다.
            </Paragraph>

            <Paragraph weight="medium" color="primary">
              성격 유형별 추천 직업
            </Paragraph>

            <Paragraph>
              이 글에서는 16가지 MBTI 성격 유형별로 적합한 직업군을 소개하고, 각
              유형의 장점을 살릴 수 있는 업무 환경과 역할에 대해 알아보겠습니다.
              또한 자신의 MBTI 유형을 직업 선택에 어떻게 활용할 수 있는지
              실질적인 조언을 제공합니다.
            </Paragraph>

            <Paragraph size="sm" color="muted">
              이 블로그의 내용은 참고용이며, 개인의 적성과 상황에 따라 다를 수
              있습니다.
            </Paragraph>
          </div>
        </Modal>
      </div>
    );
  },
};

// 퀴즈 결과 모달
export const QuizResultModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button variant="primary" onClick={() => setIsOpen(true)}>
          퀴즈 결과 보기
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="퀴즈 결과"
          size="lg"
          headerRight={
            <div style={{ display: "flex", gap: "8px" }}>
              <Button variant="outline" size="sm">
                저장
              </Button>
              <Button variant="outline" size="sm">
                공유
              </Button>
            </div>
          }
          footer={
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button variant="primary">다른 퀴즈 풀기</Button>
            </div>
          }
        >
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <h2 style={{ color: "#1890ff", margin: "0 0 10px 0" }}>INFJ</h2>
            <h3 style={{ margin: "0 0 20px 0" }}>"선의의 옹호자"</h3>

            <div
              style={{
                backgroundColor: "#f0f7ff",
                padding: "15px",
                borderRadius: "8px",
                margin: "20px 0",
              }}
            >
              <p>전체 참여자 중 상위 3%에 해당하는 희귀한 유형입니다.</p>
            </div>

            <Paragraph align="left">
              INFJ는 조용하고 신비로우면서도 사람들에게 영감을 주는 이상주의적인
              성격입니다. 높은 원칙과 도덕성을 갖고 있으며, 명확한 비전과 신념에
              따라 행동합니다. 다른 사람의 감정과 필요에 민감하며 공감 능력이
              뛰어납니다.
            </Paragraph>

            <h4 style={{ textAlign: "left", marginBottom: "10px" }}>
              당신의 강점:
            </h4>
            <ul style={{ textAlign: "left" }}>
              <li>통찰력과 직관력이 뛰어남</li>
              <li>창의적이고 독창적인 문제 해결 능력</li>
              <li>깊은 공감 능력과 경청 태도</li>
              <li>강한 개인적 신념과 가치관</li>
            </ul>

            <div
              style={{
                backgroundColor: "#f6f6f6",
                padding: "15px",
                borderRadius: "8px",
                margin: "20px 0",
                fontSize: "14px",
                color: "#666",
              }}
            >
              <p style={{ margin: 0 }}>
                결과를 친구들과 공유하거나 다른 테스트도 참여해보세요!
              </p>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

// 퀴즈 삭제 확인 모달
export const DeleteConfirmationModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          style={{ color: "red" }}
        >
          퀴즈 삭제
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="퀴즈 삭제 확인"
          size="sm"
          footer={
            <ModalFooter
              cancelText="취소"
              confirmText="삭제"
              onCancel={() => setIsOpen(false)}
              onConfirm={handleDelete}
              confirmLoading={isLoading}
            />
          }
        >
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                backgroundColor: "#fff2f0",
                border: "1px solid #ffccc7",
                color: "#cf1322",
                padding: "15px",
                borderRadius: "8px",
                margin: "10px 0",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0" }}>경고</h3>
              <p style={{ margin: 0 }}>
                "MBTI 성격 유형 테스트" 퀴즈를 정말 삭제하시겠습니까?
              </p>
            </div>
            <p>
              이 작업은 되돌릴 수 없으며, 모든 관련 데이터가 영구적으로
              삭제됩니다.
            </p>
          </div>
        </Modal>
      </div>
    );
  },
};

// 이미지 미리보기 모달
export const ImagePreviewModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          이미지 미리보기
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="퀴즈 결과 이미지"
          size="lg"
          hideCloseButton={false}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px 0",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "400px",
                backgroundColor: "#f0f0f0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#888",
                border: "1px dashed #ccc",
                borderRadius: "8px",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>🖼️</div>
              <div>퀴즈 결과 공유 이미지</div>
              <div style={{ fontSize: "14px", marginTop: "5px" }}>
                (실제 이미지는 여기에 표시됩니다)
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};
