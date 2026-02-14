import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { DateTime } from 'luxon';
import { task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class CreateTaskComponent extends Component {
  @service router;

  @tracked selectedDate = DateTime.local();
  @tracked center = DateTime.local();
  @tracked month = this.center.toFormat('MMM yyyy');
  @tracked name = '';
  @tracked discription = '';
  @tracked time = '';

  @action
  updateName(event) {
    this.name = event.target.value;
  }

  @action
  updateDiscription(event) {
    this.discription = event.target.value;
  }

  @action
  updateTime(e) {
    this.time = e.target.value;
  }

  @action
  submit(e) {
    e.preventDefault();
    const newTask = {
      id: null,
      name: this.name,
      time: this.time,
      discription: this.discription,
      checked: false,
    };
    const date = this.selectedDate.toFormat('d-LLL');

    const task = JSON.parse(localStorage.getItem(date)) || [];
    if (task.length === 0) {
      newTask.id = 1;
    } else {
      newTask.id = task.length + 1;
    }
    task.push(newTask);

    localStorage.setItem(date, JSON.stringify(task));

    this.name = '';
    this.discription = '';
    this.time = '';
    this.router.transitionTo('day', date);
  }
  @action
  submitAndStay(e) {
    e.preventDefault();
    const newTask = {
      id: null,
      name: this.name,
      time: this.time,
      discription: this.discription,
      checked: false,
    };
    const date = this.selectedDate.toFormat('d-LLL');

    const task = JSON.parse(localStorage.getItem(date)) || [];
    if (task.length === 0) {
      newTask.id = 1;
    } else {
      newTask.id = task.length + 1;
    }
    task.push(newTask);

    localStorage.setItem(date, JSON.stringify(task));

    this.name = '';
    this.discription = '';
    this.time = '';
  }

  updateMonth = task({ drop: true }, async ({ date }) => {
    await timeout(600);

    if (!date || !DateTime.isDateTime(date) || !date.isValid) {
      return;
    }

    this.center = date;
  });

  @action
  onSelect(selectedDate) {
    this.selectedDate = DateTime.fromJSDate(selectedDate.date);
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
