import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Plus, Sparkles } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost", "magic"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary Button",
    variant: "secondary",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger Button",
    variant: "danger",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost Button",
    variant: "ghost",
  },
};

export const Magic: Story = {
  args: {
    children: "Magic Button",
    variant: "magic",
    icon: Sparkles,
  },
};

export const WithIcon: Story = {
  args: {
    children: "Add New",
    variant: "primary",
    icon: Plus,
  },
};

export const Loading: Story = {
  args: {
    children: "Saving...",
    variant: "primary",
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    variant: "primary",
    disabled: true,
  },
};
