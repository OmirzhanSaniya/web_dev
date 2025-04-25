import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="post-card">
      <h3>{{ post.title }}</h3>
      <p class="excerpt">{{ post.body | slice:0:100 }}...</p>
      <a [routerLink]="['/posts', post.id]" class="read-more">Read more</a>
    </div>
  `,
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() post: any;
}