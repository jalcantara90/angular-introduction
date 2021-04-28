import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/shared/configuration/configuration.service';
import { PokemonService } from 'src/app/shared/pokemon/pokemon.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  searchPokemonControl = new FormControl();

  @Output() searchPokemon = this.searchPokemonControl.valueChanges.pipe(
    debounceTime(400),
    switchMap(search => this.pokemonService.searchPokemon(search)),
  );

  constructor(private pokemonService: PokemonService, private configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.configurationService.loadConfiguration().subscribe();
  }
}
