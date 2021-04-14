import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { mockData } from './filters/filters.component';

@Injectable()
export class FilterResolver implements Resolve<IFilter | undefined> {
  resolve(route: ActivatedRouteSnapshot): Observable<IFilter | undefined> {
    const filterId: string | null = route.paramMap.get('id');
    console.log('filterId');
    console.log(filterId);
    return of(mockData.find(({ filterName }: IFilter) => filterName === filterId));
  }
}
