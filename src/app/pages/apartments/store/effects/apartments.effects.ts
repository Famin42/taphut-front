import { catchError, map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { ApartmentsService } from '../../apartments.service';
import {
  ApartmentsTypes,
  LoadApartments,
  LoadApartmentsFail,
  LoadApartmentsSuccess,
} from '../actions';

@Injectable()
export class ApartmentsEffect {
  @Effect()
  loadApartments$: Observable<Action> = this.actions$.pipe(
    ofType<LoadApartments>(ApartmentsTypes.GET_APARTMENTS),
    switchMap((action: LoadApartments) =>
      this.apartmentsService.getProductPage(action.payload).pipe(
        map((res: OnlinerResData) => new LoadApartmentsSuccess(res)),
        catchError((err: unknown) => of(new LoadApartmentsFail(err)))
      )
    )
  );
  constructor(private actions$: Actions, private apartmentsService: ApartmentsService) {}
}
