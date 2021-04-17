interface IGraphQL {
  Public: {
    token: string;
    header: string;
    uri: string;
  };
  Private: { uri: string };
}

interface IAmplifyConfig {
  region: string;
  userPoolId: string;
  userPoolWebClientId: string;
}

interface IEnv {
  production: boolean;
  recaptchaV3SiteKey: string;
  AmplifyConfig: IAmplifyConfig;
  telegramBotName: string;
  GraphQL: IGraphQL;
}
