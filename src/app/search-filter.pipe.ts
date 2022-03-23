import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(item: any[], searchText: string): any[] 
  {
    if (!item)
    {
      return [];
    }
    if (!searchText)
    {
      return item;
    }
    searchText = searchText.toLocaleLowerCase();
    return item.filter(items=> 
    {
      return items.toLocaleLowerCase().includes(searchText);
    });
  }

}
