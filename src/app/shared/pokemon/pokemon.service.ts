import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from '../configuration/configuration.service';
import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient
  ) { }

  getBulbasaur() {
    return this.http.get<Pokemon>(this.configurationService.config.apiUrl + '/1');
  }

  searchPokemon(pokemonName: string) {
    return this.http.get<Pokemon>(this.configurationService.config.apiUrl + `/${pokemonName}`).pipe(
      catchError(() => of(DEFAULT_POKEMON))
    );
  }

  getPokemonList() {
    return this.http.get<Pagination>(this.configurationService.config.apiUrl + `?limit=9&offset=0`).pipe(
      switchMap((res) => forkJoin(
          res.results.map(pokemon => this.http.get(pokemon.url))
        )
      )
    );
  }
}

export interface Pokemon {
  name: string;
  sprites: Sprites;
  types: PokemonType[]
}

export interface Sprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
  animated?: Sprites;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string
  };
}

export interface Pagination {
  count: number;
  next: string,
  previous: string;
  results: { name: string, url: string }[]
}

const DEFAULT_POKEMON: Pokemon = {
  name: '',
  types: [],
  sprites: {
    back_default: '',
    back_female: '',
    back_shiny: '',
    back_shiny_female: '',
    front_default: '',
    front_female: '',
    front_shiny: '',
    front_shiny_female: ''
  }
}
