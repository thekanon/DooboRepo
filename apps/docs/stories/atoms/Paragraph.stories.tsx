import type { Meta, StoryObj } from "@storybook/react";
import { Paragraph } from "@doo/common-ui";

const meta: Meta<typeof Paragraph> = {
  title: "Components/Atoms/Paragraph",
  component: Paragraph,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "base", "lg", "xl"],
      description: "텍스트 크기",
    },
    weight: {
      control: { type: "select" },
      options: ["light", "normal", "medium", "semibold", "bold"],
      description: "폰트 굵기",
    },
    align: {
      control: { type: "select" },
      options: ["left", "center", "right", "justify"],
      description: "텍스트 정렬",
    },
    color: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "muted"],
      description: "텍스트 색상",
    },
    lineHeight: {
      control: { type: "select" },
      options: ["tight", "normal", "relaxed", "loose"],
      description: "줄 간격",
    },
    gutterBottom: {
      control: "boolean",
      description: "하단 마진 추가 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Paragraph>;

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.`;

export const Default: Story = {
  args: {
    children: loremIpsum,
  },
};

export const Sizes: Story = {
  render: () => (
    <div>
      <Paragraph size="xl">Size xl: {loremIpsum.substring(0, 100)}</Paragraph>
      <Paragraph size="lg">Size lg: {loremIpsum.substring(0, 100)}</Paragraph>
      <Paragraph size="base">
        Size base: {loremIpsum.substring(0, 100)}
      </Paragraph>
      <Paragraph size="sm">Size sm: {loremIpsum.substring(0, 100)}</Paragraph>
      <Paragraph size="xs">Size xs: {loremIpsum.substring(0, 100)}</Paragraph>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div>
      <Paragraph weight="bold">
        Weight bold: {loremIpsum.substring(0, 100)}
      </Paragraph>
      <Paragraph weight="semibold">
        Weight semibold: {loremIpsum.substring(0, 100)}
      </Paragraph>
      <Paragraph weight="medium">
        Weight medium: {loremIpsum.substring(0, 100)}
      </Paragraph>
      <Paragraph weight="normal">
        Weight normal: {loremIpsum.substring(0, 100)}
      </Paragraph>
      <Paragraph weight="light">
        Weight light: {loremIpsum.substring(0, 100)}
      </Paragraph>
    </div>
  ),
};

export const LineHeights: Story = {
  render: () => (
    <div>
      <Paragraph lineHeight="tight">Line height tight: {loremIpsum}</Paragraph>
      <Paragraph lineHeight="normal">
        Line height normal: {loremIpsum}
      </Paragraph>
      <Paragraph lineHeight="relaxed">
        Line height relaxed: {loremIpsum}
      </Paragraph>
      <Paragraph lineHeight="loose">Line height loose: {loremIpsum}</Paragraph>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div>
      <Paragraph color="default">
        Color default: {loremIpsum.substring(0, 100)}
      </Paragraph>
      <Paragraph color="primary">
        Color primary: {loremIpsum.substring(0, 100)}
      </Paragraph>
      <Paragraph color="secondary">
        Color secondary: {loremIpsum.substring(0, 100)}
      </Paragraph>
      <Paragraph color="muted">
        Color muted: {loremIpsum.substring(0, 100)}
      </Paragraph>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div>
      <Paragraph align="left">Align left: {loremIpsum}</Paragraph>
      <Paragraph align="center">Align center: {loremIpsum}</Paragraph>
      <Paragraph align="right">Align right: {loremIpsum}</Paragraph>
      <Paragraph align="justify">Align justify: {loremIpsum}</Paragraph>
    </div>
  ),
};

export const WithoutGutterBottom: Story = {
  args: {
    children: loremIpsum,
    gutterBottom: false,
  },
};

export const Composition: Story = {
  render: () => (
    <div>
      <Paragraph size="xl" weight="semibold" color="primary">
        A very important message
      </Paragraph>
      <Paragraph>
        Normal paragraph following the important message.{" "}
        {loremIpsum.substring(0, 150)}
      </Paragraph>
      <Paragraph size="sm" color="muted">
        Additional information in smaller, muted text.{" "}
        {loremIpsum.substring(0, 100)}
      </Paragraph>
    </div>
  ),
};
