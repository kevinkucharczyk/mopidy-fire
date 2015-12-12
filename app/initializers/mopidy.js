export function initialize(application) {
  application.inject('route', 'mopidy', 'service:mopidy');
  application.inject('controller', 'mopidy', 'service:mopidy');
  application.inject('component', 'mopidy', 'service:mopidy');
}

export default {
  name: 'mopidy',
  initialize
};
