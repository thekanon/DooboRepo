import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Form,
  FormSection,
  FormFooter,
  FormField,
  Input,
  Select,
  Checkbox,
  Radio,
  Button,
  Text,
  Card,
  Alert,
  IconButton,
  InputGroup,
  Badge,
  InfoBox,
} from "@doo/common-ui";

const meta: Meta<typeof Form> = {
  title: "Components/Organisms/Form",
  component: Form,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: { type: "radio" },
      options: ["vertical", "horizontal", "inline"],
      description: "폼 레이아웃 방향",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "폼 요소 크기",
    },
    spacing: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "폼 요소 간 간격",
    },
    align: {
      control: { type: "radio" },
      options: ["start", "center", "end"],
      description: "폼 요소 정렬",
    },
    fullWidth: {
      control: "boolean",
      description: "폼이 전체 너비를 차지할지 여부",
    },
    disabled: {
      control: "boolean",
      description: "폼 비활성화 여부",
    },
    bordered: {
      control: "boolean",
      description: "폼 테두리 표시 여부",
    },
  },
  args: {
    layout: "vertical",
    size: "md",
    spacing: "md",
    align: "start",
    fullWidth: true,
    disabled: false,
    bordered: false,
  },
};

export default meta;
type Story = StoryObj<typeof Form>;

// 기본 폼
export const Default: Story = {
  render: (args) => {
    // 실제 어플리케이션에서는 useForm을 사용하겠지만
    // 스토리북에서는 간단한 상태 관리를 위해 useState만 사용
    const [formState, setFormState] = useState({
      name: "",
      email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    };

    return (
      <Form
        {...args}
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Form submitted with values:", formState);
        }}
      >
        <FormField label="이름" required>
          <Input
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
          />
        </FormField>
        <FormField label="이메일" required>
          <Input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
          />
        </FormField>

        <FormFooter onSubmit={() => {}} submitText="저장" cancelText="취소" />
      </Form>
    );
  },
};

// 다양한 레이아웃
export const Layouts: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div>
        <h3>수직 레이아웃 (Vertical)</h3>
        <Form {...args} layout="vertical">
          <FormField label="제목">
            <Input name="title" placeholder="제목을 입력하세요" />
          </FormField>
          <FormField label="내용">
            <Input name="content" placeholder="내용을 입력하세요" />
          </FormField>
          <FormFooter onSubmit={() => {}} />
        </Form>
      </div>

      <div>
        <h3>수평 레이아웃 (Horizontal)</h3>
        <Form {...args} layout="horizontal" labelWidth="120px">
          <FormField label="제목">
            <Input name="title" placeholder="제목을 입력하세요" />
          </FormField>
          <FormField label="내용">
            <Input name="content" placeholder="내용을 입력하세요" />
          </FormField>
          <FormFooter onSubmit={() => {}} />
        </Form>
      </div>

      <div>
        <h3>인라인 레이아웃 (Inline)</h3>
        <Form {...args} layout="inline">
          <FormField label="제목">
            <Input name="title" placeholder="제목을 입력하세요" />
          </FormField>
          <FormField label="내용">
            <Input name="content" placeholder="내용을 입력하세요" />
          </FormField>
          <FormFooter onSubmit={() => {}} />
        </Form>
      </div>
    </div>
  ),
};

// 폼 섹션으로 구분된 폼
export const WithSections: Story = {
  render: (args) => (
    <Form {...args} bordered onSubmit={(e) => e.preventDefault()}>
      <FormSection
        title="기본 정보"
        description="퀴즈의 기본 정보를 입력하세요"
      >
        <FormField label="퀴즈 제목" required>
          <Input name="title" placeholder="제목을 입력하세요" />
        </FormField>
        <FormField label="퀴즈 설명">
          <textarea
            name="description"
            placeholder="설명을 입력하세요"
            rows={4}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          />
        </FormField>
        <FormField label="카테고리">
          <Select
            name="category"
            options={[
              { value: "mbti", label: "MBTI 테스트" },
              { value: "personality", label: "성격 테스트" },
              { value: "aptitude", label: "적성 테스트" },
              { value: "knowledge", label: "지식 퀴즈" },
            ]}
          />
        </FormField>
      </FormSection>

      <FormSection
        title="공개 설정"
        description="퀴즈 공개 여부 및 기간을 설정하세요"
        collapsible
      >
        <FormField label="공개 여부">
          <Checkbox name="isPublic" label="퀴즈를 공개합니다" />
        </FormField>
        <FormField label="시작일" required>
          <Input name="startDate" type="date" />
        </FormField>
        <FormField label="종료일">
          <Input name="endDate" type="date" />
        </FormField>
      </FormSection>

      <FormFooter onSubmit={() => {}} />
    </Form>
  ),
};

// 복잡한 폼 구조 테스트
export const ComplexForm: Story = {
  render: (args) => (
    <Form {...args} bordered onSubmit={(e) => e.preventDefault()}>
      <FormSection
        title="기본 정보"
        description="퀴즈의 기본 정보를 설정합니다"
      >
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ flex: "2" }}>
            <FormField label="퀴즈 제목" required>
              <Input name="title" defaultValue="MBTI 성격 유형 테스트" />
            </FormField>
          </div>
          <div style={{ flex: "1" }}>
            <FormField label="카테고리">
              <Select
                name="category"
                defaultValue="mbti"
                options={[
                  { value: "mbti", label: "MBTI 테스트" },
                  { value: "personality", label: "성격 테스트" },
                  { value: "aptitude", label: "적성 테스트" },
                ]}
              />
            </FormField>
          </div>
        </div>

        <FormField label="퀴즈 설명">
          <textarea
            name="description"
            defaultValue="나의 진짜 MBTI는?"
            rows={4}
            style={{
              width: "100%",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #d9d9d9",
            }}
          />
        </FormField>

        <FormField label="태그">
          <InputGroup>
            <Input name="tag" placeholder="새 태그 추가" />
            <Button variant="outline">추가</Button>
          </InputGroup>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: "8px",
              flexWrap: "wrap",
            }}
          >
            <Badge variant="primary">성격</Badge>
            <Badge variant="primary">심리</Badge>
            <Badge variant="primary">MBTI</Badge>
          </div>
        </FormField>
      </FormSection>

      <FormSection title="퀴즈 설정" collapsible defaultCollapsed={true}>
        <div style={{ display: "flex", gap: "16px" }}>
          <div style={{ flex: "1" }}>
            <FormField label="배점">
              <InputGroup>
                <Button variant="outline" style={{ width: "40px" }}>
                  -
                </Button>
                <Input
                  name="points"
                  defaultValue="0"
                  style={{ width: "60px", textAlign: "center" }}
                />
                <Button variant="outline" style={{ width: "40px" }}>
                  +
                </Button>
              </InputGroup>
            </FormField>
          </div>
          <div style={{ flex: "1" }}>
            <FormField label="제한 시간(분)">
              <Select
                name="timeLimit"
                defaultValue="5"
                options={[
                  { value: "5", label: "5분" },
                  { value: "10", label: "10분" },
                  { value: "15", label: "15분" },
                  { value: "30", label: "30분" },
                  { value: "0", label: "제한 없음" },
                ]}
              />
            </FormField>
          </div>
        </div>

        <FormField label="문항 순서 섞기">
          <Checkbox
            name="isShuffled"
            label="질문 순서를 무작위로 표시합니다"
            defaultChecked
          />
        </FormField>
      </FormSection>

      <FormSection
        title="결과 유형 관리"
        collapsible
        actions={
          <Button size="sm" variant="outline">
            유형 추가
          </Button>
        }
      >
        <InfoBox variant="info" title="MBTI 유형 안내">
          16가지 MBTI 유형을 모두 설정해주세요. 각 유형별로 결과 설명과 이미지를
          추가할 수 있습니다.
        </InfoBox>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {[
            { type: "INTJ", name: "용의주도한 전략가" },
            { type: "INFJ", name: "선의의 옹호자" },
          ].map((item, index) => (
            <Card key={index} padded>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <Badge variant="primary" size="lg">
                    {item.type}
                  </Badge>
                  <Text weight="semibold">{item.name}</Text>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button size="sm" variant="outline">
                    편집
                  </Button>
                  <Button size="sm" variant="outline">
                    삭제
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </FormSection>

      <FormFooter onSubmit={() => {}} />
    </Form>
  ),
};

// 퀴즈 등록 폼
export const QuizRegistrationForm: Story = {
  render: (args) => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;

    const handleNext = () => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    };

    const handlePrev = () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <div>
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ margin: 0 }}>새 퀴즈 등록</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor:
                      i + 1 === currentStep ? "#1890ff" : "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: i + 1 === currentStep ? "white" : "#666",
                    fontWeight: "bold",
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Form {...args} bordered onSubmit={(e) => e.preventDefault()}>
          {currentStep === 1 && (
            <FormSection
              title="기본 정보"
              description="퀴즈의 기본 정보를 입력하세요"
            >
              <FormField
                label="퀴즈 제목"
                required
                helpText="사용자에게 표시될 퀴즈의 제목을 입력하세요"
              >
                <Input name="title" placeholder="예: 나의 진짜 MBTI 찾기" />
              </FormField>

              <FormField label="퀴즈 유형">
                <Select
                  name="type"
                  defaultValue="mbti"
                  options={[
                    { value: "mbti", label: "MBTI 테스트" },
                    { value: "personality", label: "성격 테스트" },
                    { value: "aptitude", label: "적성 테스트" },
                    { value: "knowledge", label: "지식 퀴즈" },
                  ]}
                />
              </FormField>

              <FormField
                label="퀴즈 설명"
                required
                helpText="퀴즈에 대한 간단한 소개와 목적을 설명하세요"
              >
                <textarea
                  name="description"
                  rows={4}
                  placeholder="예: 10개의 질문으로 알아보는 당신의 진짜 MBTI 유형"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    border: "1px solid #d9d9d9",
                  }}
                />
              </FormField>

              <FormField label="대표 이미지">
                <InputGroup>
                  <Input
                    name="image"
                    readOnly
                    placeholder="이미지를 선택하세요"
                  />
                  <Button variant="outline">파일 선택</Button>
                </InputGroup>
              </FormField>
            </FormSection>
          )}

          {currentStep === 2 && (
            <FormSection
              title="퀴즈 설정"
              description="퀴즈 출제 방식을 설정하세요"
            >
              <FormField label="질문 수" required>
                <Select
                  name="questionCount"
                  defaultValue="10"
                  options={[
                    { value: "5", label: "5문항" },
                    { value: "10", label: "10문항" },
                    { value: "15", label: "15문항" },
                    { value: "20", label: "20문항" },
                  ]}
                />
              </FormField>

              <FormField label="응답 방식">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Checkbox
                    name="responseType"
                    value="twoOptions"
                    label="양자택일형 (2개 선택지)"
                    defaultChecked
                  />
                  <Checkbox
                    name="responseType"
                    value="fourOptions"
                    label="4지선다형 (4개 선택지)"
                  />
                  <Checkbox
                    name="responseType"
                    value="slider"
                    label="슬라이더형 (동의 정도)"
                  />
                </div>
              </FormField>

              <FormField label="결과 유형">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Checkbox name="resultCount" value="4" label="4가지 유형" />
                  <Checkbox name="resultCount" value="8" label="8가지 유형" />
                  <Checkbox
                    name="resultCount"
                    value="16"
                    label="16가지 유형 (MBTI)"
                    defaultChecked
                  />
                </div>
              </FormField>

              <InfoBox variant="info" title="질문 등록 안내">
                퀴즈 생성 후 질문 관리 페이지에서 개별 질문을 등록할 수
                있습니다.
              </InfoBox>
            </FormSection>
          )}

          {currentStep === 3 && (
            <FormSection
              title="공개 설정"
              description="퀴즈 공개 여부 및 기간을 설정하세요"
            >
              <FormField label="공개 여부">
                <Checkbox
                  name="isPublic"
                  label="퀴즈를 공개합니다"
                  defaultChecked
                />
              </FormField>

              <FormField label="시작일" required>
                <Input name="startDate" type="date" />
              </FormField>

              <FormField
                label="종료일"
                helpText="종료일을 설정하지 않으면 무기한 공개됩니다"
              >
                <Input name="endDate" type="date" />
              </FormField>

              <InfoBox variant="info" title="주의사항">
                <Text>
                  - 공개된 퀴즈는 모든 사용자가 접근할 수 있습니다.
                  <br />- 등록 후에도 퀴즈 관리 페이지에서 설정을 변경할 수
                  있습니다.
                </Text>
              </InfoBox>
            </FormSection>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "24px",
            }}
          >
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              이전
            </Button>
            <div>
              {currentStep < totalSteps ? (
                <Button variant="primary" onClick={handleNext}>
                  다음
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={() => console.log("퀴즈 등록")}
                >
                  퀴즈 등록
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>
    );
  },
};

// 블로그 포스트 작성 폼
export const BlogPostForm: Story = {
  render: (args) => {
    return (
      <div>
        <h2>블로그 포스트 작성</h2>

        <Form {...args} bordered onSubmit={(e) => e.preventDefault()}>
          <div style={{ marginBottom: "16px" }}>
            <FormField label="제목" required>
              <Input name="title" placeholder="제목을 입력하세요" />
            </FormField>
          </div>

          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div style={{ flex: "1" }}>
              <FormField label="카테고리" required>
                <Select
                  name="category"
                  options={[
                    { value: "mbti", label: "MBTI" },
                    { value: "personality", label: "성격 심리학" },
                    { value: "career", label: "커리어" },
                    { value: "relationship", label: "인간관계" },
                  ]}
                  placeholder="카테고리 선택"
                />
              </FormField>
            </div>
            <div style={{ flex: "1" }}>
              <FormField label="태그">
                <InputGroup>
                  <Input name="tag" placeholder="태그 입력 후 Enter" />
                </InputGroup>
              </FormField>
            </div>
          </div>

          <FormField label="내용" required>
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "4px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "16px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "8px",
                }}
              >
                <Button variant="outline" size="sm">
                  B
                </Button>
                <Button variant="outline" size="sm">
                  I
                </Button>
                <Button variant="outline" size="sm">
                  U
                </Button>
                <Button variant="outline" size="sm">
                  H1
                </Button>
                <Button variant="outline" size="sm">
                  H2
                </Button>
                <Button variant="outline" size="sm">
                  []
                </Button>
                <Button variant="outline" size="sm">
                  🔗
                </Button>
                <Button variant="outline" size="sm">
                  🖼️
                </Button>
              </div>
              <textarea
                name="content"
                rows={12}
                style={{
                  width: "100%",
                  border: "none",
                  resize: "vertical",
                }}
                placeholder="내용을 입력하세요. 마크다운 문법을 지원합니다."
              />
            </div>
          </FormField>

          <FormSection title="발행 설정" collapsible>
            <FormField label="발행 상태">
              <Checkbox name="isPublished" label="즉시 발행" />
            </FormField>

            <FormField label="발행 예약">
              <Input
                name="publishDate"
                type="date"
                defaultValue={new Date().toISOString().substring(0, 10)}
              />
            </FormField>

            <FormField label="공개 범위">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Checkbox
                  name="visibility"
                  value="public"
                  label="전체 공개"
                  defaultChecked
                />
                <Checkbox name="visibility" value="members" label="회원 공개" />
                <Checkbox name="visibility" value="private" label="비공개" />
              </div>
            </FormField>
          </FormSection>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <div>
              <Badge variant="info">마크다운 지원</Badge>
              <Badge variant="secondary">자동 저장됨</Badge>
            </div>
            <Button type="button" variant="outline">
              미리보기
            </Button>
          </div>

          <FormFooter
            onSubmit={() => {}}
            submitText="발행하기"
            cancelText="임시저장"
          />
        </Form>
      </div>
    );
  },
};

// MBTI 테스트 결과 설정 폼
export const MBTIResultConfigForm: Story = {
  render: (args) => {
    const mbtiTypes = [
      { code: "INTJ", name: "용의주도한 전략가" },
      { code: "INTP", name: "논리적인 사색가" },
      { code: "ENTJ", name: "대담한 통솔자" },
      { code: "ENTP", name: "뜨거운 논쟁을 즐기는 변론가" },
    ];

    return (
      <div>
        <h2>MBTI 결과 유형 설정</h2>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <Card style={{ width: "200px", padding: "16px" }}>
            <Text weight="semibold">MBTI 유형 선택</Text>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              {mbtiTypes.map((type) => (
                <Button
                  key={type.code}
                  variant={type.code === "INTJ" ? "primary" : "outline"}
                  size="sm"
                >
                  {type.code}
                </Button>
              ))}
              <Button variant="outline" size="sm">
                + 더 보기
              </Button>
            </div>
          </Card>

          <div style={{ flex: 1 }}>
            <Form {...args} bordered onSubmit={(e) => e.preventDefault()}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <Text weight="bold" size="lg">
                  INTJ 유형 설정
                </Text>
                <Badge variant="primary" size="lg">
                  INTJ
                </Badge>
              </div>

              <FormField
                label="유형 제목"
                required
                helpText="이 MBTI 유형을 대표하는 문구나 별명"
              >
                <Input name="title" defaultValue="용의주도한 전략가" />
              </FormField>

              <FormField label="유형 설명" required>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue="역량 있는 INTJ는 상상력이 풍부하면서도 결단력이 있으며, 야망이 크고 놀라울 정도로 독립적입니다."
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    border: "1px solid #d9d9d9",
                  }}
                />
              </FormField>

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <FormField label="강점">
                    <Input
                      name="strengths"
                      defaultValue="전략적 사고, 독립성, 합리적 결정, 통찰력"
                    />
                  </FormField>
                </div>

                <div style={{ flex: 1 }}>
                  <FormField label="약점">
                    <Input
                      name="weaknesses"
                      defaultValue="냉정해 보일 수 있음, 지나치게 비판적, 고집이 셈"
                    />
                  </FormField>
                </div>
              </div>

              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ flex: 1 }}>
                  <FormField label="적합한 직업">
                    <Input
                      name="careers"
                      defaultValue="과학자, 엔지니어, 법률가, 프로그래머, 사업 분석가"
                    />
                  </FormField>
                </div>

                <div style={{ flex: 1 }}>
                  <FormField label="대인 관계">
                    <Input
                      name="relationships"
                      defaultValue="깊이 있는 대화와 지적 도전을 중요시함"
                    />
                  </FormField>
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}
              >
                <div style={{ flex: 1 }}>
                  <FormField label="테마 색상">
                    <InputGroup>
                      <Input
                        name="color"
                        type="color"
                        style={{ width: "50px", padding: "2px" }}
                        defaultValue="#3498db"
                      />
                      <Input name="colorHex" value="#3498db" readOnly />
                    </InputGroup>
                  </FormField>
                </div>

                <div style={{ flex: 1 }}>
                  <FormField label="결과 공개 여부">
                    <Checkbox
                      name="isVisible"
                      label="이 결과 유형을 사용자에게 표시합니다"
                      defaultChecked
                    />
                  </FormField>
                </div>
              </div>

              <FormSection title="결과 이미지" collapsible>
                <div
                  style={{
                    textAlign: "center",
                    padding: "20px",
                    border: "2px dashed #d9d9d9",
                    borderRadius: "8px",
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "10px" }}>
                    🖼️
                  </div>
                  <Text>결과 이미지를 여기에 드래그하거나</Text>
                  <Button variant="outline" style={{ marginTop: "10px" }}>
                    이미지 선택
                  </Button>
                </div>
                <Text size="sm" color="secondary" style={{ marginTop: "8px" }}>
                  권장 크기: 800x600px, 최대 2MB
                </Text>
              </FormSection>

              <div style={{ marginTop: "24px" }}>
                <Button type="submit" variant="primary">
                  변경사항 저장
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  },
};

// 퀴즈 통계 필터 설정 폼
export const QuizStatisticsFilterForm: Story = {
  render: (args) => {
    return (
      <div>
        <h2>퀴즈 통계 설정</h2>

        <Form
          {...args}
          bordered
          layout="horizontal"
          labelWidth="120px"
          onSubmit={(e) => e.preventDefault()}
        >
          <FormField label="기간">
            <Select
              name="dateRange"
              defaultValue="last30days"
              options={[
                { value: "today", label: "오늘" },
                { value: "last7days", label: "최근 7일" },
                { value: "last30days", label: "최근 30일" },
                { value: "thisMonth", label: "이번 달" },
                { value: "custom", label: "직접 지정" },
              ]}
            />
          </FormField>

          <FormField label="연령대">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              <Checkbox
                name="ageGroups"
                value="all"
                label="전체"
                defaultChecked
              />
              <Checkbox name="ageGroups" value="10s" label="10대" />
              <Checkbox name="ageGroups" value="20s" label="20대" />
              <Checkbox name="ageGroups" value="30s" label="30대" />
              <Checkbox name="ageGroups" value="40s" label="40대" />
              <Checkbox name="ageGroups" value="50plus" label="50대 이상" />
            </div>
          </FormField>

          <FormField label="성별">
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Checkbox name="gender" value="all" label="전체" defaultChecked />
              <Checkbox name="gender" value="male" label="남성" />
              <Checkbox name="gender" value="female" label="여성" />
              <Checkbox name="gender" value="other" label="기타" />
            </div>
          </FormField>

          <FormField label="결과 유형">
            <div>
              <InputGroup>
                <Select
                  name="resultType"
                  options={[
                    { value: "", label: "결과 유형 선택" },
                    { value: "INTJ", label: "INTJ - 용의주도한 전략가" },
                    { value: "INTP", label: "INTP - 논리적인 사색가" },
                    { value: "ENTJ", label: "ENTJ - 대담한 통솔자" },
                    {
                      value: "ENTP",
                      label: "ENTP - 뜨거운 논쟁을 즐기는 변론가",
                    },
                  ]}
                />
                <Button variant="outline">추가</Button>
              </InputGroup>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "8px",
                  flexWrap: "wrap",
                }}
              >
                <Badge variant="primary">INTJ</Badge>
                <Badge variant="primary">ENTJ</Badge>
              </div>
            </div>
          </FormField>

          <FormField label="집계 단위">
            <Select
              name="groupBy"
              defaultValue="daily"
              options={[
                { value: "daily", label: "일별" },
                { value: "weekly", label: "주별" },
                { value: "monthly", label: "월별" },
              ]}
            />
          </FormField>

          <div style={{ marginTop: "16px" }}>
            <InfoBox variant="info" title="통계 데이터 안내">
              <Text>
                - 최대 6개월 치의 데이터를 조회할 수 있습니다.
                <br />
                - 사용자가 설문 참여 시 입력한 정보를 기준으로 필터링합니다.
                <br />- 익명으로 제출된 응답은 '전체' 카테고리에만 포함됩니다.
              </Text>
            </InfoBox>
          </div>

          <div
            style={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="outline" style={{ marginRight: "8px" }}>
              초기화
            </Button>
            <Button variant="primary">필터 적용</Button>
          </div>
        </Form>
        <FormFooter onSubmit={() => {}} />

        <div
          style={{
            marginTop: "24px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "40px", marginBottom: "10px" }}>📊</div>
          <Text>필터를 적용하면 이 영역에 통계 차트가 표시됩니다.</Text>
        </div>
      </div>
    );
  },
};

// 퀴즈 결과 시나리오 설정
export const QuizResultScenarioForm: Story = {
  render: (args) => {
    return (
      <div>
        <h2>퀴즈 결과 시나리오 설정</h2>

        <Form {...args} bordered onSubmit={(e) => e.preventDefault()}>
          <FormSection
            title="기본 설정"
            description="퀴즈 결과에 대한 기본 정보를 설정합니다"
          >
            <FormField label="결과 제목" required>
              <Input
                name="title"
                defaultValue="당신은 어떤 유형의 리더인가요?"
              />
            </FormField>

            <FormField label="결과 표시 방식">
              <Select
                name="displayType"
                defaultValue="personality"
                options={[
                  { value: "personality", label: "성격 유형" },
                  { value: "percentage", label: "백분율 점수" },
                  { value: "range", label: "범위 구간" },
                  { value: "character", label: "캐릭터 매칭" },
                ]}
              />
            </FormField>

            <FormField label="소셜 공유 활성화">
              <Checkbox
                name="enableSharing"
                label="결과 공유 기능 활성화"
                defaultChecked
              />
            </FormField>
          </FormSection>

          <FormSection
            title="결과 유형 관리"
            description="사용자에게 표시할 결과 유형을 설정합니다"
            collapsible
          >
            <div style={{ marginBottom: "16px" }}>
              <Button variant="outline" size="sm">
                + 새 결과 유형 추가
              </Button>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[
                {
                  id: 1,
                  title: "카리스마 리더",
                  score: "80-100점",
                  image: "leader1.jpg",
                },
                {
                  id: 2,
                  title: "민주적 리더",
                  score: "60-79점",
                  image: "leader2.jpg",
                },
                {
                  id: 3,
                  title: "코칭 리더",
                  score: "40-59점",
                  image: "leader3.jpg",
                },
                {
                  id: 4,
                  title: "비전 리더",
                  score: "0-39점",
                  image: "leader4.jpg",
                },
              ].map((result) => (
                <Card key={result.id} padded>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        backgroundColor: "#f0f0f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <Text size="lg">🖼️</Text>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text weight="bold">{result.title}</Text>
                      <Text color="secondary" size="sm">
                        {result.score}
                      </Text>
                      <Text size="sm" style={{ marginTop: "8px" }}>
                        이 유형에는{" "}
                        {result.id === 1
                          ? "10%"
                          : result.id === 2
                            ? "25%"
                            : result.id === 3
                              ? "40%"
                              : "25%"}
                        의 사용자가 해당됩니다.
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        alignItems: "flex-start",
                      }}
                    >
                      <Button size="sm" variant="outline">
                        편집
                      </Button>
                      <Button size="sm" variant="outline">
                        삭제
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </FormSection>

          <FormSection title="결과 페이지 설정" collapsible>
            <FormField label="추천 퀴즈 표시">
              <Checkbox
                name="showRecommended"
                label="결과 페이지에 관련 퀴즈 추천"
                defaultChecked
              />
            </FormField>

            <FormField label="결과 상세도">
              <Select
                name="detailLevel"
                defaultValue="detailed"
                options={[
                  { value: "simple", label: "간단 (유형만 표시)" },
                  { value: "standard", label: "표준 (유형 + 간단 설명)" },
                  {
                    value: "detailed",
                    label: "상세 (유형 + 상세 설명 + 차트)",
                  },
                ]}
              />
            </FormField>

            <FormField label="결과 페이지 배경">
              <Select
                name="resultBackground"
                defaultValue="color"
                options={[
                  { value: "color", label: "유형별 색상" },
                  { value: "image", label: "유형별 이미지" },
                  { value: "gradient", label: "그라데이션" },
                  { value: "none", label: "기본 (흰색)" },
                ]}
              />
            </FormField>

            <FormField label="사용자 정보 수집">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Checkbox
                  name="collectEmail"
                  label="이메일 주소"
                  defaultChecked
                />
                <Checkbox name="collectName" label="이름" />
                <Checkbox name="collectAge" label="연령대" defaultChecked />
                <Checkbox name="collectGender" label="성별" defaultChecked />
              </div>
            </FormField>
          </FormSection>

          <FormFooter onSubmit={() => {}} />
        </Form>
      </div>
    );
  },
};
