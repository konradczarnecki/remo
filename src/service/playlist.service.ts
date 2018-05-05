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

  private playlistAction(action: string, playlistId: string, track?: string): any  {

    const playlist: Playlist = this.playlists.find(playlist => playlist.publicId == playlistId);
    if (!playlist) return Promise.resolve(false);

    switch (action) {
      case 'pushTrack': playlist.pushTrack(track); break;
      case 'forceTrack': playlist.forceTrack(track); break;
      case 'nextTrack': playlist.nextTrack(); break;
    }

    websocketService.sendUpdate(playlist);
    return Playlist.updateByPublicId(playlist);
  }

  pushToPlaylist(playlistId: string, track: string): Promise<Playlist> {
    return this.playlistAction('pushTrack', playlistId, track);
  }

  forceToPlaylist(playlistId: string, track: string): Promise<Playlist> {
    return this.playlistAction('forceTrack', playlistId, track);
  }

  nextTrack(playlistId: string): Promise<Playlist> {
    return this.playlistAction('nextTrack', playlistId);
  }

  async getPlaylist(id: string) {
    let playlist: Playlist = await Playlist.findById(id);
    if (!playlist) playlist = await this.addNewPlaylist();

    if (id && playlist.secretId !== id) playlist.secretId = undefined;
    return playlist;
  }
}

export default new PlaylistService();
