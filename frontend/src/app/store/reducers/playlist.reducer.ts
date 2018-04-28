import {Playlist} from '../../model';
import {FETCH_PLAYLIST_FAILURE, FETCH_PLAYLIST_SUCCESS, FetchPlaylist} from '../actions/playlist.actions';

export function playlistReducer(state: Playlist = null, action: FetchPlaylist): Playlist {

  switch (action.type) {

    case FETCH_PLAYLIST_SUCCESS:
      return action.playlist;

    case FETCH_PLAYLIST_FAILURE:
      console.log(action.error);
      return null;

    default:
      return state;
  }
}
