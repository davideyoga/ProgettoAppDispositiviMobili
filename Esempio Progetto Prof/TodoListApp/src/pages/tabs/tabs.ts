import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';

@IonicPage()
@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = 'HomePage';
    tab2Root = 'ProfilePage';

    constructor(public params: NavParams) {
    }
}
