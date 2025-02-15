import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPipe',
  standalone: true, // Standalone Pipe
})
export class SortPipe implements PipeTransform {
  transform(items: any[], field: string, order: string): any[] {
    if (!items || !field) return items;
    return items.sort((a, b) => {
      let comparison = 0;
      if (a[field] > b[field]) comparison = 1;
      else if (a[field] < b[field]) comparison = -1;

      return order === 'asc' ? comparison : -comparison;
    });
  }
}
