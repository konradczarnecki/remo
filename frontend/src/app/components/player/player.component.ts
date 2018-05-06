import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AppState} from '../../store';
import {Store} from '@ngrx/store';
import {Playlist} from '../../model';
import {map} from 'rxjs/operators';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {selectPlaylist} from '../../store';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {

  @ViewChild('wrapper') wrapper: ElementRef;

  link$: Observable<SafeResourceUrl>;

  constructor(
    private store: Store<AppState>,
    private sanitizer: DomSanitizer
  ) {

    this.link$ = store.select(selectPlaylist).pipe(

      map((playlist: Playlist) => {

        if (playlist && playlist.currentTrack !== -1) {
          const trackId = playlist.tracks[playlist.currentTrack];
          return 'https://www.youtube.com/embed/' + trackId + '?autoplay=1';

        } else return 'https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1';
      }),

      map((link: string) => this.sanitizer.bypassSecurityTrustResourceUrl(link))
    );

    this.link$.subscribe(console.log);
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }

}
