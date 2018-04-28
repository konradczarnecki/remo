import {Md5} from 'ts-md5/dist/md5';
import {arrayProp, ModelType, pre, prop, staticMethod, Typegoose} from 'typegoose';

@pre<Playlist>('save', function(next) {
  const getHash = () => <string> Md5.hashStr(Date.now().toString(10) + this._id);
  if (!this.publicId) this.publicId = getHash().substring(0, 6);
  this.active = true;
  next();
})
export class Playlist extends Typegoose {
  @prop() publicId: string;
  @prop() admin?: string;
  @arrayProp({ items : String }) tracks: string[];
  @prop() isPlaying: boolean;
  @prop() currentTrack: number;
  @prop() active: boolean;

  @staticMethod
  static findById(id: string) {
    return PlaylistModel.find({ publicId: id });
  }
}

export const PlaylistModel = new Playlist().getModelForClass(Playlist);


