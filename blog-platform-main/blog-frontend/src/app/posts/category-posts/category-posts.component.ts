import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../posts.service';
import { LoadingSpinnerComponent } from '../../loading-spinner.component';
import { ErrorMessageComponent } from '../../error-message.component';
import { PostCardComponent } from "../post-card/post-card.component";

@Component({
  selector: 'app-category-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    PostCardComponent
],
  templateUrl: './category-posts.component.html',
  styleUrls: ['./category-posts.component.css']
})
export class CategoryPostsComponent implements OnInit {
  posts: any[] = [];
  categoryName: string = '';
  isLoading: boolean = true;
  error: string | null = null;
  currentCategoryId!: number; // Добавляем для хранения текущего ID

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id');
      if (categoryId) {
        this.currentCategoryId = +categoryId;
        this.loadPostsByCategory(this.currentCategoryId);
      }
    });
  }

  // Новый метод для перезагрузки
  reloadPosts(): void {
    this.loadPostsByCategory(this.currentCategoryId);
  }

  loadPostsByCategory(categoryId: number): void {
    this.isLoading = true;
    this.error = null;
    
    this.postsService.getPostsByCategory(categoryId).subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.categoryName = response.categoryName;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load posts';
        this.isLoading = false;
        console.error('Error loading posts:', err);
      }
    });
  }
}