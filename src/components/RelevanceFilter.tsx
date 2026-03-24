"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RelevanceFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const RELEVANCE_OPTIONS = [
  { value: "0", label: "Tous les articles" },
  { value: "5", label: "Pertinents" },
  { value: "10", label: "Très pertinents" },
  { value: "20", label: "Top priorité" },
  { value: "top5", label: "Top 5 de la semaine" },
];

export function RelevanceFilter({ value, onChange }: RelevanceFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Pertinence" />
      </SelectTrigger>
      <SelectContent>
        {RELEVANCE_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
