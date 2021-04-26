import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from './../../shared/configuration/configuration.service';
import { Injectable } from '@angular/core';

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
}


export interface Pokemon {
  name: string;
  sprites: Sprites;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  animated?: Sprites;
}
