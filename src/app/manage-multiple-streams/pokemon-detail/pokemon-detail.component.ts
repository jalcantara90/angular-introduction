import { Pokemon, PokemonService } from 'src/app/shared/pokemon/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  pokemon!: Pokemon;
  description!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({pokemonId}) => {
      this.pokemonService.getPokemon(pokemonId).subscribe((pokemon) => {
        this.pokemon = pokemon;
        this.pokemonService.getSpice(pokemon.species.url).subscribe(description => this.description = description);
      })
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
