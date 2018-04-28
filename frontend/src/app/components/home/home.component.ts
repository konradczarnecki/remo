import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AppState} from '../../store/state';
import {Store} from '@ngrx/store';
import {FetchPlaylist} from '../../store/actions/playlist.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('wrapper') wrapper: ElementRef;

  newVideoLink: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe((params: ParamMap) =>
      this.store.dispatch(FetchPlaylist.submit(params.get('id')))
    );

    this.store.select('playlist').subscribe(playlist => console.log(playlist));
    // const socket = new WebSocket('ws://localhost:3000/register-listener');
    // socket.onopen = () => socket.send(JSON.stringify({dupa: 'abc'}));
    // socket.onmessage = (msg) => console.log(msg);
  }

  ngAfterViewInit(): void {

  }
}
