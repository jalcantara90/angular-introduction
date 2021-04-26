import { ComunicationPatternRoutingModule } from './comunication-pattern-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';

import {TuiInputModule} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {TuiMarkerIconModule} from '@taiga-ui/kit';

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
    TuiMarkerIconModule
  ],
  exports: [
    ParentComponent
  ]
})
export class ComunicationPatternModule { }
