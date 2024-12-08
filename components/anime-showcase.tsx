"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getTopAnime } from "@/lib/services";
import { Button } from "./ui/button";

export function AnimeShowcase() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [animes, setAnimes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAnime() {
      const { data } = await getTopAnime(1, 8);
      setAnimes(data);
    }
    fetchAnime();
  }, []);

  return (
    <section id="discover" className="py-32 bg-white dark:bg-[#08050d]">
      <div className="container space-y-12 mx-auto px-4">
        <div className="mb-16">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 relative min-h-[400px]">
                <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-neutral-900 dark:text-neutral-100 mb-4">
                    Discover Top Anime Series
                  </h2>
                  <p className="text-neutral-900 dark:text-neutral-400 text-base max-w-md mb-6">
                    Explore the highest-rated and most popular anime series.
                    From action-packed adventures to heartwarming stories.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Start Exploring
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-primary border-primary/20 hover:bg-primary/10"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="absolute md:relative inset-0 md:inset-auto">
                  <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#08050d] dark:via-[#08050d]/40 dark:to-transparent z-[1] md:via-transparent backdrop-blur-sm md:backdrop-blur-none" />
                  <Image
                    src="/anime-collage.webp"
                    alt="Anime Collage"
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {animes.slice(0, 4).map((anime) => (
            <Card
              key={anime.mal_id}
              className="overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-[0.85] group-hover:brightness-100 blur-[1px] group-hover:blur-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="font-medium text-sm text-white">
                      {anime.title}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {animes.slice(4).map((anime) => (
            <Card
              key={anime.mal_id}
              className="overflow-hidden group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-[0.85] group-hover:brightness-100 blur-[1px] group-hover:blur-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="font-medium text-sm text-white">
                      {anime.title}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
