import * as _ from 'lodash';

import { apartmentsInitialState } from '../reducers';
import {
  getApartmentsData,
  getApartmentsLoading,
  getApartmentsError,
} from './apartments.selectors';

describe('Apartments Selectors', () => {
  const appState: IAppState = {
    apartmentsState: _.cloneDeep(apartmentsInitialState),
  };

  it('should return apartments data from AppState', () => {
    expect(_.isEqual(getApartmentsData(appState), { token: undefined, data: [] })).toBeTruthy();
  });

  it('should return apartments loading from AppState', () => {
    expect(
      _.isEqual(getApartmentsLoading(appState), appState.apartmentsState.loading)
    ).toBeTruthy();
  });

  it('should return apartments error from AppState', () => {
    expect(_.isEqual(getApartmentsError(appState), appState.apartmentsState.error)).toBeTruthy();
  });
});
