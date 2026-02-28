import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import {
  BottomNav,
  BottomNavItem,
  BottomNavIcon,
  BottomNavLabel,
} from "@kenshinx/ui"
import { Home, Compass, BookOpen, User } from "lucide-react"

const meta = {
  title: "Components/BottomNav",
  component: BottomNav,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BottomNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState("today")

    return (
      <div className="relative w-full max-w-md h-96 border border-border bg-muted/20">
        <BottomNav className="absolute sm:absolute">
          <BottomNavItem
            isActive={active === "today"}
            onClick={() => setActive("today")}
          >
            <BottomNavIcon>
              <Home />
            </BottomNavIcon>
            <BottomNavLabel>Today</BottomNavLabel>
          </BottomNavItem>
          <BottomNavItem
            isActive={active === "quests"}
            onClick={() => setActive("quests")}
          >
            <BottomNavIcon>
              <Compass />
            </BottomNavIcon>
            <BottomNavLabel>Quests</BottomNavLabel>
          </BottomNavItem>
          <BottomNavItem
            isActive={active === "chapters"}
            onClick={() => setActive("chapters")}
          >
            <BottomNavIcon>
              <BookOpen />
            </BottomNavIcon>
            <BottomNavLabel>Chapters</BottomNavLabel>
          </BottomNavItem>
          <BottomNavItem
            isActive={active === "profile"}
            onClick={() => setActive("profile")}
          >
            <BottomNavIcon>
              <User />
            </BottomNavIcon>
            <BottomNavLabel>Profile</BottomNavLabel>
          </BottomNavItem>
        </BottomNav>
      </div>
    )
  },
}

export const WithBadge: Story = {
  render: () => {
    const [active, setActive] = React.useState("today")

    return (
      <div className="relative w-full max-w-md h-96 border border-border bg-muted/20">
        <BottomNav className="absolute sm:absolute">
          <BottomNavItem
            isActive={active === "today"}
            onClick={() => setActive("today")}
          >
            <BottomNavIcon>
              <Home />
            </BottomNavIcon>
            <BottomNavLabel>Today</BottomNavLabel>
          </BottomNavItem>
          <BottomNavItem
            isActive={active === "quests"}
            onClick={() => setActive("quests")}
          >
            <BottomNavIcon>
              <Compass />
              <span className="absolute top-0 right-[-6px] flex h-2 w-2 rounded-full bg-destructive" />
            </BottomNavIcon>
            <BottomNavLabel>Quests</BottomNavLabel>
          </BottomNavItem>
          <BottomNavItem
            isActive={active === "chapters"}
            onClick={() => setActive("chapters")}
          >
            <BottomNavIcon>
              <BookOpen />
            </BottomNavIcon>
            <BottomNavLabel>Chapters</BottomNavLabel>
          </BottomNavItem>
          <BottomNavItem
            isActive={active === "profile"}
            onClick={() => setActive("profile")}
          >
            <BottomNavIcon>
              <User />
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                3
              </span>
            </BottomNavIcon>
            <BottomNavLabel>Profile</BottomNavLabel>
          </BottomNavItem>
        </BottomNav>
      </div>
    )
  },
}

export const ActiveStates: Story = {
  render: () => {
    return (
      <div className="relative w-full max-w-md mt-10 h-auto border border-border bg-muted/20 flex flex-col gap-4 p-4 pb-20">
        <div className="text-sm font-semibold p-2">Active</div>
        <BottomNav className="relative sm:relative">
          <BottomNavItem isActive>
            <BottomNavIcon>
              <Home />
            </BottomNavIcon>
            <BottomNavLabel>Today</BottomNavLabel>
          </BottomNavItem>
        </BottomNav>

        <div className="text-sm font-semibold p-2">Inactive</div>
        <BottomNav className="relative sm:relative">
          <BottomNavItem>
            <BottomNavIcon>
              <Compass />
            </BottomNavIcon>
            <BottomNavLabel>Quests</BottomNavLabel>
          </BottomNavItem>
        </BottomNav>

        <div className="text-sm font-semibold p-2">Disabled</div>
        <BottomNav className="relative sm:relative">
          <BottomNavItem disabled>
            <BottomNavIcon>
              <BookOpen />
            </BottomNavIcon>
            <BottomNavLabel>Chapters</BottomNavLabel>
          </BottomNavItem>
        </BottomNav>
      </div>
    )
  },
}

const CustomSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
)

export const CustomIcons: Story = {
  render: () => {
    const [active, setActive] = React.useState("custom1")

    return (
      <div className="relative w-full max-w-md h-96 border border-border bg-muted/20">
        <BottomNav className="absolute sm:absolute">
          <BottomNavItem
            isActive={active === "custom1"}
            onClick={() => setActive("custom1")}
          >
            <BottomNavIcon>
              <CustomSvg />
            </BottomNavIcon>
            <BottomNavLabel>Star</BottomNavLabel>
          </BottomNavItem>
          <BottomNavItem
            isActive={active === "custom2"}
            onClick={() => setActive("custom2")}
          >
            <BottomNavIcon>
              <CustomSvg />
            </BottomNavIcon>
            <BottomNavLabel>Favorites</BottomNavLabel>
          </BottomNavItem>
        </BottomNav>
      </div>
    )
  },
}
