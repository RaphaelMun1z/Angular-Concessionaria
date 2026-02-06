import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

//bootstrapApplication(App, appConfig).catch((err) => console.error(err));

bootstrapApplication(App, appConfig).then(() => {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    lucide.createIcons();
  }
});
