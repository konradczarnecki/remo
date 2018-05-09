import 'isomorphic-fetch';
import { Playlist, PlaylistModel } from '../model';
import { Track, TrackModel } from '../model';
import { config } from '../config';
import websocketService from './websocket.service';

class PlaylistService {

  playlists: Playlist[];

  constructor() {
    this.loadPlaylists().then(() => console.log(this.playlists));
  }

  async loadPlaylists() {
    this.playlists = await PlaylistModel.find({ active: true });
  }

  addNewPlaylist(): any {

    const playlist = new PlaylistModel({
      tracks: [],
      isPlaying: false,
      currentTrack: -1
    });

    this.playlists.push(playlist);
    return playlist.save();
  }

  private playlistAction(action: string, playlistId: string, track?: Track): Promise<any> {

    const playlist: Playlist = this.playlists.find(playlist => playlist.publicId == playlistId);
    if (!playlist) return Promise.resolve(false);

    switch (action) {
      case 'pushTrack':
        playlist.pushTrack(track);
        break;
      case 'forceTrack':
        playlist.forceTrack(track);
        break;
      case 'nextTrack':
        playlist.nextTrack();
        break;
    }

    websocketService.sendUpdate(playlist);
    return Playlist.updateByPublicId(playlist);
  }

  async pushToPlaylist(playlistId: string, trackId: string): Promise<Playlist> {
    const track = await this.getTrackMeta(trackId);
    return this.playlistAction('pushTrack', playlistId, track);
  }

  async forceToPlaylist(playlistId: string, trackId: string): Promise<Playlist> {
    const track = await this.getTrackMeta(trackId);
    return this.playlistAction('forceTrack', playlistId, track);
  }

  nextTrack(playlistId: string): Promise<Playlist> {
    return this.playlistAction('nextTrack', playlistId);
  }

  async getTrackMeta(trackId: string): Promise<any> {

    const url = config.youtubeApiUrl +
      `?part=snippet,contentDetails&id=${trackId}&key=${config.youtubeKey}`;

    const request = new Request(url, { method: 'GET' });
    const trackInfo = await fetch(request).then(rsp => rsp.json());

    const track = new TrackModel({
      youtubeId: trackId,
      name: trackInfo.items[0].snippet.title,
      length: trackInfo.items[0].contentDetails.duration
    });

    return track.save();
  }

  async getPlaylist(id: string) {
    let playlist: Playlist = await Playlist.findById(id);
    if (!playlist) playlist = await this.addNewPlaylist();

    if (id && playlist.secretId !== id) playlist.secretId = undefined;
    return playlist;
  }
}

export default new PlaylistService();
