import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

// Used for production mode
// ************************
// import {enableProdMode} from '@angular/core';
//
// enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
