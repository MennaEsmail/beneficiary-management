import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items || !searchText) return items;
    
    searchText = searchText.toLowerCase();
    
    return items.filter(item => {
      const budgetStr = item.budget !== undefined && item.budget !== null ? item.budget.toString() : '';
      return (
        item.name.toLowerCase().includes(searchText) || 
        budgetStr.includes(searchText)
      );
    });
  }
}
