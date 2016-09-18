import {
  create,
  text,
  attribute
} from 'ember-cli-page-object';

export default create({
  artistName: text('.artist__name'),
  artistImage: attribute('data-image', '.artist__image')
});
