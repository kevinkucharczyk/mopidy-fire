import Ember from 'ember';

export default Ember.Route.extend({
  _removeUnplayable(data) {
    let tracks = data;
    _.remove(tracks, (track) => {
      return track.name.indexOf('[unplayable]') > -1;
    });

    return tracks;
  },

  _getArtist(data, uri) {
    return _
      .chain(data)
      .map(function(track) {
        return track.artists[0];
      })
      .find({ uri: uri })
      .value();
  },

  _getAlbums(data) {
    return _
      .chain(data)
      .map((track) => {
        return track.album;
      })
      .uniqBy((album) => {
        return album.uri;
      })
      .sortBy('date')
      .value();
  },

  _groupTracksByAlbum(data) {
    return _.groupBy(data, (track) => {
      return track.album.uri;
    });
  },

  _extractAlbums(data, uri) {
    const tracksByAlbum = this._groupTracksByAlbum(data);
    const allAlbums = this._getAlbums(data);

    let albums = [],
      singles = [],
      appearsOn = [],
      albumUris = [],
      promiseArray = [];

    _.forEachRight(allAlbums, (album) => {
      let tracks = tracksByAlbum[album.uri];
      album['tracks'] = tracks;
      albumUris.push(album.uri);

      if (album.artists[0].uri === uri) { // check if main artist or 3rd party album
        if (tracks.length > 4) { // full album or single
          albums.push(album);
        }
        else {
          singles.push(album);
        }
      }
      else {
        appearsOn.push(album);
      }

      let result = this.get('mopidy').getImages([album.uri]).then((response) => {
        album['images'] = response[album.uri];
        return album;
      });
      promiseArray.push(result);
    });

    return {
      albums: albums,
      singles: singles,
      appearsOn: appearsOn,
      albumUris: albumUris,
      promiseArray: promiseArray
    };
  },

  model(params) {
    return this.get('mopidy').lookup(params.uri).then((model) => {
      const uri = params.uri;

      const data = this._removeUnplayable(model);

      const artist = this._getArtist(data, uri);

      const extractedAlbums = this._extractAlbums(data, uri);

      return this.get('mopidy').getImages([artist.uri]).then((data) => {
        artist['images'] = data[artist.uri];

        return Ember.RSVP.all(extractedAlbums.promiseArray).then(() => {
          return {
            artist: artist,
            albums: extractedAlbums.albums,
            singles: extractedAlbums.singles,
            appearsOn: extractedAlbums.appearsOn
          };

        });

      });
    });
  }
});