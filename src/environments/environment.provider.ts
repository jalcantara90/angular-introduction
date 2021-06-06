import { ENVIRONMENT } from './environment.injectiontoken';
import { Provider } from "@angular/core";
import { environment } from './environment';

export function environmentProvider(): Provider {
  return {
    provide: ENVIRONMENT,
    useValue: environment
  }
};
