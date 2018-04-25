import {model, Schema, Document, Model} from 'mongoose';
import {Md5} from 'ts-md5/dist/md5';

export interface IPlaylist {
  publicId: string;
  admin?: string;
  tracks: string[];
  isPlaying: boolean;
  currentTrack: number;
  active: boolean;
}

export interface PlaylistModel extends IPlaylist, Document {}

export const PlaylistSchema: Schema = new Schema({
  publicId: String,
  admin: String,
  tracks: [{
    type: String
  }],
  isPlaying: Boolean,
  currentTrack: Number,
  active: Boolean
});

PlaylistSchema.pre('save', function(this: PlaylistModel, next) {
  const getHash = () => <string> Md5.hashStr(Date.now().toString(10) + this._id);
  if (!this.publicId) this.publicId = getHash().substring(0, 6);
  this.active = true;
  next();
});

export default model<PlaylistModel>('Playlist', PlaylistSchema);


