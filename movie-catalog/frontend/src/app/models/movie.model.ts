import { Director } from "./director";
import { Genre } from "./genre";

export interface Movie {
  id?: number;
  title: string;
  year: number;
  duration: string;
  description: string;
  genres: Genre[];         
  director: Director; 
  cast: string;
  imdb_rating?: number | null;
  poster_url?: string | null;
}