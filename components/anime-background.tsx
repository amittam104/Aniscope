/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Anime } from "@/lib/services";

interface Column {
  items: Anime[];
  scrollSpeed: number;
}

export function AnimeBackground({ animeList }: { animeList: Anime[] }) {
  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    // Filter out R17+ content and create 8 columns
    console.log(animeList);

    const filteredAnime = animeList.filter(
      (anime) => !anime?.rating?.includes("g")
    );

    // Create 8 columns with different scroll speeds
    const cols: Column[] = Array(8)
      .fill(null)
      .map(() => ({
        items: [...filteredAnime].sort(() => Math.random() - 0.5),
        scrollSpeed: 0.5 + Math.random() * 0.5, // Random speed between 0.5 and 1
      }));

    setColumns(cols);
  }, [animeList]);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div className="flex w-full h-full">
        {columns.map((column, i) => (
          <div
            key={i}
            className="flex-1 min-w-0 animate-scroll"
            style={{
              animation: `scroll ${30 / column.scrollSpeed}s linear infinite`,
              animationDelay: `${-Math.random() * 30}s`,
            }}
          >
            <div className="flex flex-col pb-4">
              {column.items.map((anime, j) => (
                <div
                  key={`${anime.mal_id}-${j}`}
                  className="w-full aspect-[3/4]  overflow-hidden"
                >
                  <img
                    src={anime.images.jpg.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
              {/* Duplicate items for seamless scrolling */}
              {column.items.map((anime, j) => (
                <div
                  key={`${anime.mal_id}-duplicate-${j}`}
                  className="w-full aspect-[3/4]  overflow-hidden"
                >
                  <img
                    src={anime.images.jpg.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
