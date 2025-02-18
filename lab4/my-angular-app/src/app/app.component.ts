/*import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    Hello {{ city }}, {{ 1 + 1 }}
  `,
})
export class AppComponent {
  city = 'San Francisco';
}*/

/*
import {Component} from '@angular/core';

@Component({
  selector: 'app-user',
  template: `
    Username: {{ username }}
  `,
})
export class UserComponent {
  username = 'youngTech';
}

@Component({
  selector: 'app-root',
  template: `
    <section>
      <app-user />
    </section>
  `,
  imports: [UserComponent],
})
export class AppComponent {}*/

/*
import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    @if (isServerRunning) {
    <span>Yes, the server is running</span>
    } @else {
    <span>No, the server is not running</span>
    }
  `,
})
export class AppComponent {
  isServerRunning = true;
}*/


// import {Component} from '@angular/core';

// @Component({
//   selector: 'app-root',
//   template: `
//     @for(user of users; track user.id) {
//     <p>{{ user.name }}</p>
//     }
//   `,
// })
// export class AppComponent {
//   users = [
//     {id: 0, name: 'Sarah'},
//     {id: 1, name: 'Amy'},
//     {id: 2, name: 'Rachel'},
//     {id: 3, name: 'Jessica'},
//     {id: 4, name: 'Poornima'},
//   ];
// }

// import {Component} from '@angular/core';

// @Component({
//   selector: 'app-root',
//   styleUrls: ['app.component.css'],
//   template: `
//     <div [contentEditable]="isEditable"></div>
//   `,
// })
// export class AppComponent {
//   isEditable = true;
// }

// import {Component} from '@angular/core';

// @Component({
//   selector: 'app-root',
//   template: `
//     <section (mouseover)="onMouseOver()">
//       There's a secret message for you, hover to reveal:
//       {{ message }}
//     </section>
//   `,
// })
// export class AppComponent {
//   message = '';

//   onMouseOver() {
//     this.message = 'Way to go 🚀';
//   }
// }


// import { Component } from '@angular/core';
// import { UserComponent } from './user.component';

// @Component({
//   selector: 'app-root',
//   template: `
//     <app-user name="Simran"></app-user>
//   `,
//   standalone: true,
//   imports: [UserComponent],
// })
// export class AppComponent {}


// import {Component} from '@angular/core';
// import {ChildComponent} from './child.component';

// @Component({
//   selector: 'app-root',
//   template: `
//     <app-child (addItemEvent)="addItem($event)" />
//     <p>🐢 all the way down {{ items.length }}</p>
//   `,
//   imports: [ChildComponent],
// })
// export class AppComponent {
//   items = new Array();

//   addItem(item: string) {
//     this.items.push(item);
//   }
// }

/*
import {Component} from '@angular/core';
import {CommentsComponent} from './comments.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>How I feel about Angular</h1>
      <article>
        <p>
          Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
          feature that makes defer loading content the easiest and most ergonomic it could possibly
          be. The Angular community is also filled with amazing contributors and experts that create
          excellent content. The community is welcoming and friendly, and it really is the best
          community out there.
        </p>
        <p>
          I can't express enough how much I enjoy working with Angular. It offers the best developer
          experience I've ever had. I love that the Angular team puts their developers first and
          takes care to make us very happy. They genuinely want Angular to be the best framework it
          can be, and they're doing such an amazing job at it, too. This statement comes from my
          heart and is not at all copied and pasted. In fact, I think I'll say these exact same
          things again a few times.
        </p>
        <p>
          Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
          feature that makes defer loading content the easiest and most ergonomic it could possibly
          be. The Angular community is also filled with amazing contributors and experts that create
          excellent content. The community is welcoming and friendly, and it really is the best
          community out there.
        </p>
        <p>
          I can't express enough how much I enjoy working with Angular. It offers the best developer
          experience I've ever had. I love that the Angular team puts their developers first and
          takes care to make us very happy. They genuinely want Angular to be the best framework it
          can be, and they're doing such an amazing job at it, too. This statement comes from my
          heart and is not at all copied and pasted. In fact, I think I'll say these exact same
          things again a few times.
        </p>
        <p>
          Angular is my favorite framework, and this is why. Angular has the coolest deferrable view
          feature that makes defer loading content the easiest and most ergonomic it could possibly
          be. The Angular community is also filled with amazing contributors and experts that create
          excellent content. The community is welcoming and friendly, and it really is the best
          community out there.
        </p>
        <p>
          I can't express enough how much I enjoy working with Angular. It offers the best developer
          experience I've ever had. I love that the Angular team puts their developers first and
          takes care to make us very happy. They genuinely want Angular to be the best framework it
          can be, and they're doing such an amazing job at it, too. This statement comes from my
          heart and is not at all copied and pasted.
        </p>
      </article>

      @defer (on viewport) {
      <comments />
      } @placeholder {
      <p>Future comments</p>
      } @loading (minimum 2s) {
      <p>Loading comments...</p>
      }
    </div>
  `,
  imports: [CommentsComponent],
})
export class AppComponent {}
*/

// import {Component} from '@angular/core';
// import {RouterOutlet, RouterLink} from '@angular/router';

// @Component({
//   selector: 'app-root',
//   template: `
//     <nav>
//       <a routerLink="/">Home</a>
//       |
//       <a routerLink="/user">User</a>
//     </nav>
//     <router-outlet />
//   `,
//   imports: [RouterOutlet, RouterLink],
// })
// export class AppComponent {}

/*
import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <input type="text" formControlName="name" />
      <input type="email" formControlName="email" />
      <button type="submit">Submit</button>
    </form>

    <h2>Profile Form</h2>
    <p>Name: {{ profileForm.value.name }}</p>
    <p>Email: {{ profileForm.value.email }}</p>
  `,
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  profileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
  });

  handleSubmit() {
    alert(this.profileForm.value.name + ' | ' + this.profileForm.value.email);
  }
}*/

/*
import {Component} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm">
      <input type="text" formControlName="name" name="name" />
      <input type="email" formControlName="email" name="email" />
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class AppComponent {
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}*/

/*
import {Component} from '@angular/core';
import {LowerCasePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    {{ username | lowercase }}
  `,
  imports: [LowerCasePipe],
})
export class AppComponent {
  username = 'yOunGTECh';
}*/


/*
import {Component} from '@angular/core';
import {DecimalPipe, DatePipe, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <ul>
      <li>Number with "decimal" {{ num | number : '3.2-2' }}</li>
      <li>Date with "date" {{ birthday | date : 'medium' }}</li>
      <li>Currency with "currency" {{ cost | currency }}</li>
    </ul>
  `,
  imports: [DecimalPipe, DatePipe, CurrencyPipe],
})
export class AppComponent {
  num = 103.1234;
  birthday = new Date(2023, 3, 2);
  cost = 4560.34;
}*/

/*
import {Component} from '@angular/core';
import {ReversePipe} from './reverse.pipe';

@Component({
  selector: 'app-root',
  template: `
    Reverse Machine: {{ word | reverse }}
  `,
  imports: [ReversePipe],
})
export class AppComponent {
  word = 'You are a champion';
}*/

/*
import {Component} from '@angular/core';
import {ReversePipe} from './reverse.pipe';

@Component({
  selector: 'app-root',
  template: `
    Reverse Machine: {{ word | reverse }}
  `,
  imports: [ReversePipe],
})
export class AppComponent {
  word = 'You are a champion';
}*/




/*
import { Component } from '@angular/core';
import { ArticleCommentsComponent } from './article-comments.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>How I feel about Angular</h1>
      <article>
        <p>
          Angular is my favorite framework, and
          this is why. Angular has the coolest
          deferrable view feature that makes defer
          loading content the easiest and most
          ergonomic it could possibly be.
        </p>
      </article>

      <button (click)="showComments = !showComments">Load Comments</button>

      <article-comments *ngIf="showComments"></article-comments>

    </div>
  `,
  imports: [ArticleCommentsComponent],
})
export class AppComponent {
  showComments = false;
}*/

/*
import {Component} from '@angular/core';
import {ArticleCommentsComponent} from './article-comments.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>How I feel about Angular</h1>
      <article>
        <p>
          Angular is my favorite framework, and
          this is why. Angular has the coolest
          deferrable view feature that makes defer
          loading content the easiest and most
          ergonomic it could possibly be.
        </p>
      </article>

      @defer {
        <article-comments />
      } @placeholder (minimum 1s) {
        <p>Placeholder for comments</p>
      } @loading (minimum 1s; after 500ms) {
        <p>Loading comments...</p>
      } @error {
        <p>Failed to load comments</p>
      }

    </div>
  `,
  imports: [ArticleCommentsComponent],
})
export class AppComponent {}
*/

/*
import {Component} from '@angular/core';
import {ArticleCommentsComponent} from './article-comments.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h1>How I feel about Angular</h1>
      <article>
        <p>
          Angular is my favorite framework, and
          this is why. Angular has the coolest
          deferrable view feature that makes defer
          loading content the easiest and most
          ergonomic it could possibly be.
        </p>
      </article>

      <button type="button" #showComments>Show all comments</button>

      @defer (on hover; on interaction(showComments)) {
        <article-comments />
      } @placeholder (minimum 1s) {
        <p>Placeholder for comments</p>
      } @loading (minimum 1s; after 500ms) {
        <p>Loading comments...</p>
      } @error {
        <p>Failed to load comments</p>
      }

    </div>
  `,
  imports: [ArticleCommentsComponent],
})
export class AppComponent {}*/

// import {Component} from '@angular/core';

// @Component({
//   selector: 'app-root',
//   imports: [],
//   template: `
//     <h1>Hello world!</h1>
//   `,
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   title = 'homes';
// }


import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    RouterLink,
    RouterOutlet,
  ],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}