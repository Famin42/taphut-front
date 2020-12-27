import { Action } from '@ngrx/store';

export enum ApartmentsTypes {
  GET_APARTMENTS = '[ Apartments ] Load Apartments',
  GET_APARTMENTS_SUCCESS = '[ Apartments ] Load Apartments Success',
  GET_APARTMENTS_FAIL = '[ Apartments ] Load Apartments Fail',
}

export class LoadApartments implements Action {
  readonly type: ApartmentsTypes.GET_APARTMENTS = ApartmentsTypes.GET_APARTMENTS;

  constructor(public payload: IApartmentsParams) {}
}
export class LoadApartmentsSuccess implements Action {
  readonly type: ApartmentsTypes.GET_APARTMENTS_SUCCESS = ApartmentsTypes.GET_APARTMENTS_SUCCESS;

  constructor(public payload: OnlinerResData) {}
}

export class LoadApartmentsFail implements Action {
  readonly type: ApartmentsTypes.GET_APARTMENTS_FAIL = ApartmentsTypes.GET_APARTMENTS_FAIL;
  constructor(public payload: unknown) {}
}

export type ApartmentsAction = LoadApartments | LoadApartmentsSuccess | LoadApartmentsFail;
