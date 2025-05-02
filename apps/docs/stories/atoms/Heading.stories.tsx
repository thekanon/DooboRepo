import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "@doo/common-ui";

const meta: Meta<typeof Heading> = {
  title: "Components/Atoms/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
      description: "HTML 헤딩 태그 레벨 (h1-h6)",
    },
    size: {
      control: { type: "select" },
      options: [
        "xs",
        "sm",
        "base",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
      ],
      description: "텍스트 크기",
    },
    weight: {
      control: { type: "select" },
      options: [
        "thin",
        "light",
        "normal",
        "medium",
        "semibold",
        "bold",
        "extrabold",
      ],
      description: "폰트 굵기",
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right"],
      description: "텍스트 정렬",
    },
    color: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "muted"],
      description: "텍스트 색상",
    },
    gutterBottom: {
      control: "boolean",
      description: "하단 마진 추가 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    level: 2,
    children: "Heading Example",
  },
};

export const AllLevels: Story = {
  render: () => (
    <div>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div>
      <Heading size="5xl">Size 5xl</Heading>
      <Heading size="4xl">Size 4xl</Heading>
      <Heading size="3xl">Size 3xl</Heading>
      <Heading size="2xl">Size 2xl</Heading>
      <Heading size="xl">Size xl</Heading>
      <Heading size="lg">Size lg</Heading>
      <Heading size="md">Size md</Heading>
      <Heading size="base">Size base</Heading>
      <Heading size="sm">Size sm</Heading>
      <Heading size="xs">Size xs</Heading>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div>
      <Heading weight="extrabold">Weight extrabold</Heading>
      <Heading weight="bold">Weight bold</Heading>
      <Heading weight="semibold">Weight semibold</Heading>
      <Heading weight="medium">Weight medium</Heading>
      <Heading weight="normal">Weight normal</Heading>
      <Heading weight="light">Weight light</Heading>
      <Heading weight="thin">Weight thin</Heading>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div>
      <Heading color="default">Color default</Heading>
      <Heading color="primary">Color primary</Heading>
      <Heading color="secondary">Color secondary</Heading>
      <Heading color="muted">Color muted</Heading>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div>
      <Heading align="left">Align left</Heading>
      <Heading align="center">Align center</Heading>
      <Heading align="right">Align right</Heading>
    </div>
  ),
};

export const WithoutGutterBottom: Story = {
  args: {
    children: "This heading has no bottom margin",
    gutterBottom: false,
  },
};
