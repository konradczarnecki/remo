import {Playlist} from '../model';
import {isAdmin, playlistReducer} from './playlist';

export * from './playlist';
export * from './router';

export interface AppState {
  route: string;
  playlist: Playlist;
  isAdmin: boolean;
}

export const rootReducer = {
  playlist: playlistReducer,
  isAdmin: isAdmin,
};


