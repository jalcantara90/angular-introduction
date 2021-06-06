import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, PokemonService } from 'src/app/shared/pokemon/pokemon.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {
  selected$!: Observable<Pokemon>;

  constructor(private pokemonService: PokemonService) { }

  getPokemon(search: string) {
    this.selected$ = this.pokemonService.searchPokemon(search);
  }
}
