"use client";

import Image from "next/image";
import { Star, Bookmark, BookmarkCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Anime } from "@/lib/services";
import genreColors from "@/lib/utils/GenereColors";
import { useRouter } from "next/navigation";

interface AnimeCardProps {
  anime: Anime;
  isBookmarked?: boolean;
  onBookmarkToggle?: (animeId: number) => void;
  variant?: "full" | "simple";
}

export function AnimeCard({
  anime,
  isBookmarked = false,
  onBookmarkToggle,
  variant = "full"
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
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
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
                    className={`text-xs rounded-full border ${
                      genreColors.find(
                        (color) =>
                          color.name.toLowerCase() === genre.name.toLowerCase()
                      )?.bg || "bg-neutral-950"
                    } ${
                      genreColors.find(
                        (color) =>
                          color.name.toLowerCase() === genre.name.toLowerCase()
                      )?.text || "text-neutral-100"
                    }`}
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
