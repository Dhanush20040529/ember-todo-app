import { helper } from '@ember/component/helper';

export default helper(function addOne([value]) {
  if (typeof value !== 'number') {
    return '';
  }
  return value + 1;
});
