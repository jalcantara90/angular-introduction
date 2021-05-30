import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient,
  ) { }

  getBulbasaur() {
    return this.http.get<Pokemon>(environment.apiUrl + '/1');
  }

  searchPokemon(pokemonName: string) {
    return this.http.get<Pokemon>(environment.apiUrl + `/${pokemonName.toLowerCase()}`).pipe(
      switchMap((pokemon) => this.http.get<PokemonDescription>(pokemon.species.url).pipe(
        map(spice => ({
          ...pokemon,
          description: spice.flavor_text_entries.find(x => x.language.name === 'en').flavor_text
        }))
      )),
      catchError(() => of(DEFAULT_POKEMON))
    );
  }

  getPokemonList() {
    return this.http.get<Pagination>(environment.apiUrl + `?limit=9&offset=0`).pipe(
      switchMap((res) => forkJoin(
          res.results.map(pokemon => this.searchPokemon(pokemon.name))
        )
      )
    );
  }
}

export interface Pokemon {
  name: string;
  sprites: Sprites;
  types: PokemonType[];
  species: {
    url: string;
  };
  description?: string;
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
  }
}


