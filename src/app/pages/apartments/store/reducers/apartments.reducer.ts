import { ApartmentsAction, ApartmentsTypes } from '../actions';

export const apartmentsInitialState: IApartmentsState = {
  loading: false,
  data: undefined,
  error: undefined,
};

export function apartmentsReducer(
  state: IApartmentsState = apartmentsInitialState,
  action: ApartmentsAction
): IApartmentsState {
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
        data: action.payload,
      };

    default:
      return state;
  }
}
