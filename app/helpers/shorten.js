import { helper } from '@ember/component/helper';

export default helper(function shorten([value]) {
  if (!value) {
    return '';
  }
  if (value?.length < 20) {
    return value;
  } else {
    const shortenValue = value?.slice(0, 25);

    return `${shortenValue}....`;
  }
});
