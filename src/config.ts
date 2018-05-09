export interface IConfig {
  port: string | undefined | number;
  prettyLog: boolean;
  youtubeKey: string;
  youtubeApiUrl: string;
}

const config: IConfig = {
  port: process.env.NODE_PORT || 3000,
  prettyLog: process.env.NODE_ENV === 'development',
  youtubeKey: 'AIzaSyBspbkTMY51lLaXXuk8o0qMxg4MWDePkWw',
  youtubeApiUrl: 'https://www.googleapis.com/youtube/v3/videos'
};

export { config };
