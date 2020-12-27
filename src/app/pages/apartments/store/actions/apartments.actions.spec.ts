import * as _ from 'lodash';

import * as ApartmentsActions from './apartments.actions';
import { MOCK_ONLINER_APARTMENTS } from 'src/app/common/mocks';

const LIMIT = 10;

describe('Apartments Actions', () => {
  it('should create a LoadApartments action', () => {
    const expectedPayload: IApartmentsParams = { limit: LIMIT };
    const action: ApartmentsActions.LoadApartments = new ApartmentsActions.LoadApartments(
      expectedPayload
    );
    expect(action.type).toEqual(ApartmentsActions.ApartmentsTypes.GET_APARTMENTS);
    expect(_.isEqual(action.payload, expectedPayload)).toBeTruthy();
  });
  it('should create a LoadApartmentsFail action', () => {
    const expectedPayload: Error = new Error('some error');
    const action: ApartmentsActions.LoadApartmentsFail = new ApartmentsActions.LoadApartmentsFail(
      expectedPayload
    );
    expect(action.type).toEqual(ApartmentsActions.ApartmentsTypes.GET_APARTMENTS_FAIL);
    expect(action.payload).toEqual(expectedPayload);
  });
  it('should create a LoadApartmentsSuccess action', () => {
    const expectedPayload: OnlinerResData = _.cloneDeep(MOCK_ONLINER_APARTMENTS);
    const action: ApartmentsActions.LoadApartmentsSuccess = new ApartmentsActions.LoadApartmentsSuccess(
      expectedPayload
    );
    expect(action.type).toEqual(ApartmentsActions.ApartmentsTypes.GET_APARTMENTS_SUCCESS);
    expect(action.payload).toEqual(expectedPayload);
  });
});
