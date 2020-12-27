// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: IEnv = {
  production: false,
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
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
