import { ManageMultipleStreamsModule } from './manage-multiple-streams/manage-multiple-streams.module';
import { ComunicationPatternModule } from './comunication-pattern/comunication-pattern.module';
import { AppInitializerModule } from './app-initializer/app-initializer.module';
import { CoreModule } from './core/core.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { iconsPathFactory, TuiModeModule, TuiRootModule, TuiThemeNightModule, TUI_ICONS_PATH } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationService } from './shared/configuration/configuration.service';

function initializeApp(configService: ConfigurationService) {
  return () => configService.loadConfiguration().toPromise();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiThemeNightModule,
    TuiModeModule,
    TuiInputModule,
    CoreModule,
    HttpClientModule,
    AppInitializerModule,
    ComunicationPatternModule,
    ManageMultipleStreamsModule
  ],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/'),
    },
    ConfigurationService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [ConfigurationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
