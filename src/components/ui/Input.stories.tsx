import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { DollarSign } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    value: "",
  },
};

export const WithPrefix: Story = {
  args: {
    label: "Price",
    placeholder: "0.00",
    prefix: <DollarSign className="w-4 h-4" />,
    value: "",
  },
};

export const WithSuffix: Story = {
  args: {
    label: "Area",
    placeholder: "800",
    suffix: "sqft",
    value: "",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    value: "",
  },
};
