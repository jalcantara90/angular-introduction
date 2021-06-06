import { Pokemon, PokemonService } from 'src/app/shared/pokemon/pokemon.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from 'src/app/shared/configuration/configuration.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { switchMap, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon$!: Observable<Pokemon>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pokemon$ = this.activatedRoute.params.pipe(
      switchMap(({pokemonId}) => {
        return this.pokemonService.getPokemon(pokemonId).pipe(
          switchMap(pokemon => {
            return this.pokemonService.getSpice(pokemon.species.url).pipe(
              map(description => ({
                ...pokemon,
                description
              }))
            )
          })
        )
      })
    );
  }

  getStatName(statName: string) {
    return StatName[statName];
  }

  getPercent(statBase: number) {
    const percent = Number((100 * statBase) / 180);
    return percent > 100 ? 100 : percent.toFixed(0);
  }
}

enum StatName {
  hp = 'HP',
  defense =  'Def',
  attack = 'Atk',
  'special-attack' = 'SpA',
  'special-defense' = 'SpD',
  speed =  'Spe'
}
