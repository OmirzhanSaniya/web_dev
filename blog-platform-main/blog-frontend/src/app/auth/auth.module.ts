import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Добавьте этот импорт

@NgModule({
  declarations: [
    // LoginComponent
  ],
  imports: [
    ReactiveFormsModule, // <-- Добавьте этот модуль
    // другие импорты...
  ]
})
export class AuthModule { }