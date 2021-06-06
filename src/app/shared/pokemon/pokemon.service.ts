import { ENVIRONMENT } from './../../../environments/environment.injectiontoken';
import { EnvironmentSettings } from './../../../environments/environment.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: EnvironmentSettings
  ) { }

  getPokemon(pokemonId: number) {
    return this.http.get<Pokemon>(this.environment.apiUrl + '/' + pokemonId);
  }

  getSpice(url: string) {
    return this.http.get<PokemonDescription>(url).pipe(
      map(spice => spice.flavor_text_entries.find(x => x.language.name === 'en').flavor_text)
    );
  }

  searchPokemon(pokemonName: string) {
    return this.http.get<Pokemon>(this.environment.apiUrl + `/${pokemonName.toLowerCase()}`).pipe(
      switchMap((pokemon) => this.getSpice(pokemon.species.url).pipe(
        map(description => ({
          ...pokemon,
          description
        }))
      )),
      catchError(() => of(DEFAULT_POKEMON))
    );
  }

  getPokemonList() {
    return this.http.get<Pagination>(this.environment.apiUrl + `?limit=9&offset=0`).pipe(
      switchMap((res) => forkJoin(
          res.results.map(pokemon => this.searchPokemon(pokemon.name))
        )
      )
    );
  }
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: Sprites;
  types: PokemonType[];
  species: {
    url: string;
  };
  description?: string;
  stats: Stat[]
}

export interface Stat {
  base_stat: number;
  stat: { name: string }
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
  next: string;
  previous: string;
  results: { name: string, url: string }[];
}

export interface PokemonDescription {
  flavor_text_entries: {
    flavor_text: string,
    language: {
      name: string;
    }
  }[];
}

const DEFAULT_POKEMON: Pokemon = {
  id: 0,
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
  },
  species: {
    url: ''
  },
  stats: []
}


