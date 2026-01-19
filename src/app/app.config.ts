import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TitleStrategy } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { TituloStrategy } from './titulo-strategy';
import { loggerInterceptor } from './core/interceptor/logger.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([loggerInterceptor])),
    { provide: TitleStrategy, useClass: TituloStrategy },
  ],
};
