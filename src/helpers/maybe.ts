import { MAYBE } from '../constants';
import type { __ObjectS, Maybe } from '../types';

const maybe = <T extends __ObjectS | __ObjectS[]>(value?: T) =>
  ({
    [MAYBE]: value,
  }) as Maybe<T>;

export default maybe;
