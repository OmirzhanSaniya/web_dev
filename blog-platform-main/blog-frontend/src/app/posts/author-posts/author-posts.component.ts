import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../posts.service';
import { PostCardComponent } from '../post-card/post-card.component';
import { LoadingSpinnerComponent } from '../../loading-spinner.component';
import { ErrorMessageComponent } from '../../error-message.component';

@Component({
  selector: 'app-author-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PostCardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './author-posts.component.html',
  styleUrls: ['./author-posts.component.css']
})
export class AuthorPostsComponent implements OnInit {
  posts: any[] = [];
  authorName: string = '';
  isLoading: boolean = true;
  error: string | null = null;
  currentAuthorId!: number; // Добавляем для хранения текущего ID автора

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const authorId = params.get('id');
      if (authorId) {
        this.currentAuthorId = +authorId;
        this.loadPostsByAuthor(this.currentAuthorId);
      }
    });
  }

  // Новый метод для перезагрузки
  reloadPosts(): void {
    this.loadPostsByAuthor(this.currentAuthorId);
  }

  loadPostsByAuthor(authorId: number): void {
    this.isLoading = true;
    this.error = null;
    
    this.postsService.getPostsByAuthor(authorId).subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.authorName = response.authorName;
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