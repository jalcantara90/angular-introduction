import { Pokemon, PokemonService } from 'src/app/shared/pokemon/pokemon.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigurationService } from 'src/app/shared/configuration/configuration.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  pokemon!: Pokemon;
  description!: string;
  destroy$$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroy$$)
    ).subscribe(({pokemonId}) => {
      this.pokemonService.getPokemon(pokemonId).pipe(
        takeUntil(this.destroy$$)
      ).subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.pokemonService.getSpice(pokemon.species.url).pipe(
          takeUntil(this.destroy$$)
        ).subscribe(description => this.description = description)
      });
    });
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
