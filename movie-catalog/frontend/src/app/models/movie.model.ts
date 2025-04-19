export interface Movie {
    id: number;
    title: string;
    description: string;
    release_year: number;
    duration_minutes: number;
    rating: number;
    genres: Genre[]; // Гарантируем, что это всегда массив (хотя бы пустой)
    director: Director; // Гарантируем наличие директора
    poster_url?: string; // Опциональное поле
  }
  
  // Добавим интерфейсы для Genre и Director
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Director {
    id: number;
    name: string;
    bio?: string;
  }
  
  export interface MovieParams {
    page?: number;
    search?: string;
    release_year?: number;
    'release_year__gte'?: number;
    'release_year__lte'?: number;
    rating?: number;
    'rating__gte'?: number;
    'rating__lte'?: number;
    genres__id?: number;
    director__id?: number;
    ordering?: string;
  }