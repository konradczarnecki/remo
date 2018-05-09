import * as ws from 'ws';
import {Playlist, Message} from '../model';

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

    const listeners = this.clearListeners(playlist.publicId);
    listeners.forEach(listener => listener.send(JSON.stringify(message)));
  }

  clearListeners(publicId: string) {
    let listeners = this.listeners.get(publicId);
    if (!listeners) return [];
    listeners = listeners.filter(listener => listener.readyState == listener.OPEN);
    this.listeners.set(publicId, listeners);
    return listeners;
  }
}

export default new WebsocketService();
