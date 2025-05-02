import React, { useState, ChangeEvent } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  FormField,
  Input,
  Select,
  Checkbox,
  Radio,
  Button,
  InputGroup,
  Text,
} from "@doo/common-ui";

const meta: Meta<typeof FormField> = {
  title: "Components/Molecules/FormField",
  component: FormField,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    label: { control: "text" },
    helpText: { control: "text" },
    error: { control: "text" },
    required: { control: "boolean" },
    labelPosition: { control: "radio", options: ["top", "side", "inside"] },
    labelWidth: { control: "text" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    compact: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

// 기본 예시
export const BasicUsage: Story = {
  args: {
    label: "퀴즈 제목",
    helpText: "퀴즈의 주제를 간결하게 표현하는 제목을 입력하세요",
    required: true,
  },
  render: (args) => (
    <FormField {...args}>
      <Input id="quiz-title" placeholder="MBTI 성격 유형 테스트" />
    </FormField>
  ),
};

// 퀴즈 생성 폼 예시
export const QuizCreationForm: Story = {
  render: () => {
    // 폼 상태 타입 정의
    interface FormState {
      title: string;
      description: string;
      category: string;
      difficulty: string;
      timeLimit: string;
      isPublic: boolean;
      allowComments: boolean;
      showResultsImmediately: boolean;
      requireLogin: boolean;
      tags: string[];
    }

    // 에러 상태 타입 정의
    interface FormErrors {
      title?: string;
      description?: string;
      category?: string;
      [key: string]: string | undefined;
    }

    const [formState, setFormState] = useState<FormState>({
      title: "",
      description: "",
      category: "",
      difficulty: "medium",
      timeLimit: "0",
      isPublic: true,
      allowComments: true,
      showResultsImmediately: true,
      requireLogin: false,
      tags: [],
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // 타입 안전한 이벤트 핸들러
    const handleChange =
      (field: keyof FormState) =>
      (
        e: ChangeEvent<
          HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
      ) => {
        const value =
          e.target.type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

        setFormState({
          ...formState,
          [field]: value,
        });

        // 필드 변경 시 해당 에러 메시지 초기화
        if (errors[field]) {
          setErrors({
            ...errors,
            [field]: undefined,
          });
        }
      };

    // 태그 처리 핸들러
    const handleTagChange =
      (value: string) => (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        const current = [...formState.tags];

        if (isChecked && !current.includes(value)) {
          current.push(value);
        } else if (!isChecked && current.includes(value)) {
          const index = current.indexOf(value);
          current.splice(index, 1);
        }

        setFormState({
          ...formState,
          tags: current,
        });
      };

    const validateForm = (): boolean => {
      const newErrors: FormErrors = {};
      let isValid = true;

      if (!formState.title) {
        newErrors.title = "퀴즈 제목을 입력해주세요.";
        isValid = false;
      }

      if (!formState.description) {
        newErrors.description = "퀴즈 설명을 입력해주세요.";
        isValid = false;
      }

      if (!formState.category) {
        newErrors.category = "카테고리를 선택해주세요.";
        isValid = false;
      }

      setErrors(newErrors);
      return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        alert("퀴즈 생성 성공!\n" + JSON.stringify(formState, null, 2));
      }
    };

    return (
      <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2>새 퀴즈 만들기</h2>
          <Text color="secondary">
            DooMBTI에 새로운 퀴즈를 등록하기 위한 기본 정보를 입력해주세요.
          </Text>
        </div>

        <FormField
          label="퀴즈 제목"
          required
          error={errors.title}
          style={{ marginBottom: "16px" }}
        >
          <Input
            id="title"
            placeholder="예: 당신의 개발자 유형 테스트"
            value={formState.title}
            onChange={handleChange("title")}
          />
        </FormField>

        <FormField
          label="퀴즈 설명"
          required
          error={errors.description}
          helpText="퀴즈의 목적과 내용을 간략히 설명해주세요"
          style={{ marginBottom: "16px" }}
        >
          <textarea
            id="description"
            style={{
              width: "680px",
              height: "120px",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #d4d4d4",
              fontFamily: "inherit",
              resize: "vertical",
            }}
            placeholder="이 테스트는 당신이 어떤 유형의 개발자인지 알아보는 테스트입니다..."
            value={formState.description}
            onChange={handleChange("description")}
          />
        </FormField>

        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <FormField
            label="카테고리"
            required
            error={errors.category}
            style={{ flex: 1 }}
          >
            <Select
              id="category"
              options={[
                { value: "", label: "카테고리 선택" },
                { value: "personality", label: "성격" },
                { value: "career", label: "직업" },
                { value: "entertainment", label: "엔터테인먼트" },
                { value: "knowledge", label: "지식" },
                { value: "lifestyle", label: "라이프스타일" },
              ]}
              value={formState.category}
              onChange={handleChange("category")}
            />
          </FormField>

          <FormField label="난이도" style={{ flex: 1 }}>
            <Select
              id="difficulty"
              options={[
                { value: "easy", label: "쉬움" },
                { value: "medium", label: "보통" },
                { value: "hard", label: "어려움" },
              ]}
              value={formState.difficulty}
              onChange={handleChange("difficulty")}
            />
          </FormField>
        </div>

        <FormField
          label="시간 제한 (분)"
          helpText="0은 시간 제한 없음을 의미합니다"
          style={{ marginBottom: "16px" }}
        >
          <Input
            id="timeLimit"
            type="number"
            min="0"
            max="60"
            value={formState.timeLimit}
            onChange={handleChange("timeLimit")}
          />
        </FormField>

        <FormField
          label="태그"
          helpText="퀴즈를 설명하는 태그를 선택해주세요"
          style={{ marginBottom: "24px" }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <Checkbox
              id="tag-mbti"
              label="MBTI"
              checked={formState.tags.includes("mbti")}
              onChange={handleTagChange("mbti")}
            />
            <Checkbox
              id="tag-psychology"
              label="심리학"
              checked={formState.tags.includes("psychology")}
              onChange={handleTagChange("psychology")}
            />
            <Checkbox
              id="tag-developer"
              label="개발자"
              checked={formState.tags.includes("developer")}
              onChange={handleTagChange("developer")}
            />
            <Checkbox
              id="tag-career"
              label="직업"
              checked={formState.tags.includes("career")}
              onChange={handleTagChange("career")}
            />
            <Checkbox
              id="tag-fun"
              label="재미"
              checked={formState.tags.includes("fun")}
              onChange={handleTagChange("fun")}
            />
            <Checkbox
              id="tag-education"
              label="교육"
              checked={formState.tags.includes("education")}
              onChange={handleTagChange("education")}
            />
          </div>
        </FormField>

        <FormField label="퀴즈 옵션" style={{ marginBottom: "24px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Checkbox
              id="isPublic"
              label="공개 퀴즈로 설정 (검색 결과에 표시됨)"
              checked={formState.isPublic}
              onChange={handleChange("isPublic")}
            />
            <Checkbox
              id="allowComments"
              label="댓글 허용"
              checked={formState.allowComments}
              onChange={handleChange("allowComments")}
            />
            <Checkbox
              id="showResultsImmediately"
              label="결과 즉시 표시"
              checked={formState.showResultsImmediately}
              onChange={handleChange("showResultsImmediately")}
            />
            <Checkbox
              id="requireLogin"
              label="로그인 필요"
              checked={formState.requireLogin}
              onChange={handleChange("requireLogin")}
            />
          </div>
        </FormField>

        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}
        >
          <Button variant="outline" type="button">
            임시 저장
          </Button>
          <Button variant="primary" type="submit">
            다음: 질문 추가
          </Button>
        </div>
      </form>
    );
  },
};

// 퀴즈 질문 추가 폼 예시
export const QuizQuestionForm: Story = {
  render: () => {
    const [questionType, setQuestionType] = useState<string>("multiple-choice");
    const [options, setOptions] = useState<
      Array<{ id: number; text: string; isCorrect: boolean }>
    >([
      { id: 1, text: "", isCorrect: false },
      { id: 2, text: "", isCorrect: false },
      { id: 3, text: "", isCorrect: false },
      { id: 4, text: "", isCorrect: false },
    ]);

    const handleQuestionTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
      setQuestionType(e.target.value);
    };

    const handleOptionChange =
      (id: number, field: "text" | "isCorrect") =>
      (e: ChangeEvent<HTMLInputElement>) => {
        const value = field === "isCorrect" ? e.target.checked : e.target.value;

        setOptions(
          options.map((option) =>
            option.id === id
              ? { ...option, [field]: value }
              : field === "isCorrect" && value === true
                ? { ...option, isCorrect: false }
                : option
          )
        );
      };

    const addOption = () => {
      const newId = Math.max(...options.map((o) => o.id), 0) + 1;
      setOptions([...options, { id: newId, text: "", isCorrect: false }]);
    };

    const removeOption = (id: number) => {
      if (options.length > 2) {
        setOptions(options.filter((option) => option.id !== id));
      }
    };

    return (
      <div style={{ maxWidth: "700px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2>질문 추가</h2>
          <Text color="secondary">
            퀴즈에 포함될 질문과 선택지를 입력해주세요.
          </Text>
        </div>

        <FormField label="질문 유형" style={{ marginBottom: "16px" }}>
          <Select
            id="question-type"
            value={questionType}
            onChange={handleQuestionTypeChange}
            options={[
              { value: "multiple-choice", label: "객관식 (단일 선택)" },
              { value: "multiple-answer", label: "객관식 (다중 선택)" },
              { value: "true-false", label: "참/거짓" },
              { value: "mbti-type", label: "MBTI 유형 질문" },
            ]}
          />
        </FormField>

        <FormField label="질문 내용" required style={{ marginBottom: "16px" }}>
          <textarea
            style={{
              width: "675px",
              height: "100px",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #d4d4d4",
              fontFamily: "inherit",
              resize: "vertical",
            }}
            placeholder="예: 팀 프로젝트에서 당신이 선호하는 역할은 무엇인가요?"
          />
        </FormField>

        {questionType === "true-false" ? (
          <FormField label="정답" required style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", gap: "16px" }}>
              <Radio
                id="answer-true"
                name="true-false-answer"
                label="참"
                value="true"
              />
              <Radio
                id="answer-false"
                name="true-false-answer"
                label="거짓"
                value="false"
              />
            </div>
          </FormField>
        ) : (
          <FormField
            label={questionType === "mbti-type" ? "MBTI 선택지" : "선택지"}
            required
            helpText={
              questionType === "multiple-choice"
                ? "정답인 항목 하나만 선택해주세요"
                : questionType === "multiple-answer"
                  ? "정답인 항목을 모두 선택해주세요"
                  : "각 선택지가 나타내는 MBTI 특성을 선택해주세요"
            }
            style={{ marginBottom: "24px" }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {options.map((option) => (
                <div
                  key={option.id}
                  style={{ display: "flex", gap: "12px", alignItems: "center" }}
                >
                  <Input
                    placeholder={`선택지 ${option.id}`}
                    value={option.text}
                    onChange={handleOptionChange(option.id, "text")}
                    style={{ flex: 1 }}
                  />

                  {questionType === "mbti-type" ? (
                    <Select
                      options={[
                        { value: "E", label: "E (외향)" },
                        { value: "I", label: "I (내향)" },
                        { value: "S", label: "S (감각)" },
                        { value: "N", label: "N (직관)" },
                        { value: "T", label: "T (사고)" },
                        { value: "F", label: "F (감정)" },
                        { value: "J", label: "J (판단)" },
                        { value: "P", label: "P (인식)" },
                      ]}
                      style={{ width: "120px" }}
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        width: "80px",
                      }}
                    >
                      <Checkbox
                        checked={option.isCorrect}
                        onChange={handleOptionChange(option.id, "isCorrect")}
                        label={
                          questionType === "multiple-choice"
                            ? "정답"
                            : "정답 포함"
                        }
                      />
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    onClick={() => removeOption(option.id)}
                    disabled={options.length <= 2}
                    style={{ flexShrink: 0 }}
                  >
                    삭제
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                style={{ alignSelf: "flex-start" }}
              >
                + 선택지 추가
              </Button>
            </div>
          </FormField>
        )}

        <FormField
          label="설명 (선택사항)"
          helpText="퀴즈 결과 시 표시될 설명이나 부연 설명을 입력하세요"
          style={{ marginBottom: "24px" }}
        >
          <textarea
            style={{
              width: "675px",
              height: "80px",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #d4d4d4",
              fontFamily: "inherit",
              resize: "vertical",
            }}
            placeholder="예: 이 질문은 당신의 협업 스타일을 파악하기 위한 것입니다."
          />
        </FormField>

        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <FormField label="난이도" style={{ flex: 1 }}>
            <Select
              options={[
                { value: "easy", label: "쉬움" },
                { value: "medium", label: "보통" },
                { value: "hard", label: "어려움" },
              ]}
              defaultValue="medium"
            />
          </FormField>

          <FormField label="배점" helpText="기본값: 1점" style={{ flex: 1 }}>
            <Input type="number" min="1" max="10" defaultValue="1" />
          </FormField>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "32px",
          }}
        >
          <Button variant="outline">이전 질문</Button>
          <div style={{ display: "flex", gap: "12px" }}>
            <Button variant="outline">임시 저장</Button>
            <Button variant="primary">다음 질문 추가</Button>
          </div>
        </div>
      </div>
    );
  },
};

// 블로그 글 작성 폼 예시
export const BlogPostForm: Story = {
  render: () => {
    return (
      <div style={{ maxWidth: "800px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2>블로그 글 작성</h2>
          <Text color="secondary">
            DooMBTI 블로그에 새로운 글을 작성해주세요.
          </Text>
        </div>

        <FormField label="제목" required style={{ marginBottom: "16px" }}>
          <Input id="blog-title" placeholder="나만의 MBTI 테스트 만드는 방법" />
        </FormField>

        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          <FormField label="카테고리" required style={{ flex: 1 }}>
            <Select
              id="blog-category"
              options={[
                { value: "", label: "카테고리 선택" },
                { value: "tutorials", label: "튜토리얼" },
                { value: "case-studies", label: "사례 연구" },
                { value: "psychology", label: "심리학" },
                { value: "news", label: "뉴스" },
                { value: "updates", label: "업데이트" },
              ]}
            />
          </FormField>

          <FormField label="상태" style={{ flex: 1 }}>
            <Select
              id="blog-status"
              options={[
                { value: "draft", label: "임시 저장" },
                { value: "review", label: "검토 요청" },
                { value: "published", label: "발행" },
                { value: "scheduled", label: "예약 발행" },
              ]}
              defaultValue="draft"
            />
          </FormField>
        </div>

        <FormField
          label="요약"
          helpText="글의 주요 내용을 간략히 요약해주세요 (최대 150자)"
          style={{ marginBottom: "16px" }}
        >
          <textarea
            style={{
              width: "97%",
              height: "80px",
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #d4d4d4",
              fontFamily: "inherit",
              resize: "vertical",
            }}
            placeholder="이 글에서는 나만의 MBTI 테스트를 만드는 방법에 대해 단계별로 설명합니다."
          />
        </FormField>

        <FormField label="내용" required style={{ marginBottom: "24px" }}>
          <div
            style={{
              border: "1px solid #d4d4d4",
              borderRadius: "4px",
              padding: "8px",
              minHeight: "300px",
            }}
          >
            <div
              style={{
                padding: "8px",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "8px",
              }}
            >
              <Button
                variant="outline"
                size="sm"
                style={{ marginRight: "8px" }}
              >
                서식
              </Button>
              <Button
                variant="outline"
                size="sm"
                style={{ marginRight: "8px" }}
              >
                이미지
              </Button>
              <Button
                variant="outline"
                size="sm"
                style={{ marginRight: "8px" }}
              >
                링크
              </Button>
              <Button variant="outline" size="sm">
                코드
              </Button>
            </div>
            <textarea
              style={{
                width: "680px",
                height: "250px",
                padding: "8px",
                border: "none",
                outline: "none",
                fontFamily: "inherit",
                resize: "vertical",
              }}
              placeholder="여기에 블로그 내용을 작성하세요..."
            />
          </div>
        </FormField>

        <FormField
          label="태그"
          helpText="쉼표로 구분하여 입력하세요"
          style={{ marginBottom: "16px" }}
        >
          <Input id="blog-tags" placeholder="mbti, 테스트, 튜토리얼, 심리학" />
        </FormField>

        <FormField label="대표 이미지" style={{ marginBottom: "24px" }}>
          <InputGroup>
            <Input readOnly value="이미지를 선택하세요" style={{ flex: 1 }} />
            <Button variant="outline" style={{ flexShrink: 0 }}>
              파일 선택
            </Button>
          </InputGroup>
        </FormField>

        <FormField style={{ marginBottom: "16px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Checkbox id="allow-comments" label="댓글 허용" defaultChecked />
            <Checkbox id="featured" label="메인 페이지에 추천 글로 표시" />
            <Checkbox id="newsletter" label="뉴스레터에 포함" />
          </div>
        </FormField>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "24px",
          }}
        >
          <Button variant="outline">임시 저장</Button>
          <Button variant="outline">미리보기</Button>
          <Button variant="primary">발행</Button>
        </div>
      </div>
    );
  },
};

// 퀴즈 결과 관리 예시
export const QuizResultsForm: Story = {
  render: () => {
    const [resultCount, setResultCount] = useState<number>(4);

    const addResult = () => {
      setResultCount((prevCount) => prevCount + 1);
    };

    return (
      <div style={{ maxWidth: "700px" }}>
        <div style={{ marginBottom: "24px" }}>
          <h2>MBTI 퀴즈 결과 설정</h2>
          <Text color="secondary">
            테스트 결과에 표시될 각 유형별 설명과 이미지를 설정해주세요.
          </Text>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {Array.from({ length: resultCount }).map((_, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#f9fafb",
              }}
            >
              <h3 style={{ marginTop: 0, marginBottom: "16px" }}>
                결과 유형 #{index + 1}
              </h3>

              <FormField
                label="유형 코드"
                required
                style={{ marginBottom: "16px" }}
              >
                <Input placeholder="예: INTJ, 개발자형, 리더형 등" />
              </FormField>

              <FormField
                label="유형 제목"
                required
                style={{ marginBottom: "16px" }}
              >
                <Input placeholder="예: 용의주도한 전략가" />
              </FormField>

              <FormField
                label="유형 설명"
                required
                style={{ marginBottom: "16px" }}
              >
                <textarea
                  style={{
                    width: "640px",
                    height: "120px",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    border: "1px solid #d4d4d4",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                  placeholder="이 유형의 특징과 성향에 대한 설명을 작성하세요..."
                />
              </FormField>

              <div
                style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
              >
                <FormField label="대표 이미지" style={{ flex: 2 }}>
                  <InputGroup>
                    <Input readOnly value="이미지를 선택하세요" />
                    <Button variant="outline" style={{ flexShrink: 0 }}>
                      파일 선택
                    </Button>
                  </InputGroup>
                </FormField>

                <FormField label="색상" style={{ flex: 1 }}>
                  <Input type="color" defaultValue="#4F46E5" />
                </FormField>
              </div>

              <FormField
                label="유형 키워드"
                helpText="쉼표로 구분하여 입력하세요"
                style={{ marginBottom: "16px" }}
              >
                <Input placeholder="예: 분석적, 논리적, 독립적, 완벽주의" />
              </FormField>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "16px" }}>
          <Button variant="outline" onClick={addResult}>
            + 결과 유형 추가
          </Button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          <Button variant="outline">이전</Button>
          <Button variant="primary">저장 및 완료</Button>
        </div>
      </div>
    );
  },
};
