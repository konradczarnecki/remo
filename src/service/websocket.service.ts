import * as ws from 'ws';
import {Playlist} from '../model';
import {Message} from '../model/message.model';

class WebsocketService {

  listeners: Map<string, ws[]>;

  constructor() {
    this.listeners = new Map();
  }

  registerListener(playlistId: string, websocket: ws) {

    if (this.listeners.has(playlistId)) this.listeners.get(playlistId).push(websocket);
    else this.listeners.set(playlistId, [websocket]);
  }

  sendUpdate(playlist: Playlist) {

    const message: Message = {
      type: 'playlist',
      payload: playlist
    };

    const listeners = this.listeners.get(playlist.publicId);
    for (let listener of listeners) listener.send(message);
  }
}

export default new WebsocketService();
