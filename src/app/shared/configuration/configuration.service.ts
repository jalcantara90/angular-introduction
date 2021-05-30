import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { EnvironmentSettings } from 'src/environments/environment.model';
import { registerSettings } from './register-settings';

export interface Configuration {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  constructor() { }

  loadConfiguration() {
    return of({
      apiUrl: 'https://pokeapi.co/api/v2/pokemon',
      applicationInsights: {
        instrumentationKey: 'key'
      }
    }).pipe(
      delay(1500),
      tap(registerSettings)
    );
  }
}
