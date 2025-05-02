import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import {
  InputGroup,
  Input,
  Button,
  Select,
  Checkbox,
  Text,
} from "@doo/common-ui";

const meta: Meta<typeof InputGroup> = {
  title: "Components/Molecules/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "padded",
  },
  args: {
    // 기본 args 설정
    direction: "horizontal",
    spacing: "md",
    fullWidth: true,
    disabled: false,
    uniformSize: false,
  },
  argTypes: {
    direction: { control: "radio", options: ["horizontal", "vertical"] },
    spacing: { control: "radio", options: ["sm", "md", "lg"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    uniformSize: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

// 기본 수평 InputGroup
export const HorizontalInputs: Story = {
  render: (args) => (
    <InputGroup {...args}>
      <Input placeholder="퀴즈 ID" />
      <Input placeholder="퀴즈 제목" />
      <Input placeholder="작성자" />
    </InputGroup>
  ),
};

// 기본 수직 InputGroup
export const VerticalInputs: Story = {
  args: {
    direction: "vertical",
  },
  render: (args) => (
    <InputGroup {...args}>
      <Input placeholder="퀴즈 ID" />
      <Input placeholder="퀴즈 제목" />
      <Input placeholder="작성자" />
    </InputGroup>
  ),
};

// 퀴즈 검색 폼 InputGroup
export const QuizSearchForm: Story = {
  args: {
    direction: "horizontal",
    spacing: "sm",
  },
  render: (args) => {
    const [searchText, setSearchText] = useState("");
    const [searchType, setSearchType] = useState("all");

    const handleSearchTypeChange = (
      e: React.ChangeEvent<HTMLSelectElement>
    ) => {
      setSearchType(e.target.value);
    };

    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
    };

    return (
      <InputGroup {...args}>
        <div style={{ width: "120px", flexShrink: 0 }}>
          <Select
            options={[
              { value: "all", label: "전체" },
              { value: "title", label: "퀴즈 제목" },
              { value: "question", label: "질문 내용" },
              { value: "creator", label: "제작자" },
              { value: "tag", label: "태그" },
            ]}
            value={searchType}
            onChange={handleSearchTypeChange}
            fullWidth
          />
        </div>
        <Input
          placeholder="검색어를 입력하세요"
          value={searchText}
          onChange={handleSearchTextChange}
          style={{ flex: 1 }}
        />
        <Button variant="primary" style={{ flexShrink: 0 }}>
          검색
        </Button>
      </InputGroup>
    );
  },
};

// 블로그 URL 커스텀 설정
export const BlogUrlCustomizer: Story = {
  render: (args) => {
    // prefix와 suffix는 컨트롤 패널에서 직접 조작할 수 없으므로 이렇게 추가
    const storyArgs = {
      ...args,
      prefix: (
        <Text
          as="span"
          style={{ whiteSpace: "nowrap", margin: "0 8px" }}
          verticalAlign="center"
        >
          https://
        </Text>
      ),
      suffix: (
        <Text
          as="span"
          style={{ whiteSpace: "nowrap", margin: "0 8px" }}
          verticalAlign="center"
        >
          .doombti.vercel.app
        </Text>
      ),
    };

    return (
      <InputGroup {...storyArgs}>
        <Input placeholder="my-blog-name" />
      </InputGroup>
    );
  },
};

// 퀴즈 이미지 업로드 InputGroup
export const QuizImageUpload: Story = {
  render: (args) => {
    const [fileName, setFileName] = useState<string>("선택된 파일 없음");

    return (
      <InputGroup direction="horizontal" fullWidth spacing="md">
        <Input
          readOnly
          style={{
            flex: 1,
            minWidth: 0,
          }}
          value="선택된 이미지 없음"
        />
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <Button variant="outline">이미지 선택</Button>
          <Button variant="primary">업로드</Button>
        </div>
      </InputGroup>
    );
  },
};

// 퀴즈 게시 기간 설정
export const QuizPublishPeriod: Story = {
  args: {
    spacing: "sm",
  },
  render: (args) => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndDate(e.target.value);
    };

    const setToday = () => {
      const today = new Date().toISOString().split("T")[0];
      setStartDate(today);
    };

    const setOneWeek = () => {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);

      setStartDate(today.toISOString().split("T")[0]);
      setEndDate(nextWeek.toISOString().split("T")[0]);
    };

    const setOneMonth = () => {
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setMonth(today.getMonth() + 1);

      setStartDate(today.toISOString().split("T")[0]);
      setEndDate(nextMonth.toISOString().split("T")[0]);
    };

    const setPermanent = () => {
      const today = new Date();
      const farFuture = new Date();
      farFuture.setFullYear(today.getFullYear() + 10);

      setStartDate(today.toISOString().split("T")[0]);
      setEndDate(farFuture.toISOString().split("T")[0]);
    };

    return (
      <InputGroup {...args}>
        <Input type="date" value={startDate} onChange={handleStartDateChange} />
        <Text
          as="span"
          verticalAlign="center"
          style={{ whiteSpace: "nowrap", margin: "0 8px" }}
        >
          ~
        </Text>
        <Input type="date" value={endDate} onChange={handleEndDateChange} />
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginLeft: "auto",
            flexShrink: 0,
          }}
        >
          <Button variant="outline" onClick={setToday}>
            오늘부터
          </Button>
          <Button variant="outline" onClick={setOneWeek}>
            1주일
          </Button>
          <Button variant="outline" onClick={setOneMonth}>
            1개월
          </Button>
          <Button variant="outline" onClick={setPermanent}>
            영구
          </Button>
        </div>
      </InputGroup>
    );
  },
};

// 비활성화된 InputGroup
export const DisabledGroup: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <InputGroup {...args}>
      <Input placeholder="퀴즈 제목" />
      <Input placeholder="카테고리" />
      <Button style={{ flexShrink: 0 }} variant="primary">
        저장
      </Button>
    </InputGroup>
  ),
};

// 질문 배점 설정
export const QuestionPointsSetting: Story = {
  render: (args) => {
    const [points, setPoints] = useState<number>(1);

    const decreasePoints = () => {
      if (points > 1) {
        setPoints(points - 1);
      }
    };

    const increasePoints = () => {
      if (points < 10) {
        setPoints(points + 1);
      }
    };

    const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      if (!isNaN(value) && value >= 1 && value <= 10) {
        setPoints(value);
      }
    };

    const storyArgs = {
      ...args,
      prefix: (
        <Text
          as="span"
          verticalAlign="center"
          style={{ marginTop: "11px", marginLeft: "8px" }}
        >
          배점:
        </Text>
      ),
    };

    return (
      <InputGroup {...storyArgs}>
        <Button
          variant="outline"
          style={{ width: "40px" }}
          onClick={decreasePoints}
        >
          -
        </Button>
        <Input
          value={points.toString()}
          onChange={handlePointsChange}
          style={{ width: "60px", textAlign: "center" }}
        />
        <Button
          variant="outline"
          style={{ width: "40px" }}
          onClick={increasePoints}
        >
          +
        </Button>
        <Text
          as="span"
          verticalAlign="center"
          style={{ marginTop: "11px", marginLeft: "8px" }}
        >
          점
        </Text>
      </InputGroup>
    );
  },
};

// 블로그 태그 입력
export const BlogTagInput: Story = {
  render: (args) => {
    const [tags, setTags] = useState<string[]>(["MBTI", "성격테스트"]);
    const [currentTag, setCurrentTag] = useState<string>("");

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentTag(e.target.value);
    };

    const addTag = () => {
      if (currentTag.trim() && !tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
        setCurrentTag("");
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addTag();
      }
    };

    return (
      <div>
        <InputGroup spacing="sm">
          <Input
            placeholder="태그 입력 후 엔터"
            value={currentTag}
            onChange={handleTagChange}
            onKeyDown={handleKeyDown}
            style={{ flex: 1 }}
          />
          <Button variant="outline" onClick={addTag} style={{ flexShrink: 0 }}>
            추가
          </Button>
        </InputGroup>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "12px",
          }}
        >
          {tags.map((tag, index) => (
            <div
              key={index}
              style={{
                background: "#f3f4f6",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {tag}
              <span
                style={{
                  marginLeft: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
                onClick={() => setTags(tags.filter((_, i) => i !== index))}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// 퀴즈 결과 사용자 정보 입력
export const UserResultForm: Story = {
  render: (args) => {
    const [email, setEmail] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [agreeShare, setAgreeShare] = useState<boolean>(false);

    return (
      <div style={{ maxWidth: "500px" }}>
        <InputGroup direction="vertical" spacing="md">
          <Text as="p" style={{ margin: 0 }}>
            결과를 이메일로 받고 공유하시려면 정보를 입력해주세요
          </Text>

          <InputGroup direction="horizontal" spacing="sm">
            <Input
              placeholder="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ flex: 2 }}
            />
            <Input
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={{ flex: 1 }}
            />
          </InputGroup>

          <Checkbox
            label="결과 공유 및 통계 활용에 동의합니다"
            checked={agreeShare}
            onChange={(e) => setAgreeShare(e.target.checked)}
          />

          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "8px",
              justifyContent: "center",
              marginTop: "8px",
            }}
          >
            <Button variant="outline">건너뛰기</Button>
            <Button variant="primary">결과 보기</Button>
          </div>
        </InputGroup>
      </div>
    );
  },
};

// 블로그 포스트 공유 링크
export const BlogShareLinks: Story = {
  render: (args) => {
    const [copySuccess, setCopySuccess] = useState<boolean>(false);
    const shareUrl = "https://doombti.vercel.app/blog/mbti-personality-test";

    const handleCopy = () => {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      });
    };

    return (
      <div>
        <InputGroup spacing="sm">
          <Input value={shareUrl} readOnly style={{ flex: 1 }} />
          <Button
            variant={copySuccess ? "primary" : "outline"}
            onClick={handleCopy}
            style={{ flexShrink: 0 }}
          >
            {copySuccess ? "복사됨!" : "URL 복사"}
          </Button>
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginLeft: "8px",
            }}
          >
            <Button
              variant="outline"
              style={{ width: "40px", height: "40px", padding: 0 }}
            >
              F
            </Button>
            <Button
              variant="outline"
              style={{ width: "40px", height: "40px", padding: 0 }}
            >
              T
            </Button>
            <Button
              variant="outline"
              style={{ width: "40px", height: "40px", padding: 0 }}
            >
              I
            </Button>
          </div>
        </InputGroup>
      </div>
    );
  },
};
