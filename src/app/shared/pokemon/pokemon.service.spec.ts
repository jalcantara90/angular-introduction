import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EnvironmentSettings } from 'src/environments/environment.model';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let httpMock: HttpTestingController;
  let service: PokemonService;


  const settings: Partial<EnvironmentSettings> = {
    production: false,
    applicationInsights: {
      instrumentationKey: 'instrumentation'
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        PokemonService
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(PokemonService);
  });

  afterEach(() => httpMock.verify());

  describe('getPokemon', () => {
    it('Should call to https://pokeapi.co/api/v2/pokemon', () => {
      service.getPokemon(1).subscribe();

      const httpReq = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon' + '/1');
      expect(httpReq.request.method).toBe('GET');
    });
  });

});
