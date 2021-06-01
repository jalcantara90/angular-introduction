import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: ':pokemonId', component: PokemonDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageMultipleStreamsRoutingModule { }
