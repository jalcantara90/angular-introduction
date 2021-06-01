import { PokemonDetailComponent } from './manage-multiple-streams/pokemon-detail/pokemon-detail.component';
import { ParentComponent } from './comunication-pattern/parent/parent.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppInitializerComponent } from './app-initializer/app-initializer.component';

const routes: Routes = [
  { path: 'app-initializer', component: AppInitializerComponent },
  { path: 'comunication-pattern', component: ParentComponent },
  { path: 'multiple-stream/:pokemonId', component: PokemonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
