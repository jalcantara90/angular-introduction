import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageMultipleStreamsRoutingModule } from './manage-multiple-streams-routing.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [
    PokemonDetailComponent
  ],
  imports: [
    CommonModule,
    ManageMultipleStreamsRoutingModule
  ],
  exports: [PokemonDetailComponent]
})
export class ManageMultipleStreamsModule { }
