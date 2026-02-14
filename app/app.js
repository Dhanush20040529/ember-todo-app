import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'todo-app/config/environment';
import { registerDateLibrary } from 'ember-power-calendar';
import DateUtils from 'ember-power-calendar-luxon';

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

registerDateLibrary(DateUtils);

loadInitializers(App, config.modulePrefix);
