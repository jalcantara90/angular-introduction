import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetworkPreloadStrategy } from './network-preload.strategy';

const routes: Routes = [
  { path: 'app-initializer', loadChildren: () => import('./app-initializer/app-initializer.module').then(m => m.AppInitializerModule) },
  { path: 'comunication-pattern', loadChildren: () => import('./comunication-pattern/comunication-pattern.module').then(m => m.ComunicationPatternModule) },
  { path: 'multiple-stream', loadChildren: () => import('./manage-multiple-streams/manage-multiple-streams.module').then(m => m.ManageMultipleStreamsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: NetworkPreloadStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
