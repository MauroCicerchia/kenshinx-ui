# @kenshinx/ui Components

The `@kenshinx/ui` library exposes the following UI components. You can import any of these directly from `@kenshinx/ui`.

## General Usage Idea

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@kenshinx/ui";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => alert("Clicked!")}>Click Me</Button>
      </CardContent>
    </Card>
  );
}
```

## Available Components

### Core & Layout
- `Avatar` (`AvatarImage`, `AvatarFallback`)
- `Badge` (`badgeVariants`)
- `Breadcrumb` (`BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`)
- `Button` (`buttonVariants`)
- `Card` (`CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent`)
- `Collapsible` (`CollapsibleTrigger`, `CollapsibleContent`)
- `EmptyState` (`EmptyStateIcon`, `EmptyStateTitle`, `EmptyStateDescription`, `EmptyStateAction`)
- `Skeleton`

### Forms & Input
- `Checkbox`
- `Combobox`
- `Command` (`CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandShortcut`, `CommandSeparator`)
- `Form` (`useFormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`, `FormField`)
- `Input`
- `Label`
- `Select` (`SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, `SelectScrollUpButton`, `SelectScrollDownButton`)
- `Switch`
- `Textarea`

### Data Display
- `Chart` (`ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `ChartStyle`)
- `Table` (`TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`)
- `Calendar`
- `HeatMap`
- `ProgressBar`
- `Streak`

### Overlay & Feedback
- `Alert` (`AlertTitle`, `AlertDescription`, `alertVariants`)
- `Dialog` (`DialogPortal`, `DialogOverlay`, `DialogClose`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`)
- `DropdownMenu` (`DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuGroup`, `DropdownMenuPortal`, `DropdownMenuSub`, `DropdownMenuSubContent`, `DropdownMenuSubTrigger`, `DropdownMenuRadioGroup`)
- `Popover` (`PopoverTrigger`, `PopoverContent`)
- `Sheet` (`SheetPortal`, `SheetOverlay`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription`)
- `Toaster` (`toast`)
- `Tooltip` (`TooltipTrigger`, `TooltipContent`, `TooltipProvider`)

### Navigation
- `Tabs` (`TabsList`, `TabsTrigger`, `TabsContent`)
- `BottomNav` (`BottomNavItem`, `BottomNavIcon`, `BottomNavLabel`)

## Utilities
- `cn(...inputs: ClassValue[])` - Utility for merging tailwind classes (based on `clsx` and `tailwind-merge`).
