import { ComunicationPatternModule } from './comunication-pattern/comunication-pattern.module';
import { AppInitializerModule } from './app-initializer/app-initializer.module';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { iconsPathFactory, TuiModeModule, TuiRootModule, TuiThemeNightModule, TUI_ICONS_PATH } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TuiInputModule } from '@taiga-ui/kit';
import { HttpClientModule } from '@angular/common/http';

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
    ComunicationPatternModule
  ],
  providers: [
    {
      provide: TUI_ICONS_PATH,
      useValue: iconsPathFactory('assets/taiga-ui/icons/'),
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
