"use client";

import Image from "next/image";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface RecommendationCardProps {
  anime: {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        image_url: string;
        large_image_url: string;
      };
    };
  };
  isBookmarked: boolean;
  onBookmarkToggle: (animeId: number) => void;
}

export function RecommendationCard({
  anime,
  isBookmarked,
  onBookmarkToggle,
}: RecommendationCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/home/anime/${anime.mal_id}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmarkToggle(anime.mal_id);
  };

  return (
    <Card
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            width={300}
            height={400}
            className="aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <button
            onClick={handleBookmarkClick}
            className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/90 transition-colors"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-base line-clamp-1">
            {anime.title}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}
