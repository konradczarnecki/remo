import {Playlist} from '../../model/index';
import {
  FETCH_PLAYLIST_FAILURE,
  FETCH_PLAYLIST_SUCCESS,
  FetchPlaylistAction, UPDATE_PLAYLIST,
  UpdatePlaylistAction
} from './playlist.actions';
import {ActionReducer} from '@ngrx/store';

export const playlistReducer: ActionReducer<Playlist> = (state: Playlist = null, action: FetchPlaylistAction | UpdatePlaylistAction) => {

  switch (action.type) {

    case FETCH_PLAYLIST_SUCCESS:
      console.log(action.playlist);
      return action.playlist;

    case FETCH_PLAYLIST_FAILURE:
      console.log((<FetchPlaylistAction> action).error);
      return state;

    case UPDATE_PLAYLIST:
      console.log(action.playlist);
      return action.playlist;

    default:
      return state;
  }
};

export const isAdmin: ActionReducer<boolean> = (state: boolean = false, action: FetchPlaylistAction) => {

  if (action.type === FETCH_PLAYLIST_SUCCESS)
    return action.id === action.playlist.secretId;

  return state;
};
