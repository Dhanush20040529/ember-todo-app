import EmberRouter from '@ember/routing/router';
import config from 'todo-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('create-task');
  this.route('day', { path: '/:id' });
  this.route('not-found',{path:'/*path'});
});
