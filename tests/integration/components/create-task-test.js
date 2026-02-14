import { module, test } from 'qunit';
import { setupRenderingTest } from 'todo-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | create-task', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CreateTask />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <CreateTask>
        template block text
      </CreateTask>
    `);

    assert.dom().hasText('template block text');
  });
});
