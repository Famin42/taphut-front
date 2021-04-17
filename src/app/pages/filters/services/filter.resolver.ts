import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AmplifyService, CHAT_ID_KEY } from 'src/app/core/services/amplify.service';
import { FilterService } from './filter.service';

@Injectable()
export class FilterResolver implements Resolve<IFilterRow | undefined> {
  constructor(private filterService: FilterService, private amplify: AmplifyService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<IFilterRow | undefined> {
    const filterId: string | null = route.paramMap.get('id');
    console.log('filterId');
    console.log(filterId);
    return this.amplify.currentUserSubj.pipe(
      take(1),
      map((user: any) => user?.attributes[CHAT_ID_KEY]),
      switchMap((chatId: string) => {
        if (!chatId || !filterId) {
          throw new Error('There are some troubles');
        }
        return this.filterService.getFilterByName(chatId, filterId).pipe(
          tap((data) => {
            console.log(`FilterResolver`);
            console.log(data);
          })
        );
      }),
      catchError((err: any) => {
        console.error('FilterResolver ERROR');
        console.error(err);
        return of(undefined);
      })
    );
  }
}
