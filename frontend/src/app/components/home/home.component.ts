import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AppState} from '../../store/state';
import {Store} from '@ngrx/store';
import {FetchPlaylistAction, PushVideoAction} from '../../store/actions/playlist.actions';

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
      this.store.dispatch(FetchPlaylistAction.submit(params.get('id')))
    );
  }

  pushVideo() {
    this.store.dispatch(new PushVideoAction(this.newVideoLink));
  }

  ngAfterViewInit(): void {


  }
}
