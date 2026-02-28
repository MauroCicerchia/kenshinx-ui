import type { Meta, StoryObj } from "@storybook/react"
import { Streak } from "@kenshinx/ui"
import { Zap } from "lucide-react"

const meta = {
  title: "Components/Streak",
  component: Streak,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    count: { control: "number" },
    label: { control: "text" },
    hotThreshold: { control: "number" },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    intensity: {
      control: "select",
      options: ["inactive", "active", "hot"],
    },
  },
} satisfies Meta<typeof Streak>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    count: 5,
  },
}

export const Inactive: Story = {
  args: {
    count: 0,
    label: "day streak",
  },
}

export const Active: Story = {
  args: {
    count: 5,
    label: "day streak",
  },
}

export const Hot: Story = {
  args: {
    count: 12,
    label: "day streak",
    hotThreshold: 7,
  },
}

export const Sizes: Story = {
  render: (args: React.ComponentProps<typeof Streak>) => (
    <div className="flex flex-col items-center gap-4">
      <Streak {...args} count={5} size="sm" label="small streak" />
      <Streak {...args} count={5} size="default" label="default streak" />
      <Streak {...args} count={5} size="lg" label="large streak" />
    </div>
  ),
}

export const CustomIcon: Story = {
  args: {
    count: 3,
    icon: <Zap />,
    label: "zaps",
  },
}
