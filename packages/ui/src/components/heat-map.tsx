import * as React from "react";
import { cn } from "../lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export interface HeatMapEntry {
  date: string;
  value: number;
}

export interface HeatMapProps extends React.HTMLAttributes<HTMLDivElement> {
  data: HeatMapEntry[];
  startDate?: string;
  endDate?: string;
  colorScale?: [string, string, string, string, string];
  emptyColor?: string;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getISODateString(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

const HeatMap = React.forwardRef<HTMLDivElement, HeatMapProps>(
  (
    { data, startDate, endDate, colorScale, emptyColor, className, ...props },
    ref
  ) => {
    // Determine end date
    const end = endDate ? new Date(endDate) : new Date();
    // Default to a year ago
    const start = startDate ? new Date(startDate) : new Date(end);
    if (!startDate) {
      start.setFullYear(end.getFullYear() - 1);
    }

    // Ensure we start on a Sunday and end on a Saturday for grid perfection
    const startDay = start.getDay();
    const padStart = new Date(start);
    if (startDay !== 0) {
      padStart.setDate(padStart.getDate() - startDay);
    }

    const endDay = end.getDay();
    const padEnd = new Date(end);
    if (endDay !== 6) {
      padEnd.setDate(padEnd.getDate() + (6 - endDay));
    }

    // Create a map for fast lookup
    const dataMap = new Map<string, number>();
    let maxValue = 0;
    for (const item of data) {
      dataMap.set(item.date, item.value);
      if (item.value > maxValue) maxValue = item.value;
    }

    // Determine thresholds to assign levels 1-4
    // 0 is level 0
    // > 0 is divided into 4 buckets
    function getLevel(value: number) {
      if (value === 0) return 0;
      if (maxValue === 0) return 0;
      if (maxValue <= 4) return Math.min(value, 4); // If max is small, just map 1:1
      const ratio = value / maxValue;
      if (ratio <= 0.25) return 1;
      if (ratio <= 0.5) return 2;
      if (ratio <= 0.75) return 3;
      return 4;
    }

    // Generate grid points
    const days: {
      date: Date;
      dateStr: string;
      value: number;
      level: number;
    }[] = [];
    const current = new Date(padStart);
    while (current <= padEnd) {
      const dateStr = getISODateString(current);
      const value = dataMap.get(dateStr) || 0;
      days.push({
        date: new Date(current),
        dateStr,
        value,
        level: getLevel(value),
      });
      current.setDate(current.getDate() + 1);
    }

    // We process days column by column, but CSS Grid with flow column handles it.
    // Let's identify the start of the months for labels.
    const monthLabels: { label: string; colIndex: number }[] = [];
    let lastMonth = -1;
    // We expect days to be multiples of 7.
    // We check the first day of each week to see if its month changed or we just started.
    for (let i = 0; i < days.length; i += 7) {
      const colIndex = i / 7;
      // Use Tuesday/Wednesday of the week to determine month so it feels right
      const repDay = days[i + (days.length > i + 3 ? 3 : 0)];
      const m = repDay.date.getMonth();
      if (m !== lastMonth) {
        lastMonth = m;
        // Don't place a label too close to the edge or too close to a previous label
        const lastLabelColIndex =
          monthLabels.length > 0
            ? monthLabels[monthLabels.length - 1].colIndex
            : -1;
        if (colIndex - lastLabelColIndex >= 2 || monthLabels.length === 0) {
          monthLabels.push({ label: MONTHS[m], colIndex });
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full max-w-full flex-col gap-2 overflow-x-auto overflow-y-hidden pb-4",
          className
        )}
        {...props}
      >
        <div className="flex w-max min-w-full">
          {/* Left spacer for weekday labels */}
          <div className="w-8 shrink-0" />

          {/* Month labels along the top */}
          <div className="text-muted-foreground relative h-5 flex-1 text-xs">
            {monthLabels.map((mLabel, idx) => (
              <span
                key={`${mLabel.label}-${idx}`}
                className="absolute"
                style={{
                  left: `calc(${mLabel.colIndex} * (0.625rem + 0.25rem))` /* w-2.5 + gap-1 */,
                }}
              >
                {mLabel.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex w-max min-w-full gap-2">
          {/* Weekday labels */}
          <div
            className="text-muted-foreground w-6 shrink-0 pr-1 text-right text-[10px]"
            style={{
              display: "grid",
              gridTemplateRows: "repeat(7, 1fr)",
              gap: "0.25rem",
            }}
          >
            {/* Rows are 1(Sun), 2(Mon), 3(Tue), 4(Wed), 5(Thu), 6(Fri), 7(Sat) */}
            <div
              style={{ gridRow: 2 }}
              className="flex items-center justify-end"
            >
              Mon
            </div>
            <div
              style={{ gridRow: 4 }}
              className="flex items-center justify-end"
            >
              Wed
            </div>
            <div
              style={{ gridRow: 6 }}
              className="flex items-center justify-end"
            >
              Fri
            </div>
          </div>

          <TooltipProvider delayDuration={100}>
            <div
              className="grid gap-1"
              style={{
                gridTemplateRows: "repeat(7, 1fr)",
                gridAutoFlow: "column",
              }}
              role="grid"
            >
              {days.map((day) => {
                let cellColorStyle = {};
                if (colorScale) {
                  cellColorStyle = { backgroundColor: colorScale[day.level] };
                } else if (day.level === 0 && emptyColor) {
                  cellColorStyle = { backgroundColor: emptyColor };
                } else {
                  // Map level 0-4 to --heatmap-0 etc
                  cellColorStyle = {
                    backgroundColor: `hsl(var(--heatmap-${day.level}))`,
                  };
                }

                // Month formatting for tooltip
                const tooltipDate = new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }).format(day.date);

                return (
                  <Tooltip key={day.dateStr}>
                    <TooltipTrigger asChild>
                      <div
                        role="gridcell"
                        tabIndex={0}
                        aria-label={`${day.value} on ${tooltipDate}`}
                        className="focus-visible:ring-ring relative h-2.5 w-2.5 rounded-[2px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-1"
                        style={cellColorStyle}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        <span className="font-medium">{day.value}</span> on{" "}
                        {tooltipDate}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </div>
      </div>
    );
  }
);
HeatMap.displayName = "HeatMap";

export { HeatMap };
