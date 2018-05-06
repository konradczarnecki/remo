import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Store} from '@ngrx/store';
import {AppState} from './store/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  eventBus: Subject<any>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {

  }


}
