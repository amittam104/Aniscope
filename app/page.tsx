import { Header } from "@/components/header";
import { Features } from "@/components/features";
import { FAQ } from "@/components/faq";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { AnimeShowcase } from "@/components/anime-showcase";
import Hero from "@/components/hero";
import { getTopAnime } from "@/lib/services";

export default async function Home() {
  // Fetch 4 pages of anime to get enough for the background
  const [page1, page2, page3, page4] = await Promise.all([
    getTopAnime(1, 25),
    getTopAnime(2, 25),
    getTopAnime(3, 25),
    getTopAnime(4, 25)
  ]);

  const animeList = [
    ...page1.data,
    ...page2.data,
    ...page3.data,
    ...page4.data
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero animeList={animeList} />
        <Features />
        <AnimeShowcase />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
