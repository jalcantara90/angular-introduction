import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInitializerComponent } from './app-initializer.component';
import { AppInitializerRoutingModule } from './app-initializer-routing.module';

@NgModule({
  declarations: [
    AppInitializerComponent
  ],
  imports: [
    CommonModule,
    AppInitializerRoutingModule
  ],
  exports: [
    AppInitializerComponent
  ]
})
export class AppInitializerModule { }
