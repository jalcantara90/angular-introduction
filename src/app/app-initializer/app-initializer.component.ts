import { Pokemon, PokemonService } from '../shared/pokemon/pokemon.service';
import { ConfigurationService } from './../shared/configuration/configuration.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-app-initializer',
  templateUrl: './app-initializer.component.html',
  styleUrls: ['./app-initializer.component.scss']
})
export class AppInitializerComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(
    private configurationService: ConfigurationService,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.configurationService.loadConfiguration().pipe(
      switchMap(() => this.pokemonService.getPokemonList())
    ).subscribe((response) => this.pokemonList = response);
  }

}
