import { Action, ActionReducer } from '@ngrx/store';

export enum ClearStateActionTypes {
  RESET = '[App] Reset',
}

export class ResetStore implements Action {
  readonly type: ClearStateActionTypes.RESET = ClearStateActionTypes.RESET;
}

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any) => {
    if (action.type === ClearStateActionTypes.RESET) {
      state = undefined;
    }

    return reducer(state, action);
  };
}
