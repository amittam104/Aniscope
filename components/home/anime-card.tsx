"use client";

import Image from "next/image";
import { Star, Bookmark, BookmarkCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Anime } from "@/lib/services";
import { useRouter } from "next/navigation";

interface AnimeCardProps {
  anime: Anime;
  isBookmarked?: boolean;
  onBookmarkToggle?: (animeId: number) => void;
  variant?: "full" | "simple";
}

const genreColors = [
  {
    name: "Action",
    bg: "bg-red-50 dark:bg-red-950",
    text: "text-red-800 dark:text-red-100 font-normal",
    border: "border-red-200 dark:border-red-800",
  },
  {
    name: "Adventure",
    bg: "bg-blue-50 dark:bg-blue-950",
    text: "text-blue-800 dark:text-blue-100 font-normal",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    name: "Comedy",
    bg: "bg-yellow-50 dark:bg-yellow-950",
    text: "text-yellow-800 dark:text-yellow-100 font-normal",
    border: "border-yellow-200 dark:border-yellow-800",
  },
  {
    name: "Drama",
    bg: "bg-amber-50 dark:bg-amber-950",
    text: "text-amber-800 dark:text-amber-100 font-normal",
    border: "border-amber-200 dark:border-amber-800",
  },
  {
    name: "Fantasy",
    bg: "bg-purple-50 dark:bg-purple-950",
    text: "text-purple-800 dark:text-purple-100 font-normal",
    border: "border-purple-200 dark:border-purple-800",
  },
  {
    name: "Romance",
    bg: "bg-pink-50 dark:bg-pink-950",
    text: "text-pink-800 dark:text-pink-100 font-normal",
    border: "border-pink-200 dark:border-pink-800",
  },
  {
    name: "Sci-Fi",
    bg: "bg-cyan-50 dark:bg-cyan-950",
    text: "text-cyan-800 dark:text-cyan-100 font-normal",
    border: "border-cyan-200 dark:border-cyan-800",
  },
  {
    name: "Slice of Life",
    bg: "bg-green-50 dark:bg-green-950",
    text: "text-green-800 dark:text-green-100 font-normal",
    border: "border-green-200 dark:border-green-800",
  },
  {
    name: "Sports",
    bg: "bg-orange-50 dark:bg-orange-950",
    text: "text-orange-800 dark:text-orange-100 font-normal",
    border: "border-orange-200 dark:border-orange-800",
  },
  {
    name: "Supernatural",
    bg: "bg-indigo-50 dark:bg-indigo-950",
    text: "text-indigo-800 dark:text-indigo-100 font-normal",
    border: "border-indigo-200 dark:border-indigo-800",
  },
  {
    name: "Thriller",
    bg: "bg-slate-50 dark:bg-slate-950",
    text: "text-slate-800 dark:text-slate-100 font-normal",
    border: "border-slate-200 dark:border-slate-800",
  },
  {
    name: "Mystery",
    bg: "bg-violet-50 dark:bg-violet-950",
    text: "text-violet-800 dark:text-violet-100 font-normal",
    border: "border-violet-200 dark:border-violet-800",
  },
  {
    name: "Horror",
    bg: "bg-rose-50 dark:bg-rose-950",
    text: "text-rose-800 dark:text-rose-100 font-normal",
    border: "border-rose-200 dark:border-rose-800",
  },
  {
    name: "Award Winning",
    bg: "bg-lime-50 dark:bg-lime-950",
    text: "text-lime-800 dark:text-lime-100 font-normal",
    border: "border-lime-200 dark:border-lime-800",
  },
];

export function AnimeCard({
  anime,
  isBookmarked = false,
  onBookmarkToggle,
  variant = "full",
}: AnimeCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/home/anime/${anime.mal_id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmarkToggle?.(anime.mal_id);
  };

  return (
    <Card
      className="overflow-hidden group shadow-none hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
      onClick={handleClick}
    >
      <CardContent className="p-0 h-full">
        <div className="relative w-full">
          <div className="relative w-full pt-[133%]">
            <Image
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <button
            onClick={handleBookmarkClick}
            className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/90 transition-colors z-10"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
          {variant === "full" && anime?.score && (
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md text-sm flex items-center gap-1 z-10">
              <Star className="w-4 h-4 text-yellow-400" />
              {anime.score.toFixed(1)}
            </div>
          )}
        </div>
        <div className="p-4 space-y-4">
          <h3 className="font-semibold text-base line-clamp-1">
            {anime.title}
          </h3>
          {variant === "full" && (
            <>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>
                    {anime.episodes
                      ? `${anime.episodes} ${
                          anime.episodes === 1 ? "episode" : "episodes"
                        }`
                      : "Ongoing"}
                  </span>
                  <span>{anime.year || "TBA"}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {anime.genres.slice(0, 2).map((genre) => (
                  <Badge
                    key={genre.mal_id}
                    variant="secondary"
                    className={`text-xs rounded-full ${(() => {
                      const color = genreColors.find(
                        (color) =>
                          color.name.toLowerCase() === genre.name.toLowerCase()
                      );
                      return color
                        ? `${color.bg} ${color.text} ${color.border}`
                        : "bg-neutral-950 text-neutral-100 border-neutral-800";
                    })()} `}
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
