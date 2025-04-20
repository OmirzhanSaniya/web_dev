export interface Movie {
    id?: number;
    title: string;
    year: number;
    duration: string;
    genre: string;
    description: string;
    director: string;
    cast: string;
    imdb_rating?: number | null;
    poster_url?: string | null;
  }