import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface Configuration {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  public config: Configuration = {
    apiUrl: ''
  };

  constructor() { }

  loadConfiguration() {
    return of({apiUrl: 'https://pokeapi.co/api/v2/pokemon'}).pipe(
      delay(1500),
      tap((config) => this.config = config)
    );
  }
}
