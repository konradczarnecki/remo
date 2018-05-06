import {Action} from '@ngrx/store';
import {Playlist} from '../../model/index';

export const FETCH_PLAYLIST_SUBMIT = '[Fetch playlist] Submit';
export const FETCH_PLAYLIST_SUCCESS = '[Fetch playlist] Success';
export const FETCH_PLAYLIST_FAILURE = '[Fetch playlist] Failure';

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

export const UPDATE_PLAYLIST = '[Update playlist]';

export class UpdatePlaylistAction implements Action {

  readonly type = UPDATE_PLAYLIST;
  constructor(public playlist: Playlist) {}
}

export const PUSH_VIDEO_SUBMIT = '[Push video] Submit';
export const PUSH_VIDEO_SUCCESS = '[Push video] Success';
export const PUSH_VIDEO_FAILURE = '[Push video] Failure';

export class PushVideoAction implements Action {

  id: string;

  constructor(public type: string) {}

  static submit(id: string) {
    const action = new PushVideoAction(PUSH_VIDEO_SUBMIT);
    action.id = id;
    return action;
  }

  static success() {
    return new PushVideoAction(PUSH_VIDEO_SUCCESS);
  }

  static failure() {
    return new PushVideoAction(PUSH_VIDEO_FAILURE);
  }
}
