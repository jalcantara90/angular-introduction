import { Component, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent {
  searchPokemonControl = new FormControl();

  @Output() searchPokemon = this.searchPokemonControl.valueChanges.pipe(
    debounceTime(400)
  );

  constructor() { }
}
