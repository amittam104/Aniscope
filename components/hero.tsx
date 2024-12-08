import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-white to-[#f5f3ff] dark:from-[#130b21] dark:to-[#08050d]">
      <div className="container relative space-y-8 text-center mx-auto px-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-neutral-900 dark:text-neutral-100">
          Discover your next favorite anime
        </h1>
        <p className="mx-auto max-w-[45rem] text-neutral-600 dark:text-neutral-400 text-base">
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
            variant="outline"
            size="lg"
            className="text-primary border-primary/20 hover:bg-primary/10"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
