import { CUSTOM } from '../constants';
import type { Custom } from '../types';

const custom = <T = any>(value?: T) =>
  ({
    [CUSTOM]: value,
  }) as Custom<T>;

export default custom;
