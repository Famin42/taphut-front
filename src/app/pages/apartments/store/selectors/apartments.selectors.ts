import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

const getApartmentsFeatureState: MemoizedSelector<
  IAppState,
  IApartmentsState
> = createFeatureSelector<IApartmentsState>('apartmentsState');

export const getApartmentsData: MemoizedSelector<
  IAppState,
  {
    data: IProduct[];
    token: string | undefined;
  }
> = createSelector(getApartmentsFeatureState, (state: IApartmentsState) => ({
  data: state.data?.items?.map((item: OnlinerApartmentRow) => convertToProduct(item)) || [],
  token: state.data?.nextToken,
}));

export const getApartmentsLoading: MemoizedSelector<IAppState, boolean> = createSelector(
  getApartmentsFeatureState,
  (state: IApartmentsState) => state.loading
);

export const getApartmentsError: MemoizedSelector<IAppState, unknown> = createSelector(
  getApartmentsFeatureState,
  (state: IApartmentsState) => state.error
);

function convertToProduct(item: OnlinerApartmentRow): IProduct {
  return {
    id: item.id.toString(),
    title: item.apartment.rent_type.split('_').concat(' ').toString(),
    description: item.apartment.location.address,
    price: item.apartment.price.amount,
    currency: item.apartment.price.currency,
    location: item.apartment.location.address,
    sourceLink: item.apartment.url,
    imageLink: item.apartment.photo,
  };
}
