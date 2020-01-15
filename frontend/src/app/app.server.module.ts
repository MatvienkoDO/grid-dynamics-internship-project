import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TranslateServerLoader } from 'src/app/translate-server-loader.service';
import { TransferState } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}

export function translateFactory(transferState: TransferState) {
  return new TranslateServerLoader('/assets/i18n', '.json', transferState);
}

TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: translateFactory,
    deps: [TransferState]
  }
});
