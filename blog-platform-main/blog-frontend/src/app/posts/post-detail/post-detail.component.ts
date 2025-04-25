import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.loadPost();
  }

  private loadPost(): void {
    const postId = this.route.snapshot.paramMap.get('id');
    
    if (!postId || isNaN(+postId)) {
      this.error = 'Invalid post ID';
      this.isLoading = false;
      return;
    }

    this.postsService.getPost(+postId).subscribe({
      next: (post) => {
        this.post = post;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load post:', err);
        this.error = 'Failed to load post';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/posts']), 3000);
      }
    });
  }

  likePost(postId: number): void {
    // Реализация функции лайка
    this.postsService.likePost(postId).subscribe({
      next: (updatedPost) => {
        if (this.post) {
          this.post = { ...this.post, ...updatedPost };
        }
      },
      error: (err) => console.error('Error liking post:', err)
    });
  }

  savePost(postId: number): void {
    // Реализация функции сохранения
    this.postsService.savePost(postId).subscribe({
      next: (updatedPost) => {
        if (this.post) {
          this.post = { ...this.post, ...updatedPost };
        }
      },
      error: (err) => console.error('Error saving post:', err)
    });
  }
  // post-list.component.ts
// likePost(postId: number): void {
//   if (!this.isAuthenticated) {
//     this.router.navigate(['/login']);
//     return;
//   }

//   this.postsService.likePost(postId).subscribe({
//     next: (updatedPost) => {
//       const index = this.posts.findIndex(p => p.id === postId);
//       if (index !== -1) {
//         // Обновляем только необходимые поля
//         this.posts[index] = {
//           ...this.posts[index],
//           likes_count: updatedPost.likes_count,
//           is_liked: updatedPost.is_liked
//         };
//         this.applyFilters();
//       }
//     },
//     error: (err) => {
//       this.handleError('Failed to like post', err);
//     }
//   });
// }

// savePost(postId: number): void {
//   if (!this.isAuthenticated) {
//     this.router.navigate(['/login']);
//     return;
//   }

//   this.postsService.savePost(postId).subscribe({
//     next: (updatedPost) => {
//       const index = this.posts.findIndex(p => p.id === postId);
//       if (index !== -1) {
//         // Обновляем только поле is_saved
//         this.posts[index] = {
//           ...this.posts[index],
//           is_saved: updatedPost.is_saved
//         };
//         this.applyFilters();
//       }
//     },
//     error: (err) => {
//       this.handleError('Failed to save post', err);
//     }
//   });
// }
}