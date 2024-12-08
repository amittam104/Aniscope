"use client";

import { useState, useEffect } from "react";
import { AnimeCard } from "@/components/home/anime-card";
import type { Anime } from "@/lib/services";

interface AnimeListProps {
  animeList: Anime[];
  itemsPerRow: number;
}

export function AnimeList({ animeList, itemsPerRow }: AnimeListProps) {
  const [bookmarkedAnime, setBookmarkedAnime] = useState<string[]>([]);

  useEffect(() => {
    // Load bookmarks from localStorage
    const bookmarks = JSON.parse(
      localStorage.getItem("animeBookmarks") || "[]"
    );
    setBookmarkedAnime(bookmarks);
  }, []);

  const handleBookmarkToggle = (animeId: number) => {
    const bookmarks = JSON.parse(
      localStorage.getItem("animeBookmarks") || "[]"
    );
    
    if (bookmarks.includes(animeId.toString())) {
      const updatedBookmarks = bookmarks.filter(
        (id: string) => id !== animeId.toString()
      );
      localStorage.setItem("animeBookmarks", JSON.stringify(updatedBookmarks));
      setBookmarkedAnime(updatedBookmarks);
    } else {
      const updatedBookmarks = [...bookmarks, animeId.toString()];
      localStorage.setItem("animeBookmarks", JSON.stringify(updatedBookmarks));
      setBookmarkedAnime(updatedBookmarks);
    }
  };

  // Group items into rows
  const rows = [];
  for (let i = 0; i < animeList.length; i += itemsPerRow) {
    rows.push(animeList.slice(i, i + itemsPerRow));
  }

  return (
    <div className="space-y-8">
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {row.map((anime) => (
            <AnimeCard
              key={anime.mal_id}
              anime={anime}
              isBookmarked={bookmarkedAnime.includes(anime.mal_id.toString())}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
