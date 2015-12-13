import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mf-playlist-tile', 'Integration | Component | mf playlist tile', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{mf-playlist-tile}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#mf-playlist-tile}}
      template block text
    {{/mf-playlist-tile}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
