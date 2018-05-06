import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AppState} from '../../store';
import {Store} from '@ngrx/store';
import {FetchPlaylistAction, PushVideoAction} from '../../store';

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

    if (!this.newVideoLink) return;

    const idIndex = this.newVideoLink.indexOf('v=') + 2;
    const link = this.newVideoLink.substring(idIndex, idIndex + 11);

    this.store.dispatch(PushVideoAction.submit(link));
  }

  ngAfterViewInit(): void {


  }
}
