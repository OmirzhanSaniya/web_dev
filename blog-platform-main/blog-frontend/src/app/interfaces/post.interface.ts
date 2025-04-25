import { Category } from "./category.interface";
import { Tag } from "./tag.interface";

export interface Post {
    id: number;
    title: string;
    content: string;
    category: {
      id: number;
      name: string;
    };
    tags: {
      id: number;
      name: string;
    }[];
    author: {
      id: number;
      username: string;
    };
    created_at: string;
    likes_count: number;
    is_liked?: boolean;
    is_saved?: boolean;
    // добавьте другие необходимые поля
  }