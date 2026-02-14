import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { DateTime } from 'luxon';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class CalendarComponent extends Component {
  @service router;

  @tracked selectedDate = null;
  @tracked center = DateTime.local();
  @tracked month = this.center.toFormat('MMM yyyy');

  updateMonth = task({ drop: true }, async ({ date }) => {
    await timeout(600);

    if (!date || !DateTime.isDateTime(date) || !date.isValid) {
      return;
    }

    this.center = date;
  });

  @action
  onSelect(selected) {
    this.selectedDate = DateTime.fromJSDate(selected.date);
    this.router.transitionTo(
      'day',
      this.selectedDate.toFormat('d LLL').replace(/\s+/g, '-'),
    );

    this.args.dateArray(this.selectedDate.toFormat('d'));

    this.args.onClose();
  }

  @action
  nextMonth() {
    this.center = this.center.plus({ months: 1 });
    this.month = this.center.toFormat('MMM yyyy');
  }

  @action
  prevMonth() {
    this.center = this.center.minus({ months: 1 });
    this.month = this.center.toFormat('MMM yyyy');
  }

  @action
  nextYear() {
    this.center = this.center.plus({ years: 1 });
    this.month = this.center.toFormat('MMM yyyy');
  }

  @action
  prevYear() {
    this.center = this.center.minus({ years: 1 });
    this.month = this.center.toFormat('MMM yyyy');
  }
}
