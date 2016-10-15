import {
  create,
  text,
  attribute
} from 'ember-cli-page-object';

export default create({
  title: text('.playlist-tile__title'),
  subtitle: text('.playlist-tile__subtitle'),
  image: attribute('src', '.playlist-tile__cover-image')
});
