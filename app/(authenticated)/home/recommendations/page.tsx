"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  Star,
  Building2,
  Clock,
  Award,
  Calendar,
  Sun,
} from "lucide-react";
import { getTopAnime } from "@/lib/services";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function RecommendationsPage() {
  const [topAnime, setTopAnime] = useState<any[]>([]);
  const [basicAnime, setBasicAnime] = useState<any[]>([]);
  const [genreAnime, setGenreAnime] = useState<any[]>([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const [topResponse, basicResponse, genreResponse] = await Promise.all([
          getTopAnime(1, 7),
          getTopAnime(2, 3),
          getTopAnime(3, 3), // Get 3 more anime for the genre collage
        ]);
        setTopAnime(topResponse.data);
        setBasicAnime(basicResponse.data);
        setGenreAnime(genreResponse.data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchAnime();
  }, []);

  const cards = [
    {
      icon: TrendingUp,
      title: "Trending Anime",
      description: "Currently trending across popular platforms",
    },
    {
      icon: Star,
      title: "Based on Popularity",
      description: "Most watched and highly rated anime",
    },
    {
      icon: Building2,
      title: "Based on Studio",
      description: "Explore anime from top studios like Ghibli, MAPPA",
    },
    {
      icon: Clock,
      title: "Based on Length",
      description: "Short series, long-running shows, and movies",
    },
    {
      icon: Award,
      title: "Award-Winning Anime",
      description: "Critically acclaimed and award-winning series",
    },
    {
      icon: Calendar,
      title: "Anime by Year",
      description: "Discover classics and modern hits by year",
    },
    {
      icon: Sun,
      title: "Seasonal Recommendations",
      description: "Discover anime by Winter, Spring, and Summer seasons",
    },
  ];

  const basicCards = [
    {
      title: "Based on Genre",
      description: "Discover anime based on your favorite genres",
    },
    {
      title: "New to Anime",
      description: "Perfect starting points for beginners",
    },
    {
      title: "Based on Your Mood",
      description: "Find anime that matches your current mood",
    },
  ];

  return (
    <div className="container mx-auto pt-20 space-y-8">
      {/* Basics Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Basics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {basicCards.map((card, index) => {
            const anime = basicAnime[index];

            if (index === 0) {
              // Special handling for the first card (Genre-based)
              return (
                <Card
                  key={card.title}
                  className="group relative overflow-hidden cursor-pointer h-[200px] shadow-none hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute inset-0 flex">
                    {genreAnime.slice(0, 3).map((anime) => (
                      <div key={anime.mal_id} className="relative flex-1">
                        <Image
                          src={
                            anime.images.webp.large_image_url ||
                            anime.images.webp.image_url
                          }
                          alt={anime.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent dark:from-black dark:via-black/90 dark:to-transparent">
                    <CardHeader className="relative h-full flex flex-col justify-center max-w-[60%] pl-6">
                      <div className="group-hover:translate-x-2 transition-all duration-300">
                        <TrendingUp className="h-4 w-4 dark:text-white text-slate-50 group-hover:text-primary transition-colors duration-300" />
                      </div>
                      <CardTitle className="dark:text-white text-slate-50 text-xl mt-3">
                        {card.title}
                      </CardTitle>
                      <p className="dark:text-gray-200 text-slate-50 text-sm mt-2">
                        {card.description}
                      </p>
                    </CardHeader>
                  </div>
                </Card>
              );
            }

            // Regular cards
            return (
              <Card
                key={card.title}
                className="group relative overflow-hidden cursor-pointer h-[200px] shadow-none hover:shadow-lg transition-all duration-300"
              >
                {anime && (
                  <Image
                    src={
                      anime.images.webp.large_image_url ||
                      anime.images.webp.image_url
                    }
                    alt={anime.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent dark:from-black dark:via-black/90 dark:to-transparent">
                  <CardHeader className="relative h-full flex flex-col justify-center max-w-[60%] pl-6">
                    <div className="group-hover:translate-x-2 transition-all duration-300">
                      <Star className="h-4 w-4 dark:text-white text-slate-50 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <CardTitle className="dark:text-white text-slate-50 text-xl mt-3">
                      {card.title}
                    </CardTitle>
                    <p className="dark:text-gray-200 text-slate-50 text-sm mt-2">
                      {card.description}
                    </p>
                  </CardHeader>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Additional categories */}
      <section>
        <h2 className="text-3xl font-bold mb-6">More Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            const anime = topAnime[index];

            return (
              <Card
                key={card.title}
                className="group relative overflow-hidden cursor-pointer h-[200px] shadow-none hover:shadow-lg transition-all duration-300"
              >
                {anime && (
                  <Image
                    src={
                      anime.images.webp.large_image_url ||
                      anime.images.webp.image_url
                    }
                    alt={anime.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent dark:from-black dark:via-black/90 dark:to-transparent">
                  <CardHeader className="relative h-full flex flex-col justify-center max-w-[60%] pl-6">
                    <div className="group-hover:translate-x-2 transition-all duration-300">
                      <Icon className="h-4 w-4 dark:text-white text-slate-50 group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <CardTitle className="dark:text-white text-slate-50 text-xl mt-3">
                      {card.title}
                    </CardTitle>
                    <p className="dark:text-gray-200 text-slate-50 text-sm mt-2">
                      {card.description}
                    </p>
                  </CardHeader>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
