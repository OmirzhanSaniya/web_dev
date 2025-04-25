import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit: number = 50): string {
    if (!value) return ''; // Обработка null/undefined
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}