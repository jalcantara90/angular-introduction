import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AppInitializerComponent } from './app-initializer.component';

const routes: Routes = [
  { path: '', component: AppInitializerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppInitializerRoutingModule {}
