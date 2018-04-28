import {Playlist} from './playlist.model';

export interface Message {
  type: 'register' | 'playlist';
  payload: string | Playlist;
}
