export const environment: IEnv = {
  production: true,
  recaptchaV3SiteKey: '6Lezg60aAAAAAFBREsW9QF5W8mkV0N-vssrRERNa',
  AmplifyConfig: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_3vdRDt5ey',
    userPoolWebClientId: '70t0a4br5emlp1ouin8652docs',
  },
  telegramBotName: 'Taphut_bot',
  GraphQL: {
    Public: {
      token: 'da2-ifkbkodsnrbhllvol5aksnd34i',
      header: 'x-api-key',
      uri: 'https://gnbbtz4fsnbvzen5fmu3azqw24.appsync-api.us-east-1.amazonaws.com/graphql',
    },
    Private: {
      uri: 'https://apwzyl4ydrdvrlitu7aj2ojpey.appsync-api.us-east-1.amazonaws.com/graphql',
    },
  },
};
