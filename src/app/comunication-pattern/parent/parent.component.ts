import { Component } from '@angular/core';
import { Pokemon, PokemonService } from 'src/app/shared/pokemon/pokemon.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  selected: Pokemon = null;

  constructor(private pokemonService: PokemonService) { }

  getPokemon(search: string) {
    this.pokemonService.searchPokemon(search)
      .subscribe(pokemon => this.selected = pokemon);
  }
}
