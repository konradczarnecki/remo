import Playlist, { PlaylistModel } from '../model/playlist.model';

class PlaylistService {

  playlists: PlaylistModel[];

  constructor() {
    this.loadPlaylists().then(() => console.log(this.playlists));
  }

  async loadPlaylists() {
    this.playlists = await Playlist.find({ active : true });
  }

  addNewPlaylist() {

    const playlist = new Playlist({
      tracks : [],
      isPlaying : false,
      currentTrack : -1
    });

    this.playlists.push(playlist);
    return playlist.save();
  }

  pushToPlaylist(playlistId: string, track: string): Promise<boolean | PlaylistModel> {

    const playlist = this.playlists.find(playlist => playlist.publicId == playlistId);
    if (!playlist) return Promise.resolve(false);

    playlist.tracks.push(track);
    return playlist.save();
  }

}

export default new PlaylistService();
