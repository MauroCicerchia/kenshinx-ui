import type { Meta, StoryObj } from "@storybook/react";
import { HeatMap, type HeatMapEntry } from "@kenshinx/ui";

const meta = {
  title: "Components/HeatMap",
  component: HeatMap,
  parameters: {
    layout: "centered",
  },
  args: {
    className: "w-full max-w-5xl",
  },
} satisfies Meta<typeof HeatMap>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate trailing 12 months roughly
const generateData = (days: number): HeatMapEntry[] => {
  const entries: HeatMapEntry[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = days; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    // 20% chance of 0 to simulate github flow, then random up to 10
    const val = Math.random() > 0.2 ? Math.floor(Math.random() * 11) : 0;
    entries.push({
      date: d.toISOString().split("T")[0],
      value: val,
    });
  }
  return entries;
};

export const Default: Story = {
  args: {
    data: generateData(365),
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};

const singleMonthEnd = new Date();
const singleMonthStart = new Date(singleMonthEnd);
singleMonthStart.setMonth(singleMonthEnd.getMonth() - 1);

export const SingleMonth: Story = {
  args: {
    data: generateData(30),
    startDate: singleMonthStart.toISOString().split("T")[0],
    endDate: singleMonthEnd.toISOString().split("T")[0],
  },
};

const year = new Date().getFullYear();
export const FullYear: Story = {
  args: {
    data: generateData(365),
    startDate: `${year}-01-01`,
    endDate: `${year}-12-31`,
  },
};

export const CustomColors: Story = {
  args: {
    data: generateData(365),
    // Using simple green scale similar to github
    colorScale: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  },
};
