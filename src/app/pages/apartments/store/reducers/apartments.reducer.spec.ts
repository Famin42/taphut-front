import * as _ from 'lodash';
import { MOCK_ONLINER_PAGINATION_RES } from 'src/app/common/mocks';

import * as apartments from '../actions/apartments.actions';
import { apartmentsInitialState, apartmentsReducer } from './apartments.reducer';

const LIMIT = 10;

describe('Apartments Reducer', () => {
  it('should execute GET_APARTMENTS case', () => {
    const payload: IApartmentsParams = {
      limit: LIMIT,
    };
    const expectedState: IApartmentsState = {
      ...apartmentsInitialState,
      loading: true,
    };
    const action: apartments.LoadApartments = new apartments.LoadApartments(payload);

    const actualState: IApartmentsState = apartmentsReducer(
      _.cloneDeep(apartmentsInitialState),
      action
    );

    expect(action.type).toEqual(apartments.ApartmentsTypes.GET_APARTMENTS);
    expect(action.type).toEqual(apartments.ApartmentsTypes.GET_APARTMENTS);
    expect(_.isEqual(actualState, expectedState)).toBeTruthy();
  });

  it('should execute GET_APARTMENTS_SUCCESS case', () => {
    const payload: IOnlinerPaginationRes = MOCK_ONLINER_PAGINATION_RES;
    const expectedState: IApartmentsState = {
      ..._.cloneDeep(apartmentsInitialState),
      loading: false,
      data: MOCK_ONLINER_PAGINATION_RES.onlinerApartments,
    };
    const action: apartments.LoadApartmentsSuccess = new apartments.LoadApartmentsSuccess(payload);

    const actualState: IApartmentsState = apartmentsReducer(
      _.cloneDeep(apartmentsInitialState),
      action
    );

    expect(action.type).toEqual(apartments.ApartmentsTypes.GET_APARTMENTS_SUCCESS);
    expect(_.isEqual(actualState, expectedState)).toBeTruthy();
  });

  it('should execute GET_APARTMENTS_FAIL case', () => {
    const payload: Error = new Error(apartments.ApartmentsTypes.GET_APARTMENTS_FAIL);
    const expectedState: IApartmentsState = {
      ..._.cloneDeep(apartmentsInitialState),
      error: payload,
    };
    const action: apartments.LoadApartmentsFail = new apartments.LoadApartmentsFail(payload);

    const actualState: IApartmentsState = apartmentsReducer(
      _.cloneDeep(apartmentsInitialState),
      action
    );

    expect(action.type).toEqual(apartments.ApartmentsTypes.GET_APARTMENTS_FAIL);
    expect(_.isEqual(actualState, expectedState)).toBeTruthy();
  });
});
