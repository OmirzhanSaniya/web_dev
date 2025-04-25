import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { SavedPostsComponent } from './profile/saved-posts/saved-posts.component';
import { LikedPostsComponent } from './profile/liked-posts/liked-posts.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryPostsComponent } from './posts/category-posts/category-posts.component';
import { TagPostsComponent } from './posts/tag-posts/tag-posts.component';
import { AuthorPostsComponent } from './posts/author-posts/author-posts.component';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  
  // Auth routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Post routes
  { path: 'posts', component: PostListComponent },
  { path: 'posts/new', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'posts/:id/edit', component: PostEditComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id/like', redirectTo: 'posts/:id' }, // Обработка лайков через API
  { path: 'posts/:id/save', redirectTo: 'posts/:id' }, // Обработка сохранений через API
  
  // Category/Tag/Author routes
  { path: 'categories/:id', component: CategoryPostsComponent },
  { path: 'tags/:id', component: TagPostsComponent },
  { path: 'authors/:id', component: AuthorPostsComponent },
  
  // Profile routes
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/saved', component: SavedPostsComponent, canActivate: [AuthGuard] },
  { path: 'profile/liked', component: LikedPostsComponent, canActivate: [AuthGuard] },
  
  // Fallback routes
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }