interface IApartmentsState {
  loading: boolean;
  data: OnlinerResData;
  error: unknown;
}

interface IAppState {
  apartmentsState: IApartmentsState;
}
