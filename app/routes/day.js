import Route from '@ember/routing/route';

export default class DayRoute extends Route {
  model(params) {
    const tasks = localStorage.getItem(params.id);
    return { id: String(params.id), tasks: JSON.parse(tasks) };
  }
}
