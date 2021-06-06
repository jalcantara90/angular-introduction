import { Component, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { PokemonService } from 'src/app/shared/pokemon/pokemon.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {

  searchPokemonControl = new FormControl();

  @Output() searchPokemon = this.searchPokemonControl.valueChanges.pipe(
    debounceTime(400),
    switchMap(search => this.pokemonService.searchPokemon(search)),
  );

  constructor(private pokemonService: PokemonService) { }
}
