import { enableProdMode } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// TODO fix
// import Amplify, { Auth } from 'aws-amplify';
export const AmplifyConfig = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_3vdRDt5ey',
  userPoolWebClientId: '70t0a4br5emlp1ouin8652docs',
};
//
// If you uncomment this it will fail:
// Amplify.configure(AmplifyConfig);
// Auth.configure(AmplifyConfig);

// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);
