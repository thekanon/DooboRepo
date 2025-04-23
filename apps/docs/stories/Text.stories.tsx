import { Meta, StoryObj } from "@storybook/react";
import { Text } from "@doo/common-ui";

const meta: Meta<typeof Text> = {
  title: "Components/Atoms/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "caption",
        "overline",
      ],
    },
    weight: {
      control: "select",
      options: [
        "thin",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
      ],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "inherit",
      ],
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
    },
    strikethrough: { control: "boolean" },
    underline: { control: "boolean" },
    italic: { control: "boolean" },
    uppercase: { control: "boolean" },
    truncate: { control: "boolean" },
    lines: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

/**
 * 기본 사용 예시입니다.
 */
export const Default: Story = {
  args: {
    children: "텍스트 컴포넌트 예시",
    variant: "body1",
    weight: "normal",
    color: "inherit",
    align: "left",
  },
};

/**
 * 모든 텍스트 변형을 보여주는 예시입니다.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ maxWidth: "800px" }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="h5">Heading 5</Text>
      <Text variant="h6">Heading 6</Text>
      <Text variant="subtitle1">Subtitle 1</Text>
      <Text variant="subtitle2">Subtitle 2</Text>
      <Text variant="body1">Body 1 - 기본 텍스트로 사용되는 스타일입니다.</Text>
      <Text variant="body2">Body 2 - 조금 더 작은 본문 텍스트입니다.</Text>
      <Text variant="caption">
        Caption - 작은 주석이나 레이블에 사용됩니다.
      </Text>
      <Text variant="overline">Overline - 대문자로 표시되는 머리글</Text>
    </div>
  ),
};

/**
 * 다양한 색상을 보여주는 예시입니다.
 */
export const Colors: Story = {
  render: () => (
    <div>
      <Text color="primary">Primary Color</Text>
      <Text color="secondary">Secondary Color</Text>
      <Text color="success">Success Color</Text>
      <Text color="error">Error Color</Text>
      <Text color="warning">Warning Color</Text>
      <Text color="info">Info Color</Text>
      <Text color="inherit">Inherit Color (부모 요소의 색상을 상속)</Text>
    </div>
  ),
};

/**
 * 다양한 글꼴 두께를 보여주는 예시입니다.
 */
export const Weights: Story = {
  render: () => (
    <div>
      <Text weight="thin">Thin (100) Weight</Text>
      <Text weight="light">Light (300) Weight</Text>
      <Text weight="normal">Normal (400) Weight</Text>
      <Text weight="medium">Medium (500) Weight</Text>
      <Text weight="semibold">Semibold (600) Weight</Text>
      <Text weight="bold">Bold (700) Weight</Text>
      <Text weight="extrabold">ExtraBold (800) Weight</Text>
    </div>
  ),
};

/**
 * 텍스트 정렬 예시입니다.
 */
export const Alignment: Story = {
  render: () => (
    <div style={{ width: "500px", border: "1px solid #ddd", padding: "16px" }}>
      <Text align="left">왼쪽 정렬 텍스트</Text>
      <Text align="center">가운데 정렬 텍스트</Text>
      <Text align="right">오른쪽 정렬 텍스트</Text>
      <Text align="justify">
        텍스트 양쪽 정렬입니다. 이 정렬은 텍스트 블록이 충분히 길 때 효과가
        있습니다. 줄 간격을 동일하게 유지하면서 왼쪽과 오른쪽 여백을 맞추는
        방식으로 작동합니다. 충분한 텍스트 길이가 있을 때 그 효과를 확인할 수
        있습니다.
      </Text>
    </div>
  ),
};

/**
 * 텍스트 장식 예시입니다.
 */
export const Decorations: Story = {
  render: () => (
    <div>
      <Text underline>밑줄이 있는 텍스트</Text>
      <Text strikethrough>취소선이 있는 텍스트</Text>
      <Text italic>기울임체 텍스트</Text>
      <Text uppercase>대문자로 변환된 텍스트</Text>
      <Text underline italic>
        여러 스타일을 조합한 텍스트
      </Text>
    </div>
  ),
};

/**
 * 텍스트 줄임(truncation) 예시입니다.
 */
export const Truncation: Story = {
  render: () => (
    <div
      style={{ maxWidth: "300px", border: "1px solid #ddd", padding: "16px" }}
    >
      <Text truncate>
        이 텍스트는 너무 길어서 한 줄에 모두 표시될 수 없기 때문에 ...으로
        줄여집니다.
      </Text>
      <div style={{ height: "20px" }} />
      <Text truncate lines={2}>
        이 텍스트는 여러 줄로 표시되지만, 2줄 이상이 되면 ...으로 줄여집니다.
        여러 줄 텍스트를 표시하는 경우 이런 방식으로 텍스트 길이를 제한할 수
        있습니다. 이 부분은 생략되어 보이지 않을 것입니다.
      </Text>
      <div style={{ height: "20px" }} />
      <Text truncate lines={3}>
        이 텍스트는 최대 3줄까지 표시되고, 그 이상은 ...으로 줄여집니다. 긴
        콘텐츠를 표시할 때 유용한 방법으로, 사용자가 모든 내용을 볼 필요가 없을
        때 공간을 절약할 수 있습니다. 이것은 세 번째 줄의 내용입니다. 이
        줄까지는 표시가 됩니다. 하지만 이 줄부터는 생략됩니다. 사용자는 이
        내용을 볼 수 없습니다.
      </Text>
    </div>
  ),
};

/**
 * HTML 요소 변경 예시입니다.
 */
export const CustomElements: Story = {
  render: () => (
    <div>
      <Text variant="h1" as="div">
        Div로 렌더링된 H1 스타일
      </Text>
      <Text variant="body1" as="span">
        Span으로 렌더링된 Body 스타일
      </Text>
      <Text variant="caption" as="h2">
        H2로 렌더링된 Caption 스타일
      </Text>
    </div>
  ),
};
