import type { Meta, StoryObj } from "@storybook/react";
import { Textarea, Label, Button } from "@kenshinx/ui";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    rows: {
      control: "number",
      description: "Number of visible text lines",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A styled textarea component for multi-line text input in forms.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled textarea",
    disabled: true,
  },
};

export const WithPlaceholder: Story = {
  args: {
    placeholder: "Enter your feedback here. We'd love to hear from you!",
  },
};

export const WithRows: Story = {
  args: {
    placeholder: "This textarea has 6 rows",
    rows: 6,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea placeholder="Tell us a little bit about yourself" id="bio" />
      <p className="text-sm text-muted-foreground">
        Your bio will be displayed on your profile.
      </p>
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  ),
};
