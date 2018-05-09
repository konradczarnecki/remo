import {Md5} from 'ts-md5/dist/md5';
import { arrayProp, instanceMethod, ModelType, pre, prop, Ref, staticMethod, Typegoose } from 'typegoose';
import { Track } from './track.model';

@pre<Playlist>('save', function(next) {
  const getHash = (salt: string) =>
    Md5.hashStr(Date.now().toString(10) + salt).toString().substring(0, 6);

  if (!this.publicId) {
    this.publicId = getHash(this._id);
    this.secretId = getHash(this.publicId);
  }

  this.active = true;
  next();
})
export class Playlist extends Typegoose {
  @prop() publicId: string;
  @prop() secretId: string;
  @prop() admin?: string;
  @arrayProp({ itemsRef : Track }) tracks: Array<Ref<Track>>;
  @prop() isPlaying: boolean;
  @prop() currentTrack: number;
  @prop() active: boolean;

  @instanceMethod
  nextTrack() {
    this.currentTrack++;
  }

  @instanceMethod
  pushTrack(track: Track): void {
    this.tracks.push(track);
  }

  @instanceMethod
  forceTrack(track: Track): void {
    this.tracks.splice(this.currentTrack + 1, 0, track);
    this.currentTrack++;
  }

  @staticMethod
  static findById(id: string): Promise<Playlist> {
    return <Promise<Playlist>> PlaylistModel.findOne(
      { $or : [{ publicId : id}, { secretId : id}] }
      ).populate('tracks').exec();
  }

  @staticMethod
  static updateByPublicId(playlist: Playlist): Promise<Playlist> {

    return <Promise<Playlist>> PlaylistModel.findOneAndUpdate(
      { publicId : playlist.publicId }, playlist, { new : true }
      ).exec();
  }
}

export const PlaylistModel = new Playlist().getModelForClass(Playlist);
