import { ApartmentsAction, ApartmentsTypes } from '../actions';

export const apartmentsInitialState: IApartmentsState = {
  loading: false,
  data: {
    nextToken: undefined,
    scannedCount: 0,
    items: [],
  },
  error: undefined,
};

export function apartmentsReducer(
  state: IApartmentsState = apartmentsInitialState,
  action: ApartmentsAction
): IApartmentsState {
  const items: OnlinerApartmentRow[] = state.data.items;

  switch (action.type) {
    case ApartmentsTypes.GET_APARTMENTS:
      return {
        ...state,
        loading: true,
      };
    case ApartmentsTypes.GET_APARTMENTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ApartmentsTypes.GET_APARTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {
          nextToken: action.payload.nextToken,
          items: [...items, ...action.payload.items],
          scannedCount: state.data.scannedCount + action.payload.scannedCount,
        },
      };

    default:
      return state;
  }
}
