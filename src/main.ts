import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import Amplify from 'aws-amplify';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

Amplify.configure(environment.AmplifyConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

//
// If you uncomment this it will fail:
// Amplify.configure(AmplifyConfig);
// Auth.configure(AmplifyConfig);

// import awsconfig from './aws-exports';
// Amplify.configure(awsconfig);
