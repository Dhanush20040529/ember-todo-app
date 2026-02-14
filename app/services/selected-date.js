import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SelectedDateService extends Service {
  @tracked value = null;
}
