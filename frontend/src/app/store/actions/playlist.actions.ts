import {Action} from '@ngrx/store';
import {IPlaylist} from '../../model';

export const FETCH_PLAYLIST_SUBMIT = 'FETCH_PLAYLIST_SUBMIT';
export const FETCH_PLAYLIST_SUCCESS = 'FETCH_PLAYLIST_SUCCESS';
export const FETCH_PLAYLIST_FAILURE = 'FETCH_PLAYLIST_FAILURE';

export class FetchPlaylist implements Action {

  id: string;
  playlist: IPlaylist;
  error: any;

  constructor(public type: string) {}

  static submit(id: string) {
    const action = new FetchPlaylist(FETCH_PLAYLIST_SUBMIT);
    action.id = id;
    return action;
  }

  static success(playlist: IPlaylist, id: string) {
    const action = new FetchPlaylist(FETCH_PLAYLIST_SUCCESS);
    action.playlist = playlist;
    action.id = id;
    return action;
  }

  static failure(error: any) {
    const action = new FetchPlaylist(FETCH_PLAYLIST_FAILURE);
    action.error = error;
    return action;
  }
}
