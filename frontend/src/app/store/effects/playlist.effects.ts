import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import { fromPromise } from 'rxjs/observable/fromPromise';
import {
  FETCH_PLAYLIST_SUBMIT,
  FETCH_PLAYLIST_SUCCESS,
  FetchPlaylistAction,
  UpdatePlaylistAction
} from '../actions/playlist.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {of} from 'rxjs/observable/of';
import {Playlist, Message} from '../../model';

@Injectable()
export class PlaylistEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  @Effect()
  fetchPlaylist$: Observable<Action> = this.actions$.pipe(

    ofType(FETCH_PLAYLIST_SUBMIT),
    mergeMap((action: FetchPlaylistAction) =>

      this.http.get<Playlist>(environment.apiUrl + '/get-playlist?id=' + action.id).pipe(
        map(playlist => FetchPlaylistAction.success(playlist, action.id)),
        catchError(err => of(FetchPlaylistAction.failure(err)))
      )
    )
  );

  @Effect()
  register$: Observable<Action> = this.actions$.pipe(

    ofType(FETCH_PLAYLIST_SUCCESS),
    mergeMap((action: FetchPlaylistAction) => {

      const socket = new WebSocket('ws://localhost:3000/register-listener');

      const registerMsg: Message = {
        type : 'register',
        payload : action.id
      };

      socket.onopen = () => socket.send(JSON.stringify(registerMsg));

      return Observable.create(obs => {

        socket.onmessage = msg => {
          const message: Message = JSON.parse(msg.data);
          obs.next(new UpdatePlaylistAction(<Playlist> message.payload));
        };
      });
    })
  );
}
