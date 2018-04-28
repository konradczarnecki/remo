import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {FETCH_PLAYLIST_SUBMIT, FetchPlaylist} from '../actions/playlist.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {of} from 'rxjs/observable/of';
import {Playlist} from "../../../../../src/model";

@Injectable()
export class PlaylistEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  @Effect()
  fetchPlaylist$: Observable<Action> = this.actions$.pipe(

    ofType(FETCH_PLAYLIST_SUBMIT),
    mergeMap((action: FetchPlaylist) =>

      this.http.get<Playlist>(environment.apiUrl + '/get-playlist?id' + action.id).pipe(
        map(playlist => FetchPlaylist.success(playlist, action.id)),
        catchError(err => of(FetchPlaylist.failure(err)))
      )
    )
  );
}
