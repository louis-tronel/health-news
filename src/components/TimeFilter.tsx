"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIME_FILTERS } from "@/lib/relevance";

interface TimeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function TimeFilter({ value, onChange }: TimeFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Période" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(TIME_FILTERS).map(([key, config]) => (
          <SelectItem key={key} value={key}>
            {config.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
