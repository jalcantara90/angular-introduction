import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppInitializerComponent } from './app-initializer.component';
import { AppInitializerRoutingModule } from './app-initializer-routing.module';
import { PokemonCardModule } from '../shared/pokemon-card/pokemon-card.module';

@NgModule({
  declarations: [
    AppInitializerComponent
  ],
  imports: [
    CommonModule,
    AppInitializerRoutingModule,
    PokemonCardModule
  ],
  exports: [
    AppInitializerComponent
  ]
})
export class AppInitializerModule { }
