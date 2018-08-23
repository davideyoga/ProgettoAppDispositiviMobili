import { Component } from '@angular/core';

/**
 * Generated class for the SearchpopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'searchpopover',
  templateUrl: 'searchpopover.html'
})
export class SearchpopoverComponent {

  text: string;

  constructor() {
    console.log('Hello SearchpopoverComponent Component');
    this.text = 'Hello World';
  }

}
