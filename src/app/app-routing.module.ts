import { PokemonDetailComponent } from './manage-multiple-streams/pokemon-detail/pokemon-detail.component';
import { ParentComponent } from './comunication-pattern/parent/parent.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppInitializerComponent } from './app-initializer/app-initializer.component';

const routes: Routes = [
  { path: 'app-initializer', loadChildren: () => import('./app-initializer/app-initializer.module').then(m => m.AppInitializerModule) },
  { path: 'comunication-pattern', loadChildren: () => import('./comunication-pattern/comunication-pattern.module').then(m => m.ComunicationPatternModule) },
  { path: 'multiple-stream', loadChildren: () => import('./manage-multiple-streams/manage-multiple-streams.module').then(m => m.ManageMultipleStreamsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
