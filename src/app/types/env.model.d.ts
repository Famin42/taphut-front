interface IGraphQL {
  Public: {
    token: string;
    header: string;
    uri: string;
  };
}

interface IAmplifyConfig {
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
}

interface IEnv {
  production: boolean;
  AmplifyConfig: IAmplifyConfig;
  telegramBotName: string;
  GraphQL: IGraphQL;
}
