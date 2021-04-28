import { ComunicationPatternRoutingModule } from './comunication-pattern-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';

import {TuiInputModule} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {TuiMarkerIconModule} from '@taiga-ui/kit';
import { PokemonCardModule } from '../shared/pokemon-card/pokemon-card.module';

@NgModule({
  declarations: [
    ParentComponent,
    ChildComponent
  ],
  imports: [
    CommonModule,
    ComunicationPatternRoutingModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiMarkerIconModule,
    PokemonCardModule
  ],
  exports: [
    ParentComponent
  ]
})
export class ComunicationPatternModule { }
