import { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "@kenshinx/ui";

const meta: Meta<typeof ProgressBar> = {
    title: "Components/ProgressBar",
    component: ProgressBar,
    tags: ["autodocs"],
    argTypes: {
        value: {
            control: { type: "range", min: 0, max: 100 },
            description: "Progress value (0–100)",
        },
        variant: {
            control: "select",
            options: ["default", "success", "warning", "info"],
            description: "The color variant of the progress bar",
        },
        size: {
            control: "select",
            options: ["sm", "default", "lg"],
            description: "The size of the progress bar",
        },
        label: {
            control: "text",
            description: "Optional visible label text",
        },
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A visual progress bar that fills proportionally to a given value (0–100). Useful for showing progression, completion percentages, onboarding steps, and more.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
    args: {
        value: 50,
    },
};

export const Variants: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Default</span>
                <ProgressBar value={60} />
            </div>
            <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Success</span>
                <ProgressBar value={80} variant="success" />
            </div>
            <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Warning</span>
                <ProgressBar value={45} variant="warning" />
            </div>
            <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Info</span>
                <ProgressBar value={70} variant="info" />
            </div>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Small</span>
                <ProgressBar value={60} size="sm" />
            </div>
            <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Default</span>
                <ProgressBar value={60} size="default" />
            </div>
            <div className="space-y-1">
                <span className="text-sm text-muted-foreground">Large</span>
                <ProgressBar value={60} size="lg" />
            </div>
        </div>
    ),
};

function AnimatedProgressDemo() {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((prev) => {
                if (prev >= 100) return 0;
                return prev + 5;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-md space-y-2">
            <ProgressBar value={value} variant="success" />
            <p className="text-sm text-muted-foreground">Value: {value}%</p>
        </div>
    );
}

export const Animated: Story = {
    render: () => <AnimatedProgressDemo />,
};

export const WithLabel: Story = {
    render: () => (
        <div className="w-full max-w-md space-y-4">
            <ProgressBar value={75} label="75% Complete" />
            <ProgressBar value={30} variant="warning" label="30% — Needs Attention" />
            <ProgressBar
                value={100}
                variant="success"
                size="lg"
                label="Upload Complete"
            />
        </div>
    ),
};
