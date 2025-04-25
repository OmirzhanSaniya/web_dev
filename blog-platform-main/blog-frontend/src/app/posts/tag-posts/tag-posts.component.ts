import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PostsService } from '../posts.service';
import { PostCardComponent } from '../post-card/post-card.component';
import { LoadingSpinnerComponent } from '../../loading-spinner.component';
import { ErrorMessageComponent } from '../../error-message.component';

@Component({
  selector: 'app-tag-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PostCardComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent
  ],
  templateUrl: './tag-posts.component.html',
  styleUrls: ['./tag-posts.component.css']
})
export class TagPostsComponent implements OnInit {
  posts: any[] = [];
  tagName: string = '';
  isLoading: boolean = true;
  error: string | null = null;
  currentTagId!: number; // Изменили тип, уверены что будет число

  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const tagId = params.get('id');
      if (tagId) {
        this.currentTagId = +tagId;
        this.loadPostsByTag(this.currentTagId);
      }
    });
  }

  reloadPosts(): void {
    this.loadPostsByTag(this.currentTagId);
  }

  private loadPostsByTag(tagId: number): void {
    this.isLoading = true;
    this.error = null;
    
    this.postsService.getPostsByTag(tagId).subscribe({
      next: (response) => {
        this.posts = response.posts;
        this.tagName = response.tagName;
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