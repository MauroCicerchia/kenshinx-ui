import type { Meta, StoryObj } from "@storybook/react";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    type ChartConfig,
} from "@kenshinx/ui";
import {
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Line,
    LineChart,
    Area,
    AreaChart,
} from "recharts";

const meta: Meta = {
    title: "Components/Chart",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Beautiful charts built using Recharts. Uses a composition pattern — build your charts with Recharts components and use ChartTooltip, ChartLegend when needed.",
            },
        },
    },
};

export default meta;
type Story = StoryObj;

// ── Bar Chart ──────────────────────────────────────────────

const barChartData = [
    { month: "Jan", revenue: 4200, expenses: 2800 },
    { month: "Feb", revenue: 3800, expenses: 3200 },
    { month: "Mar", revenue: 5100, expenses: 2900 },
    { month: "Apr", revenue: 4600, expenses: 3100 },
    { month: "May", revenue: 5400, expenses: 3500 },
    { month: "Jun", revenue: 6200, expenses: 3800 },
];

const barChartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
    },
    expenses: {
        label: "Expenses",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export const BarChartExample: Story = {
    name: "Bar Chart",
    render: () => (
        <ChartContainer config={barChartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={barChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
            </BarChart>
        </ChartContainer>
    ),
};

// ── Line Chart ─────────────────────────────────────────────

const lineChartData = [
    { month: "Jan", portfolio: 10000, benchmark: 10000 },
    { month: "Feb", portfolio: 10450, benchmark: 10200 },
    { month: "Mar", portfolio: 11200, benchmark: 10500 },
    { month: "Apr", portfolio: 10800, benchmark: 10700 },
    { month: "May", portfolio: 11600, benchmark: 10900 },
    { month: "Jun", portfolio: 12400, benchmark: 11200 },
    { month: "Jul", portfolio: 12100, benchmark: 11500 },
    { month: "Aug", portfolio: 13200, benchmark: 11800 },
    { month: "Sep", portfolio: 13800, benchmark: 12000 },
    { month: "Oct", portfolio: 14500, benchmark: 12300 },
    { month: "Nov", portfolio: 14200, benchmark: 12500 },
    { month: "Dec", portfolio: 15600, benchmark: 12800 },
];

const lineChartConfig = {
    portfolio: {
        label: "Portfolio",
        color: "hsl(var(--chart-1))",
    },
    benchmark: {
        label: "S&P 500",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

export const LineChartExample: Story = {
    name: "Line Chart",
    render: () => (
        <ChartContainer config={lineChartConfig} className="min-h-[300px] w-full">
            <LineChart accessibilityLayer data={lineChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                    dataKey="portfolio"
                    type="monotone"
                    stroke="var(--color-portfolio)"
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey="benchmark"
                    type="monotone"
                    stroke="var(--color-benchmark)"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                />
            </LineChart>
        </ChartContainer>
    ),
};

// ── Area Chart ─────────────────────────────────────────────

const areaChartData = [
    { month: "Jan", stocks: 6500, bonds: 2500, cash: 1000 },
    { month: "Feb", stocks: 6800, bonds: 2400, cash: 1200 },
    { month: "Mar", stocks: 7200, bonds: 2600, cash: 800 },
    { month: "Apr", stocks: 6900, bonds: 2800, cash: 1100 },
    { month: "May", stocks: 7500, bonds: 2700, cash: 900 },
    { month: "Jun", stocks: 8200, bonds: 2500, cash: 1300 },
];

const areaChartConfig = {
    stocks: {
        label: "Stocks",
        color: "hsl(var(--chart-1))",
    },
    bonds: {
        label: "Bonds",
        color: "hsl(var(--chart-3))",
    },
    cash: {
        label: "Cash",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig;

export const AreaChartExample: Story = {
    name: "Area Chart",
    render: () => (
        <ChartContainer config={areaChartConfig} className="min-h-[300px] w-full">
            <AreaChart accessibilityLayer data={areaChartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                    dataKey="cash"
                    type="monotone"
                    fill="var(--color-cash)"
                    fillOpacity={0.3}
                    stroke="var(--color-cash)"
                    stackId="a"
                />
                <Area
                    dataKey="bonds"
                    type="monotone"
                    fill="var(--color-bonds)"
                    fillOpacity={0.3}
                    stroke="var(--color-bonds)"
                    stackId="a"
                />
                <Area
                    dataKey="stocks"
                    type="monotone"
                    fill="var(--color-stocks)"
                    fillOpacity={0.3}
                    stroke="var(--color-stocks)"
                    stackId="a"
                />
            </AreaChart>
        </ChartContainer>
    ),
};
