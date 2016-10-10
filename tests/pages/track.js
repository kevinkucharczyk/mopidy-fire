import {
  create,
  text
} from 'ember-cli-page-object';

export default create({
  trackAlbum: text('.track__album'),
  trackArtist: text('.track__artist'),
  trackDuration: text('.track__duration'),
  trackTitle: text('.track__title')
});
