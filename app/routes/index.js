import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { DateTime } from 'luxon';

export default class IndexRoute extends Route {
  @service router;
  dateMonth = DateTime.now().toFormat('d LLL');
  model() {
    this.router.transitionTo('day', this.dateMonth.replace(/\s+/g, '-'));
  }
}
