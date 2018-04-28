import {Playlist} from '../../model';
import {
  FETCH_PLAYLIST_FAILURE,
  FETCH_PLAYLIST_SUCCESS,
  FetchPlaylist, UPDATE_PLAYLIST,
  UpdatePlaylist
} from '../actions/playlist.actions';

function playlistReducer(state: Playlist = null, action: FetchPlaylist | UpdatePlaylist): Playlist {

  switch (action.type) {

    case FETCH_PLAYLIST_SUCCESS:
      return action.playlist;

    case FETCH_PLAYLIST_FAILURE:
      console.log((<FetchPlaylist> action).error);
      return state;

    case UPDATE_PLAYLIST:
      console.log(action.playlist);
      return action.playlist;

    default:
      return state;
  }
}

function isAdmin(state: boolean = false, action: FetchPlaylist): boolean {

  if (action.type === FETCH_PLAYLIST_SUCCESS)
    return action.id === action.playlist.secretId;

  return state;
}

export { playlistReducer, isAdmin };
