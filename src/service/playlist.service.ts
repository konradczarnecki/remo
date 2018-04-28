import {Playlist, PlaylistModel} from '../model/playlist.model';
import websocketService from './websocket.service';

class PlaylistService {

  playlists: Playlist[];

  constructor() {
    this.loadPlaylists().then(() => console.log(this.playlists));
  }

  async loadPlaylists() {
    this.playlists = await PlaylistModel.find({ active : true });
  }

  addNewPlaylist() {

    const playlist = new PlaylistModel({
      tracks : [],
      isPlaying : false,
      currentTrack : -1
    });

    this.playlists.push(playlist);
    return playlist.save();
  }

  pushToPlaylist(playlistId: string, track: string): any {

    const playlist = this.playlists.find(playlist => playlist.publicId == playlistId);
    if (!playlist) return Promise.resolve(false);

    playlist.tracks.push(track);
    websocketService.sendUpdate(playlist);

    return PlaylistModel.update({
      publicId: playlist.publicId
    },
      playlist).exec();
  }

  async getPlaylist(id: string) {
    const playlist: Playlist = await Playlist.findById(id);
    if (playlist.secretId !== id) playlist.secretId = undefined;
    return playlist;
  }
}

export default new PlaylistService();
