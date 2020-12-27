interface IApartmentsState {
  loading: boolean;
  data: ResData | undefined;
  error: unknown;
}

interface IAppState {
  apartmentsState: IApartmentsState;
}
