interface IApartmentsState {
  loading: boolean;
  data: OnlinerResData | undefined;
  error: unknown;
}

interface IAppState {
  apartmentsState: IApartmentsState;
}
