"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface AnimeFiltersProps {
  type: string;
  filter: string;
  rating: string;
}

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "tv", label: "TV Series" },
  { value: "movie", label: "Movie" },
  { value: "ova", label: "OVA" },
  { value: "special", label: "Special" },
  { value: "ona", label: "ONA" },
  { value: "music", label: "Music" },
] as const;

const filterOptions = [
  { value: "all", label: "All" },
  { value: "airing", label: "Currently Airing" },
  { value: "upcoming", label: "Upcoming" },
  { value: "bypopularity", label: "Popular" },
  { value: "favorite", label: "Most Favorited" },
] as const;

const ratingOptions = [
  { value: "all", label: "All Ratings" },
  { value: "g", label: "G - All Ages" },
  { value: "pg", label: "PG - Children" },
  { value: "pg13", label: "PG-13 - Teens 13+" },
  { value: "r17", label: "R - 17+ (violence & profanity)" },
] as const;

export function AnimeFilters({
  type,
  filter,
  rating,
}: AnimeFiltersProps) {
  const router = useRouter();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams({
      page: "1",
      ...(key === "type" ? { type: value !== "all" ? value : "" } : type && { type }),
      ...(key === "filter" ? { filter: value !== "all" ? value : "" } : filter && { filter }),
      ...(key === "rating" ? { rating: value !== "all" ? value : "" } : rating && { rating }),
    });
    router.push(`/home?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Select value={type || "all"} onValueChange={(value) => handleFilterChange("type", value)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          {typeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filter || "all"} onValueChange={(value) => handleFilterChange("filter", value)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select Filter" />
        </SelectTrigger>
        <SelectContent>
          {filterOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={rating || "all"} onValueChange={(value) => handleFilterChange("rating", value)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select Rating" />
        </SelectTrigger>
        <SelectContent>
          {ratingOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
