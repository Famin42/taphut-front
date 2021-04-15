import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { Auth } from 'aws-amplify';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

Auth.configure(environment.AmplifyConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
