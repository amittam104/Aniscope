"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Bookmark, Calendar, X } from "lucide-react";
import { getAnimeById } from "@/lib/services";
import { Card } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";

interface BookmarkedAnime {
  mal_id: number;
  title: string;
  images: {
    webp: {
      large_image_url: string;
    };
  };
  score: number;
  year: number;
  status: string;
}

export default function BookmarksPage() {
  const [bookmarkedAnime, setBookmarkedAnime] = useState<BookmarkedAnime[]>([]);
  const [loading, setLoading] = useState(true);

  const removeFromBookmarks = (animeId: number, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    const bookmarks = JSON.parse(
      localStorage.getItem("animeBookmarks") || "[]"
    );
    const updatedBookmarks = bookmarks.filter(
      (id: string) => id !== animeId.toString()
    );
    localStorage.setItem("animeBookmarks", JSON.stringify(updatedBookmarks));
    setBookmarkedAnime((prev) =>
      prev.filter((anime) => anime.mal_id !== animeId)
    );
  };

  useEffect(() => {
    const fetchBookmarkedAnime = async () => {
      try {
        const bookmarkIds = JSON.parse(
          localStorage.getItem("animeBookmarks") || "[]"
        );

        const animeData = await Promise.all(
          bookmarkIds.map((id: string) => getAnimeById(id))
        );

        setBookmarkedAnime(animeData);
      } catch (error) {
        console.error("Error fetching bookmarked anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedAnime();
  }, []);

  if (loading) {
    return (
      <div className="container pt-20">
        <div className="text-center">Loading your bookmarks...</div>
      </div>
    );
  }

  if (bookmarkedAnime.length === 0) {
    return (
      <div className="container pt-20">
        <div className="text-center space-y-2">
          <Bookmark className="w-8 h-8 mx-auto text-muted-foreground" />
          <h2 className="text-lg font-medium">No bookmarks yet</h2>
          <p className="text-sm text-muted-foreground">
            Start adding anime to your bookmarks to see them here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container pt-20">
      <Breadcrumbs />
      <h1 className="text-2xl font-semibold mb-6">Your Bookmarks</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bookmarkedAnime.map((anime) => (
          <Link
            key={anime?.mal_id}
            href={`/home/anime/${anime?.mal_id}`}
            className="group relative transition-transform hover:-translate-y-1 h-[360px]"
          >
            <Card className="overflow-hidden h-full">
              <div className="relative h-[70%]">
                <Image
                  src={anime?.images.webp.large_image_url}
                  alt={anime?.title}
                  fill
                  className="object-cover"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 hover:text-white text-white"
                  onClick={(e) => removeFromBookmarks(anime?.mal_id, e)}
                >
                  <X className="h-4 w-4 " />
                </Button>
              </div>
              <div className="flex flex-col justify-between h-[30%] p-3">
                <h2 className="text-sm font-medium line-clamp-2">
                  {anime?.title}
                </h2>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-primary" />
                    <span>{anime?.score || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{anime?.year || "TBA"}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
