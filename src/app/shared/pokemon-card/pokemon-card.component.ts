import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemon: Pokemon;
  @Output() selectedPokemon = new EventEmitter<number>();

  getType(type: string) {
    return 'assets/icons/' + type + '.svg'
  }
}
