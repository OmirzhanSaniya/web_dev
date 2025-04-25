import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { PostsService } from '../../posts/posts.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  savedPosts: any[] = [];
  likedPosts: any[] = [];
  user: any;

  constructor(
    private authService: AuthService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadSavedPosts();
    this.loadLikedPosts();
  }

  loadUserProfile(): void {
    // Assuming you have an endpoint to get user profile
    this.authService.getProfile().subscribe(profile => {
      this.user = profile;
    });
  }

  loadSavedPosts(): void {
    this.postsService.getSavedPosts().subscribe(posts => {
      this.savedPosts = posts;
    });
  }

  loadLikedPosts(): void {
    this.postsService.getLikedPosts().subscribe(posts => {
      this.likedPosts = posts;
    });
  }
}