import {Action} from '@ngrx/store';
import {Playlist} from '../../model';

export const FETCH_PLAYLIST_SUBMIT = 'FETCH_PLAYLIST_SUBMIT';
export const FETCH_PLAYLIST_SUCCESS = 'FETCH_PLAYLIST_SUCCESS';
export const FETCH_PLAYLIST_FAILURE = 'FETCH_PLAYLIST_FAILURE';

export class FetchPlaylistAction implements Action {

  id: string;
  playlist: Playlist;
  error: any;

  constructor(public type: string) {}

  static submit(id: string) {
    const action = new FetchPlaylistAction(FETCH_PLAYLIST_SUBMIT);
    action.id = id;
    return action;
  }

  static success(playlist: Playlist, id: string) {
    const action = new FetchPlaylistAction(FETCH_PLAYLIST_SUCCESS);
    action.playlist = playlist;
    action.id = id;
    return action;
  }

  static failure(error: any) {
    const action = new FetchPlaylistAction(FETCH_PLAYLIST_FAILURE);
    action.error = error;
    return action;
  }
}

export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';

export class UpdatePlaylistAction implements Action {

  readonly type = UPDATE_PLAYLIST;
  constructor(public playlist: Playlist) {}
}

export const PUSH_VIDEO = 'PUSH_VIDEO';

export class PushVideoAction implements Action {

  readonly type = PUSH_VIDEO;
  constructor(public link: string) {}
}
