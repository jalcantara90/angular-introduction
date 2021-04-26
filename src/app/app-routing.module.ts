import { ParentComponent } from './comunication-pattern/parent/parent.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppInitializerComponent } from './app-initializer/app-initializer.component';

const routes: Routes = [
  { path: 'app-initializer', component: AppInitializerComponent },
  { path: 'comunication-pattern', component: ParentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
