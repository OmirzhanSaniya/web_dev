import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Category } from '../interfaces/category.interface';
import { Post } from '../interfaces/post.interface';
import { Tag } from '../interfaces/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = environment.apiUrl || 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Основные методы для работы с постами
  getPosts(params?: any): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts/`, { params });
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}/`);
  }

  createPost(postData: FormData): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts/`, postData);
  }

  updatePost(id: number, postData: FormData): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${id}/`, postData);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/posts/${id}/`);
  }

  // Методы для лайков и сохранения
  // likePost(postId: number): Observable<{likes_count: number, is_liked: boolean}> {
  //   return this.http.post<{likes_count: number, is_liked: boolean}>(
  //     `${this.apiUrl}/posts/${postId}/like/`, 
  //     {}
  //   );
  // }

  // savePost(postId: number): Observable<{is_saved: boolean}> {
  //   return this.http.post<{is_saved: boolean}>(
  //     `${this.apiUrl}/posts/${postId}/save/`, 
  //     {}
  //   );
  // }

  // Методы для профиля
  getSavedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/profile/saved/`);
  }

  getLikedPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/profile/liked/`);
  }

  // Методы для фильтрации
  getPostsByCategory(categoryId: number): Observable<{posts: Post[], categoryName: string}> {
    return this.http.get<{posts: Post[], categoryName: string}>(
      `${this.apiUrl}/categories/${categoryId}/posts/`
    );
  }

  getPostsByTag(tagId: number): Observable<{posts: Post[], tagName: string}> {
    return this.http.get<{posts: Post[], tagName: string}>(
      `${this.apiUrl}/tags/${tagId}/posts/`
    );
  }

  getPostsByAuthor(authorId: number): Observable<{posts: Post[], authorName: string}> {
    return this.http.get<{posts: Post[], authorName: string}>(
      `${this.apiUrl}/authors/${authorId}/posts/`
    );
  }
  // posts.service.ts
  likePost(postId: number): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts/${postId}/like/`, {});
  }

  savePost(postId: number): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts/${postId}/save/`, {});
  }
}