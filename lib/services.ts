const JIKAN_API_BASE = "https://api.jikan.moe/v4";

export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };
  score: number;
  episodes: number;
  status: string;
  year: number;
  rating: string;
  genres: {
    mal_id: number;
    name: string;
  }[];
}

export interface AnimeResponse {
  data: Anime[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

export async function getTopAnime(
  page: number = 1,
  limit: number = 16,
  type: string = "",
  filter: string = "",
  rating: string = ""
): Promise<AnimeResponse> {
  try {
    const response = await fetch(
      `${JIKAN_API_BASE}/top/anime?page=${page}&limit=${limit}&sfw=true&type=${type}&filter=${filter}&rating=${rating}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error("Failed to fetch top anime");
    }

    const data: AnimeResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching top anime:", error);
    throw error;
  }
}

export async function getAnimeById(id: string) {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    throw error;
  }
}

export async function searchAnime(query: string): Promise<AnimeResponse> {
  try {
    const response = await fetch(
      `${JIKAN_API_BASE}/anime?q=${encodeURIComponent(query)}&sfw=true&limit=10`
    );

    if (!response.ok) {
      throw new Error("Failed to search anime");
    }

    const data: AnimeResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching anime:", error);
    throw error;
  }
}
