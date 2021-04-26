import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/shared/pokemon/pokemon.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  selected: Pokemon = null;

  constructor() { }

  ngOnInit(): void {
  }

  getType(type: string) {
    return 'assets/icons/' + type + '.svg'
  }
}
