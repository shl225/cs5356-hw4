"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X as XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// describing datepicker usage
// showing x icon only if date selected and hovered
export function DatePicker({ date, onDateChange, className }) {
  const [open, setOpen] = React.useState(false);

  // clearing date on user click
  // stopping propagation so popover not toggling
  const handleClearDate = (e) => {
    e.stopPropagation();
    onDateChange(null);
  };

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "pr-8 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              onDateChange(newDate);
              // optional closing popover upon selection
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {date && (
        <button
          type="button"
          onClick={handleClearDate}
          aria-label="clear date"
          // hidden group-hover inline-flex means it only appears when parent li is hovered
          className="absolute right-2 hidden group-hover:inline-flex items-center justify-center w-4 h-4 text-gray-400 hover:text-red-500"
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
