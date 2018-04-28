import {Playlist, PlaylistModel} from '../model/playlist.model';

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

  pushToPlaylist(playlistId: string, track: string): Promise<boolean | Playlist> {

    const playlist = this.playlists.find(playlist => playlist.publicId == playlistId);
    if (!playlist) return Promise.resolve(false);

    playlist.tracks.push(track);
    return new PlaylistModel(playlist).save();
  }

  getPlaylist(id: string) {
    return Playlist.findById(id);
  }

}

export default new PlaylistService();
