import { prop, Typegoose } from 'typegoose';

export class Track extends Typegoose {
  @prop() youtubeId: string;
  @prop() name: string;
  @prop() length: string;
}

export const TrackModel = new Track().getModelForClass(Track);
