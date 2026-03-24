"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GEOGRAPHY_LABELS } from "@/lib/relevance";

interface GeographyFilterProps {
  value: string;
  onChange: (value: string) => void;
}

// Prioritize Alan's markets
const PRIORITY_REGIONS = ["france", "belgium", "spain", "europe", "canada"];
const OTHER_REGIONS = ["germany", "uk", "netherlands", "usa"];

export function GeographyFilter({ value, onChange }: GeographyFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[160px]">
        <SelectValue placeholder="Géographie" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Toutes régions</SelectItem>

        <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
          Marchés Alan
        </div>
        {PRIORITY_REGIONS.map((region) => (
          <SelectItem key={region} value={region}>
            {GEOGRAPHY_LABELS[region as keyof typeof GEOGRAPHY_LABELS]}
          </SelectItem>
        ))}

        <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mt-2">
          Autres régions
        </div>
        {OTHER_REGIONS.map((region) => (
          <SelectItem key={region} value={region}>
            {GEOGRAPHY_LABELS[region as keyof typeof GEOGRAPHY_LABELS]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
