"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SourceFilterProps {
  value: string;
  onChange: (value: string) => void;
  sources: string[];
}

export function SourceFilter({ value, onChange, sources }: SourceFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Source" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Toutes les sources</SelectItem>
        {sources.map((source) => (
          <SelectItem key={source} value={source}>
            {source}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
