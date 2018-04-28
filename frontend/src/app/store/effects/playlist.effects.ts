import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {FETCH_PLAYLIST_SUBMIT, FetchPlaylist} from '../actions/playlist.actions';
import {mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable()
export class PlaylistEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  checkLink$: Observable<Action> = this.actions$.pipe(
    ofType(FETCH_PLAYLIST_SUBMIT),
    mergeMap((action: FetchPlaylist) =>
      this.http.get(environment.apiUrl)
    )
  );

}
