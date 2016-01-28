import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    if (params.query) {
      return this.get('mopidy').search(params.query).then((result) => {
        let items = result[0];
        let promiseArray = [];
        _.forEach(items.albums, (album) => {
          let promise = this.get('mopidy').getAlbum(album.uri).then((response) => {
            album = response.album;
            album['tracks'] = response.tracks;
            return album;
          });
          promiseArray.push(promise);
        });

        return Ember.RSVP.all(promiseArray).then((results) => {
          items.albums = results;
          return items;
        });
      });
    } else {
      return null;
    }
  },

  actions: {
    onSubmit() {
      this.refresh();
    },

    onInput: _.debounce(function() {
      this.refresh();
    }, 500)
  }
});
