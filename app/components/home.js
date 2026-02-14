import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { DateTime } from 'luxon';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { min } from '@ember/object/computed';

export default class HomeComponents extends Component {
  @service selectedDate;
  @service router;

  @tracked dates = [];
  @tracked allTasks;
  @tracked isOpen = false;
  @tracked isTaskOpen = false;
  @tracked toOpenTask = {};

  get day() {
    return DateTime.fromFormat(this.args.id, 'd-LLL').toFormat('cccc');
  }

  get dateMonth() {
    return this.args.id.replace(/-+/g, ' ');
  }

  get activeButton() {
    if (!this.args.id) return 0;

    return this.dates.indexOf(this.args.id.replace(/-+/g, ' '));
  }

  get date() {
    return this.dateMonth.split(' ')[0];
  }

  @action
  dateChange(newDate) {
    this.router.transitionTo(
      'day',
      this.dates[newDate].trim().replace(/\s+/g, '-'),
    );
  }

  @action
  openCalendar() {
    this.isOpen = true;
  }

  @action
  closeCalendar() {
    this.isOpen = false;
  }

  @action
  changeChecked(id) {
    this.allTasks = this.allTasks.map((task) =>
      task.id === id ? { ...task, checked: !task.checked } : task,
    );

    localStorage.setItem(this.args.id, JSON.stringify(this.allTasks));
  }

  @action
  deleteTask(id) {
    this.allTasks = this.allTasks.filter((task) => task.id !== id);
    localStorage.setItem(this.args.id, JSON.stringify(this.allTasks));
    this.isTaskOpen = false;
  }

  @action
  openTask(index) {
    this.isTaskOpen = true;
    this.toOpenTask = this.allTasks[index];
    console.log(this.toOpenTask);
    console.log(this.isOpenTask);
  }

  @action
  closeTask() {
    this.isTaskOpen = false;
    console.log(this.isTaskOpen);
  }

  months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  constructor() {
    super(...arguments);
    this.dates = this.dateArray(this.date);
  }

  @action
  dateArray(changedDate) {
    let dates = [];
    const today = new Date();
    const year = today.getFullYear();

    for (let i = 0; i < 5; i++) {
      const monthLastDate = new Date(year, today.getMonth() + 1, 0);

      if (
        dates.length &&
        dates[dates.length - 1].includes(String(monthLastDate.getDate()))
      ) {
        const nextMonth = new Date(year, today.getMonth() + 1, 1);

        dates.push(
          `${nextMonth.getDate()} ${this.months[nextMonth.getMonth()]}`,
        );
      } else {
        const lastDate = dates.length
          ? Number(dates[dates.length - 1].split(' ')[0]) + 1
          : changedDate;
        let month;

        if (dates.length > 0) {
          const parts = dates[dates.length - 1].split(' ');

          month = parts.length > 1 ? parts[1] : this.months[today.getMonth()];
        } else {
          month = this.months[today.getMonth()];
        }

        dates.push(`${lastDate} ${month}`);
      }
    }
    console.log(dates);
    this.dates = dates;
    return dates;
  }

  toMinutes(time) {
    const period = time.slice(-2);
    const timepart = time.slice(0, -2);

    let hours = 0;
    let minutes = 0;

    if (timepart.includes(':')) {
      [hours, minutes] = timepart.split(':').map(Number);
    } else {
      hours = Number(timepart);
    }

    if (period === 'PM' && hours !== 12) {
      hours += 12;
    }
    if ((period === 'AM') & (hours === 12)) {
      hours = 0;
    }

    return hours * 60 + minutes;
  }

  get tasks() {
    this.allTasks = this.args.tasks?.sort(
      (a, b) => this.toMinutes(a.time) - this.toMinutes(b.time),
    );

    return this.args.tasks?.sort(
      (a, b) => this.toMinutes(a.time) - this.toMinutes(b.time),
    );
  }
}
