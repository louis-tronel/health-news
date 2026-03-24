"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCompetitors } from "@/lib/relevance";

interface CompetitorFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const competitors = getAllCompetitors();
const directCompetitors = competitors.filter((c) => c.type === "direct");
const indirectCompetitors = competitors.filter((c) => c.type === "indirect");
const traditionalCompetitors = competitors.filter((c) => c.type === "traditional");

export function CompetitorFilter({ value, onChange }: CompetitorFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Concurrent" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Tous les concurrents</SelectItem>

        <div className="px-2 py-1.5 text-xs font-semibold text-gray-500">
          Concurrents directs (Europe)
        </div>
        {directCompetitors.map((c) => (
          <SelectItem key={c.name} value={c.name}>
            {c.name}
          </SelectItem>
        ))}

        <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mt-2">
          Concurrents indirects (US)
        </div>
        {indirectCompetitors.map((c) => (
          <SelectItem key={c.name} value={c.name}>
            {c.name}
          </SelectItem>
        ))}

        <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 mt-2">
          Assureurs traditionnels
        </div>
        {traditionalCompetitors.map((c) => (
          <SelectItem key={c.name} value={c.name}>
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
