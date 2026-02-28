import type { Meta, StoryObj } from "@storybook/react";
import {
    EmptyState,
    EmptyStateIcon,
    EmptyStateTitle,
    EmptyStateDescription,
    EmptyStateAction,
} from "@kenshinx/ui";
import { Button } from "@kenshinx/ui";
import { Inbox, FileText, Calendar, CloudLightning } from "lucide-react";
import * as React from "react";

const meta = {
    title: "Components/EmptyState",
    component: EmptyState,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "Controls the padding, gap, and child component sizing.",
        },
    },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args: React.ComponentProps<typeof EmptyState>) => (
        <EmptyState {...args} className="w-[400px] border rounded-lg bg-card">
            <EmptyStateIcon>
                <Inbox />
            </EmptyStateIcon>
            <EmptyStateTitle>No quests today</EmptyStateTitle>
            <EmptyStateDescription>
                Check back tomorrow for new daily quests and challenges.
            </EmptyStateDescription>
        </EmptyState>
    ),
};

export const WithAction: Story = {
    render: (args: React.ComponentProps<typeof EmptyState>) => (
        <EmptyState {...args} className="w-[400px] border rounded-lg bg-card">
            <EmptyStateIcon>
                <FileText />
            </EmptyStateIcon>
            <EmptyStateTitle>No chapters written</EmptyStateTitle>
            <EmptyStateDescription>
                You haven't started your story yet. Click below to begin your adventure.
            </EmptyStateDescription>
            <EmptyStateAction>
                <Button>Create Chapter</Button>
            </EmptyStateAction>
        </EmptyState>
    ),
};

export const IconOnly: Story = {
    render: (args: React.ComponentProps<typeof EmptyState>) => (
        <EmptyState {...args} className="w-[300px] border rounded-lg bg-card border-dashed">
            <EmptyStateIcon>
                <CloudLightning />
            </EmptyStateIcon>
            <EmptyStateTitle>Nothing here</EmptyStateTitle>
        </EmptyState>
    ),
};

export const Compact: Story = {
    args: {
        size: "sm",
    },
    render: (args: React.ComponentProps<typeof EmptyState>) => (
        <EmptyState {...args} className="w-[300px] border rounded-lg bg-card">
            <EmptyStateIcon>
                <Calendar />
            </EmptyStateIcon>
            <EmptyStateTitle>No events scheduled</EmptyStateTitle>
            <EmptyStateDescription>
                You have a free day today.
            </EmptyStateDescription>
            <EmptyStateAction>
                <Button size="sm" variant="outline">Schedule</Button>
            </EmptyStateAction>
        </EmptyState>
    ),
};

export const FullPage: Story = {
    args: {
        size: "lg",
    },
    render: (args: React.ComponentProps<typeof EmptyState>) => (
        <EmptyState {...args} className="w-[600px] h-[400px] border rounded-lg bg-card">
            <EmptyStateIcon>
                <Inbox />
            </EmptyStateIcon>
            <EmptyStateTitle>Your universe is empty</EmptyStateTitle>
            <EmptyStateDescription>
                It looks like you haven't created any worlds yet. The cosmos is waiting for your imagination to take root. Start building your first world to see it here.
            </EmptyStateDescription>
            <EmptyStateAction>
                <Button size="lg">Create World</Button>
            </EmptyStateAction>
        </EmptyState>
    ),
};

const CustomIllustrationSvg = () => (
    <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-muted-foreground/30"
    >
        <circle cx="60" cy="60" r="50" fill="currentColor" />
        <path
            d="M40 60C40 48.9543 48.9543 40 60 40C71.0457 40 80 48.9543 80 60"
            stroke="var(--background)"
            strokeWidth="8"
            strokeLinecap="round"
        />
    </svg>
);

export const CustomIllustration: Story = {
    render: (args: React.ComponentProps<typeof EmptyState>) => (
        <EmptyState {...args} className="w-[500px] border rounded-lg bg-card py-16">
            {/* 
        For custom illustrations that don't use standard icons, you can omit the 
        EmptyStateIcon wrapper to avoid its fixed sizing, or apply your own sizing.
        Here we bypass EmptyStateIcon and render the custom SVG directly.
      */}
            <div className="mb-4">
                <CustomIllustrationSvg />
            </div>
            <EmptyStateTitle>No data found</EmptyStateTitle>
            <EmptyStateDescription>
                We couldn't find any data matching your current filters.
            </EmptyStateDescription>
            <EmptyStateAction>
                <Button variant="secondary">Clear Filters</Button>
            </EmptyStateAction>
        </EmptyState>
    ),
};
