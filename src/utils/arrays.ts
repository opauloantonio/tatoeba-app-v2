import { curry } from 'lodash';

// https://stackoverflow.com/a/35000557
export const closest = curry((target: number, options: number[]) => (
  options.reduce((prev, curr) => Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev)
));
