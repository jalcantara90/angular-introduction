import { ComunicationPatternRoutingModule } from './comunication-pattern-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';



@NgModule({
  declarations: [
    ParentComponent,
    ChildComponent
  ],
  imports: [
    CommonModule,
    ComunicationPatternRoutingModule
  ],
  exports: [
    ParentComponent
  ]
})
export class ComunicationPatternModule { }
