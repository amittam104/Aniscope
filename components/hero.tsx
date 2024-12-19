import { Button } from "@/components/ui/button";
import { AnimeBackground } from "./anime-background";
import { Anime } from "@/lib/services";

function Hero({ animeList }: { animeList: Anime[] }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5f3ff55] to-[#f5f3ff54] dark:from-[#130b21] dark:to-[#08050d] overflow-hidden">
      <AnimeBackground animeList={animeList} />
      <div className="container relative space-y-8 text-center mx-auto px-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-neutral-100">
          Discover your next favorite anime
        </h1>
        <p className="mx-auto max-w-[45rem] text-neutral-800 dark:text-neutral-200 text-base">
          Browse, bookmark, and get personalized anime recommendations based on
          your interests. Join aniscope.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Start Exploring
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="text-slate-800 dark:text-slate-300 border-primary/20 hover:bg-primary/10"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
