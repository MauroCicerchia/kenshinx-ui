import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, Label } from "@kenshinx/ui";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "The controlled checked state",
    },
    defaultChecked: {
      control: "boolean",
      description: "The default checked state (uncontrolled)",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "A checkbox component built on Radix UI Checkbox primitive for toggling between checked and unchecked states.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="items-top flex space-x-2">
      <Checkbox id="terms2" />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms2">Accept terms and conditions</Label>
        <p className="text-sm text-muted-foreground">
          You agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" defaultChecked />
        <Label htmlFor="option1">Enable notifications</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" />
        <Label htmlFor="option2">Send me marketing emails</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" disabled />
        <Label htmlFor="option3" className="text-muted-foreground">
          Premium feature (disabled)
        </Label>
      </div>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 rounded-lg border p-4">
      <h4 className="font-medium leading-none">Notification preferences</h4>
      <p className="text-sm text-muted-foreground">
        Choose what notifications you want to receive.
      </p>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="email-notif" defaultChecked />
          <Label htmlFor="email-notif">Email notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="push-notif" defaultChecked />
          <Label htmlFor="push-notif">Push notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sms-notif" />
          <Label htmlFor="sms-notif">SMS notifications</Label>
        </div>
      </div>
    </div>
  ),
};
