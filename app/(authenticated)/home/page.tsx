import { getTopAnime } from "@/lib/services";
import { AnimeFilters } from "@/components/home/anime-filters";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { AnimeList } from "@/components/home/anime-list";

export default async function HomePage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    type?: string;
    filter?: string;
    rating?: string;
  };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const type = searchParams.type || "";
  const filter = searchParams.filter || "";
  const rating = searchParams.rating || "";

  const { data: animeList, pagination } = await getTopAnime(
    currentPage,
    16,
    type,
    filter,
    rating
  );


  // Check if next page is available within the 10-page limit
  const hasNextPage = pagination.has_next_page && currentPage < 10;

  // Helper function to generate URL with current filters
  const getPageUrl = (page: number) => {
    const params = new URLSearchParams({
      page: page.toString(),
      ...(type && { type }),
      ...(filter && { filter }),
      ...(rating && { rating }),
    });
    return `/home?${params.toString()}`;
  };

  return (
    <div className="pt-20 mb-20">
      <div className="space-y-1 mb-8">
        <h1 className="text-2xl font-semibold">Top Anime</h1>
        <p className="text-muted-foreground">
          Discover the highest-rated anime of all time
        </p>
      </div>

      <AnimeFilters type={type} filter={filter} rating={rating} />

      <AnimeList animeList={animeList} itemsPerRow={4} />

      <div className="mt-8 flex justify-end items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className={`cursor-pointer ${
            currentPage === 1 ? "pointer-events-none text-slate-400" : ""
          }`}
          asChild
          disabled={currentPage === 1}
        >
          <Link href={getPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>

        <span className="text-xs font-normal">Page {currentPage}</span>

        <Button
          variant="ghost"
          size="icon"
          className={`cursor-pointer ${
            !hasNextPage ? "pointer-events-none text-slate-400" : ""
          }`}
          asChild
          disabled={!hasNextPage}
        >
          <Link href={getPageUrl(currentPage + 1)}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
