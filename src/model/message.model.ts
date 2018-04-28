import {IPlaylist} from './playlist.model';

export interface Message {
  type: 'register' | 'playlist';
  payload: string | IPlaylist;
}
