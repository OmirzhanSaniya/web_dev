import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriesService } from '../../services/categories.service';
import { TagsService } from '../../services/tags.service';
import { Category } from '../../interfaces/category.interface';
import { Post } from '../../interfaces/post.interface';
import { Tag } from '../../interfaces/tag.interface';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from "../../truncate.pipe";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, TruncatePipe],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  categories: Category[] = [];
  tags: Tag[] = [];
  isAuthenticated = false;
  currentUser: {id: number, username: string} | null = null;
  selectedCategory: string | null = null;
  selectedTag: string | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private router: Router,
    private categoriesService: CategoriesService,
    private tagsService: TagsService
  ) {}

  ngOnInit(): void {
    this.setupAuthSubscription();
    this.loadData();
  }

  private setupAuthSubscription(): void {
    this.authService.isAuthenticated$.subscribe({
      next: (auth) => {
        this.isAuthenticated = auth;
        const userId = this.authService.getCurrentUserId();
        this.currentUser = auth && userId ? {id: userId, username: 'Unknown'} : null;
        
        if (auth && userId) {
          this.loadUserProfile(userId);
        }
      },
      error: (err) => {
        console.error('Auth error:', err);
        this.error = 'Failed to check authentication status';
      }
    });
  }

  private loadUserProfile(userId: number): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.currentUser = {
          id: userId,
          username: profile.username
        };
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
        this.currentUser = {id: userId, username: 'Unknown'};
      }
    });
  }

  loadData(): void {
    this.isLoading = true;
    this.error = null;
    
    Promise.all([
      this.loadPosts(),
      this.loadCategories(),
      this.loadTags()
    ]).catch(err => {
      this.error = 'Failed to load data';
      console.error('Loading error:', err);
    }).finally(() => {
      this.isLoading = false;
    });
  }

  loadPosts(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.postsService.getPosts().subscribe({
        next: (posts) => {
          this.posts = posts;
          this.applyFilters();
          resolve();
        },
        error: (err) => {
          this.error = 'Failed to load posts';
          console.error('Failed to load posts:', err);
          reject(err);
        }
      });
    });
  }

  applyFilters(): void {
    this.filteredPosts = this.posts.filter(post => {
      const categoryMatch = !this.selectedCategory || 
                          post.category.name === this.selectedCategory;
      
      const tagMatch = !this.selectedTag || 
                      post.tags.some(tag => tag.name === this.selectedTag);
      
      return categoryMatch && tagMatch;
    });
  }

  onCategorySelect(categoryName: string): void {
    this.selectedCategory = this.selectedCategory === categoryName ? null : categoryName;
    this.applyFilters();
  }

  onTagSelect(tagName: string): void {
    this.selectedTag = this.selectedTag === tagName ? null : tagName;
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = null;
    this.selectedTag = null;
    this.applyFilters();
  }

  loadCategories(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.categoriesService.getCategories().subscribe({
        next: (categories) => {
          this.categories = categories;
          resolve();
        },
        error: (err) => {
          console.error('Failed to load categories:', err);
          reject(err);
        }
      });
    });
  }

  loadTags(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.tagsService.getTags().subscribe({
        next: (tags) => {
          this.tags = tags;
          resolve();
        },
        error: (err) => {
          console.error('Failed to load tags:', err);
          reject(err);
        }
      });
    });
  }

  likePost(postId: number): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
  
    this.postsService.likePost(postId).subscribe({
      next: (updatedPost) => {
        this.updatePostInList(updatedPost);
      },
      error: (err) => {
        this.handleError('Failed to like post', err);
      }
    });
  }

  savePost(postId: number): void {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
  
    this.postsService.savePost(postId).subscribe({
      next: (updatedPost) => {
        this.updatePostInList(updatedPost);
      },
      error: (err) => {
        this.handleError('Failed to save post', err);
      }
    });
  }

  deletePost(postId: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postsService.deletePost(postId).subscribe({
        next: () => {
          this.loadPosts();
        },
        error: (err) => {
          this.handleError('Failed to delete post', err);
        }
      });
    }
  }

  onAuthorSelect(authorId: number): void {
    this.router.navigate(['/authors', authorId]);
  }

  private updatePostInList(updatedPost: Post): void {
    const index = this.posts.findIndex(p => p.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
      this.applyFilters();
    }
  }

  private handleError(message: string, err: any): void {
    console.error(`${message}:`, err);
    this.error = message;
  }
}