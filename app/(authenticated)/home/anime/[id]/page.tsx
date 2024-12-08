/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Star, Bookmark, BookmarkCheck, Sparkles } from "lucide-react";
import { getAnimeById } from "@/lib/services";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/breadcrumbs";
import genreColors from "@/lib/utils/GenereColors";
import { AnimeCard } from "@/components/home/anime-card";
import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
} from "react";

interface AnimePageProps {
  params: {
    id: string;
  };
}

interface AnimeRecommendation {
  entry: {
    mal_id: number;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    title: string;
    genres: {
      mal_id: number;
      name: string;
    }[];
    score: number;
    episodes: number;
    year: number;
  };
  votes: number;
}

async function getAnimeRecommendations(
  id: string
): Promise<AnimeRecommendation[]> {
  const response = await fetch(
    `https://api.jikan.moe/v4/anime/${id}/recommendations`
  );
  const data = await response.json();
  return data.data;
}

export default function AnimePage({ params }: AnimePageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [anime, setAnime] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<AnimeRecommendation[]>(
    []
  );
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [bookmarkedAnime, setBookmarkedAnime] = useState<string[]>([]);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(
      localStorage.getItem("animeBookmarks") || "[]"
    );
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(
        (id: string) => id !== params.id
      );
      localStorage.setItem("animeBookmarks", JSON.stringify(updatedBookmarks));
    } else {
      bookmarks.push(params.id);
      localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));
    }
    setIsBookmarked(!isBookmarked);
  };

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

  const handleShowRecommendations = async () => {
    if (recommendations.length > 0) {
      setRecommendations([]);
      return;
    }

    setLoadingRecommendations(true);
    try {
      const data = await getAnimeRecommendations(params.id);
      setRecommendations(data.slice(0, 12)); // Limit to 12 recommendations
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  // Load bookmarks and anime data
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAnimeById(params.id);
      setAnime(data);

      // Load bookmarks
      const bookmarks = JSON.parse(
        localStorage.getItem("animeBookmarks") || "[]"
      );
      setBookmarkedAnime(bookmarks);
      setIsBookmarked(bookmarks.includes(params.id));
    };
    fetchData();
  }, [params.id]);

  if (!anime) return null;

  return (
    <div className="container pt-20 space-y-8">
      <Breadcrumbs />
      <Card className="overflow-hidden">
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-[400px_1fr]">
          {/* Left side - Image */}
          <div className="relative h-[400px] md:h-full">
            <Image
              src={anime.images.webp.large_image_url}
              alt={anime.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right side - Info */}
          <div className="relative p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-xl font-semibold mb-1">{anime.title}</h1>
                <h2 className="text-sm text-muted-foreground">
                  {anime.title_japanese}
                </h2>
              </div>
              <button
                onClick={toggleBookmark}
                className="p-2 hover:bg-accent rounded-full transition-colors"
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-5 h-5 text-primary" />
                ) : (
                  <Bookmark className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Score and Stats */}
            <div className="flex items-center gap-3 text-sm">
              {anime.score && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{anime.score}</span>
                </div>
              )}
              <div className="text-muted-foreground">
                {anime.episodes ? `${anime.episodes} episodes` : "Ongoing"} •{" "}
                {anime.year || "TBA"}
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-1.5">
              {anime.genres.map(
                (genre: {
                  name:
                    | string
                    | number
                    | boolean
                    | ReactElement<any, string | JSXElementConstructor<any>>
                    | Iterable<ReactNode>
                    | null
                    | undefined;
                  mal_id: Key | null | undefined;
                }) => {
                  const { bg, text, border } = genreColors.find(
                    (color) =>
                      typeof color.name === "string" &&
                      typeof genre?.name === "string" &&
                      color.name.toLowerCase() === genre.name.toLowerCase()
                  ) || {
                    bg: "bg-neutral-950",
                    text: "text-neutral-100",
                    border: "border-neutral-800",
                  };
                  return (
                    <Badge
                      key={genre.mal_id}
                      variant="secondary"
                      className={`text-xs rounded-full border ${bg} ${text} ${border}`}
                    >
                      {genre.name === "Award Winning" && (
                        <Star
                          fill="#fbbf24"
                          className="w-3 h-3 text-[#fbbf24] mr-1"
                        />
                      )}
                      {genre.name}
                    </Badge>
                  );
                }
              )}
            </div>

            {/* Synopsis */}
            <div>
              <h3 className="text-sm font-medium mb-1">Synopsis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-[8]">
                {anime.synopsis}
              </p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <div>
                <h3 className="font-medium mb-0.5">Status</h3>
                <p className="text-muted-foreground">{anime.status}</p>
              </div>
              <div>
                <h3 className="font-medium mb-0.5">Rating</h3>
                <p className="text-muted-foreground">{anime.rating}</p>
              </div>
              <div>
                <h3 className="font-medium mb-0.5">Season</h3>
                <p className="text-muted-foreground">
                  {anime.season ? `${anime.season} ${anime.year}` : "N/A"}
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-0.5">Studio</h3>
                <p className="text-muted-foreground">
                  {anime.studios
                    ?.map((studio: { name: any }) => studio.name)
                    .join(", ") || "N/A"}
                </p>
              </div>
            </div>

            {/* Recommendation Button */}
            <div className="flex justify-end pt-2">
              <Button
                onClick={handleShowRecommendations}
                className="gap-2"
                disabled={loadingRecommendations}
              >
                <Sparkles className="w-4 h-4" />
                {loadingRecommendations
                  ? "Loading..."
                  : recommendations.length > 0
                  ? "Hide Recommendations"
                  : "Show Recommendations"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Similar Anime</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <AnimeCard
                key={rec.entry.mal_id}
                anime={{
                  mal_id: rec.entry.mal_id,
                  title: rec.entry.title,
                  images: {
                    jpg: rec.entry.images.jpg,
                  },
                  score: rec.entry.score,
                  episodes: rec.entry.episodes,
                  year: rec.entry.year,
                  genres: rec.entry.genres || [],
                  status: ""
                }}
                variant="simple"
                isBookmarked={bookmarkedAnime.includes(
                  rec.entry.mal_id.toString()
                )}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
