import { Pokemon, PokemonService } from '../shared/pokemon/pokemon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-initializer',
  templateUrl: './app-initializer.component.html',
  styleUrls: ['./app-initializer.component.scss']
})
export class AppInitializerComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemonService.getPokemonList()
      .subscribe((response) => this.pokemonList = response)
  }

}
